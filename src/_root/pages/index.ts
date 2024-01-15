import { lazy } from "react";

export const Home = lazy(() => import("./Home"));
export const Explore = lazy(() => import("./Explore"));
export const Saved = lazy(() => import("./Saved"));
export const CreatePost = lazy(() => import("./CreatePost"));
export const Profile = lazy(() => import("./Profile"));
export const UpdateProfile = lazy(() => import("./UpdateProfile"));
export const EditPost = lazy(() => import("./EditPost"));
export const PostDetails = lazy(() => import("./PostDetails"));
