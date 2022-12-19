import React from "react";
import ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { SignUp } from "./pages/SignUp/SignUp";
import { Login } from "./pages/Login/Login";
import UserProvider from "./context/userContext";
import App from "./pages/App/App";
import "./index.css";
import Invoices from "./pages/Invoices/Invoices";
import Budgets from "./pages/Budgets/Budgets";
import Profile from "./pages/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import TransactionModal from "./pages/Transaction/TransactionModal";
import BudgetModal from "./pages/Budget/BudgetModal";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/app",
    element: <App />,
    children: [
      { index: true, element: <Navigate replace to="dashboard" /> },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "transaction",
            element: <TransactionModal />,
          },
          {
            path: "transaction/:id",
            element: <TransactionModal />,
          },
        ],
      },
      {
        path: "invoices",
        element: <Invoices />,
      },
      {
        path: "budgets",
        element: <Budgets />,
        children: [
          {
            path: "budget",
            element: <BudgetModal />,
          },
        ],
      },

      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </UserProvider>
  </React.StrictMode>
);
