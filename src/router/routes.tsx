import { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFoundPage";
import RootLayout from "./RootLayout";
import HomePage from "../pages/HomePage";
import SignupPage from "../pages/SignupPage";

const myRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default myRoutes;
