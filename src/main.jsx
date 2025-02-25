import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./Context/AuthProvider";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import AllTask from "./components/AllTask";
import AddTaskForm from "./components/AddTaskForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/add-task",
    element: <AddTaskForm></AddTaskForm>,
  },
  {
    path: "/all-task",
    element: <AllTask></AllTask>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
