import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeroSection from "./components/Home/HomePage";
import PublicNavbar from "./components/Navbar/PublicNavbar";
import LoginForm from "./components/Users/Login";
import RegistrationForm from "./components/Users/Register";
import PrivateNavbar from "./components/Navbar/PrivateNavbar";
import { useSelector } from "react-redux";
import UserProfile from "./components/Users/UserProfile";
import AddCategory from "./components/Category/AddCategory";
import CategoriesList from "./components/Category/CategoriesList";
import UpdateCategory from "./components/Category/UpdateCategory";
import TransactionForm from "./components/Transactions/TransactionForm";
import TransactionList from "./components/Transactions/TransactionList";
import Dashboard from "./components/Users/Dashboard";
import AuthRoute from "./components/Auth/AuthRoute";
const App = () => {
  // use useSelector hook to access an specific action
  const user = useSelector((state) => state?.auth?.user);
  return (
    <div>
      <BrowserRouter>
        {/* Navbar */}
        {user ? <PrivateNavbar /> : <PublicNavbar />}
        <Routes>
          <Route path="/" element={<HeroSection />} />
          <Route path="/login" element={<LoginForm />} />

          <Route path="/register" element={<RegistrationForm />} />
          <Route
            path="/profile"
            element={
              <AuthRoute>
                <UserProfile />
              </AuthRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />

          {/* Category */}
          <Route
            path="/add-category"
            element={
              <AuthRoute>
                <AddCategory />{" "}
              </AuthRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <AuthRoute>
                <CategoriesList />
              </AuthRoute>
            }
          />
          <Route
            path="/update-category/:id"
            element={
              <AuthRoute>
                <UpdateCategory />
              </AuthRoute>
            }
          />
          {/* transaction */}
          <Route
            path="/add-transaction"
            element={
              <AuthRoute>
                <TransactionForm />
              </AuthRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
