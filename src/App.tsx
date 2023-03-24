import React, { ReactNode } from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./Login/Login";
import NavBar from "./Component/NavBar/NavBar";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import LeftBar from "./Component/LeftBar/LeftBar";
import Manager from "./Manager/Manager";
import { useSelector } from "./store";
import { Container } from "@mui/material";
import Task from "./TasksList/Task";

function App() {
  const user = useSelector((state) => state.user);
  const Layout = () => {
    return (
      <div>
        <NavBar />
        <div style={{ display: "flex" }}>
          <LeftBar />
          <div style={{ flex: 13 }}>
            <Outlet />
          </div>
        </div>
      </div>
    );
  };
  const ProtectedLayout = ({ children }: any) => {
    if (!user.IsAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedLayout>
          <Layout />
        </ProtectedLayout>
      ),
      children: [
        {
          path: "/",
          element: <Manager />,
        },
        {
          path: "/Manager/:MgrId",
          element: <Manager />,
        },
        {
          path: "/Manager/Tasks",
          element: <Task />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
