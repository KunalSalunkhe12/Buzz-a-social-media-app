import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Home,
  PostDetails,
  Profile,
  Saved,
  UpdateProfile,
} from "./_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import RootLayout from "./_root/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/sign-in",
            element: <SigninForm />,
          },
          {
            path: "/sign-up",
            element: <SignupForm />,
          },
        ],
      },
      {
        element: <RootLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/explore",
            element: <Explore />,
          },
          {
            path: "/saved",
            element: <Saved />,
          },
          {
            path: "/all-users",
            element: <AllUsers />,
          },
          {
            path: "/create-post",
            element: <CreatePost />,
          },
          {
            path: "/update-post/:id",
            element: <EditPost />,
          },
          {
            path: "/posts/:id",
            element: <PostDetails />,
          },
          {
            path: "/profile/:id",
            element: <Profile />,
          },
          {
            path: "update-profile",
            element: <UpdateProfile />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
