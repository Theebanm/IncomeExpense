import axios from "axios";
import { BASE_URL } from "../../utils/url";
import { getUserFormStorage } from "../../utils/getUserFromStorage";

// ! Get the token from localstorage

const token = getUserFormStorage();

// ! create category
export const addCategoryAPI = async ({ name, type }) => {
  const response = await axios.post(
    `${BASE_URL}/category/create`,
    {
      type,
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

//! List the category
export const listCategoryAPI = async () => {
  const response = await axios.get(`${BASE_URL}/category/lists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// ! update category
export const updateCategoryAPI = async ({ name, type, id }) => {
  const response = await axios.put(
    `${BASE_URL}/category/update/${id}`,
    {
      type,
      name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// ! delete category
export const deleteCategoryAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/category/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
