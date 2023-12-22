import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { TUser } from "@/types";
import { toast } from "@/components/ui/use-toast";
import { useGetCurrentUser } from "@/lib/react-query/queries";

const INITIAL_USER_PROFILE = {
  _id: "",
  name: "",
  username: "",
  email: "",
  bio: "",
  imageUrl: "",
  likedPosts: [],
  savedPosts: [],
};

type TUserContext = {
  user: TUser;
  token: string;
  saveToken: (token: string) => void;
  removeToken: () => void;
};

const INITIAL_CONTEXT_STATE = {
  user: INITIAL_USER_PROFILE,
  token: "",
  saveToken: () => {},
  removeToken: () => {},
};

const UserContext = createContext<TUserContext>(INITIAL_CONTEXT_STATE);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser>(INITIAL_USER_PROFILE);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const { data, isSuccess } = useGetCurrentUser();

  const saveToken = (token: string) => {
    localStorage.setItem("token", JSON.stringify(token));
    setToken(token);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const checkAuthUser = () => {
    if (isSuccess) {
      const user = data.result;
      setUser({
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        imageUrl: user.imageUrl,
        bio: user.bio,
        likedPosts: user.likedPosts,
        savedPosts: user.savedPosts,
      });
    } else {
      toast({
        title: "Something went wrong.Please sign in again",
      });
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken === "[]" || userToken === null || userToken === undefined) {
      return navigate("/sign-in");
    }

    checkAuthUser();
    setToken(userToken);
  }, [token]);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp && decodedToken.exp * 1000 < new Date().getTime()) {
        removeToken();
        toast({
          title: "Session expired. Please Sign In again",
          variant: "destructive",
        });
        navigate("/sign-in");
      }
    }
  }, [user, navigate, token]);

  return (
    <UserContext.Provider value={{ user, saveToken, removeToken, token }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
