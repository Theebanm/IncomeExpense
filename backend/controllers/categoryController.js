const asyncHandler = require("express-async-handler");
const Category = require("../model/Category");
const Transaction = require("../model/Transaction");

const CategoryController = {
  // ! create
  create: asyncHandler(async (req, res) => {
    // ? pass incoming data
    const { name, type } = req.body;

    if (!name || !type) {
      throw new Error("Name and Type are required to create a category");
    }
    // ? Normalize data
    const normalizedName = name.toLowerCase();
    // ? valid category
    const validCategory = ["income", "expense"];

    if (!validCategory.includes(type.toLowerCase())) {
      throw new Error(
        "Invalid category type ,It must be income or expense" + type
      );
    }

    // ? check if category exists on user

    const categoryExist = await Category.findOne({
      name: normalizedName,
      user: req.user,
    });

    if (categoryExist) {
      throw new Error(`Category ${categoryExist.name} already exists in DB`);
    }
    // ? create category
    const category = await Category.create({
      user: req.user,
      name: normalizedName,
      type,
    });
    res.status(201).json(category);
  }),

  //   ! lists
  lists: asyncHandler(async (req, res) => {
    const categories = await Category.find({ user: req.user });
    res.status(200).json(categories);
  }),

  // ! update

  update: asyncHandler(async (req, res) => {
    const { type, name } = req.body;
    const normalizedName = name.toLowerCase();
    const category = await Category.findById(req.params.id);
    if (!category && category.user.toString() !== req.user.toString()) {
      throw new Error("Category not found or user not authorized");
    }
    const oldName = category.name;
    //! Update category properties
    category.name = normalizedName || category.name;
    category.type = type || category.type;
    const updatedCategory = await category.save();
    //Update affected transaction
    if (oldName !== updatedCategory.name) {
      await Transaction.updateMany(
        {
          user: req.user,
          category: oldName,
        },
        { $set: { category: updatedCategory.name } }
      );
    }
    res.json(updatedCategory);
  }),
  // ! Delete
  remove: asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category && req.user.toString() === category.user.toString()) {
      // ? update transactions that category
      const defaultCategory = "Uncategorized";
      await Transaction.updateMany(
        {
          user: req.user,
          category: category._id,
        },
        {
          $set: { category: defaultCategory },
        }
      );
      // ? remove category
      await Category.findByIdAndDelete(req.params.id);
      res.json({
        message: "category removed and transaction updated successfully",
      });
    } else {
      res.json({ message: "Category not found or user not Authorized" });
    }
  }),
};

module.exports = CategoryController;
