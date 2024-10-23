import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import loginStore from "./store/loginStore.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  Home,
  LandingPage,
  Layout,
  LogIn,
  SignUp,
} from "./pages/";
import AuthLayout from "./components/AuthLayout.jsx";
import Transactions from "./pages/Transaction.jsx";
import AddTransaction from "./pages/AddTransaction.jsx";
import Cookies from "js-cookie";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <LandingPage /> },
      {
        path: "app",
        element: <Layout />,
        children: [
          {
            path: "",
            element: (
              <AuthLayout auth={Cookies.get("authToken") ? false : true}>
                <Home />
              </AuthLayout>
            ),
          },
          {
            path: "transactions",
            element: (
              <AuthLayout auth={Cookies.get("authToken") ? false : true}>
                <Transactions />
              </AuthLayout>
            ),
          },
          {
            path: "add-transaction",
            element: (
              <AuthLayout auth={Cookies.get("authToken") ? false : true}>
                <AddTransaction />
              </AuthLayout>
            ),
          },
          {
            path: "login",
            element: (
              <AuthLayout auth={false}>
                <LogIn />
              </AuthLayout>
            ),
          },
          {
            path: "signup",
            element: (
              <AuthLayout auth={false}>
                <SignUp />
              </AuthLayout>
            ),
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={loginStore}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
