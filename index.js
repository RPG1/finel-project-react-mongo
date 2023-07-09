import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import RegisterPage from "./Components/RegisterPage";
import LoginForm from "./Components/LoginPage";
import Userpage from "./Components/userpage";
import AdminPanel from "./Components/AdminPanel";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },

  {
    path: "/register",
    element: <RegisterPage />,
  },

  {
    path: "/login",
    element: <LoginForm />,
  },

  {
    path: "/Userpage",
    element: <Userpage />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
