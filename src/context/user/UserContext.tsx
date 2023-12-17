import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { TProfile } from "@/types";
import { toast } from "@/components/ui/use-toast";

const INITIAL_USER_PROFILE = {
  token: "",
  result: {
    _id: "",
    name: "",
    username: "",
    email: "",
    bio: "",
    imageUrl: "",
    likedPosts: [],
    savedPosts: [],
  },
};

const storedUserData = localStorage.getItem("profile");
const INITIAL_USER_PROFILE_STATE = storedUserData
  ? JSON.parse(storedUserData)
  : INITIAL_USER_PROFILE;

type TUserContext = {
  user: TProfile;
  saveUser: (userData: TProfile) => void;
  removeUser: () => void;
};

const INITIAL_CONTEXT_STATE = {
  user: INITIAL_USER_PROFILE,
  saveUser: () => {},
  removeUser: () => {},
};

const UserContext = createContext<TUserContext>(INITIAL_CONTEXT_STATE);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TProfile>(INITIAL_USER_PROFILE_STATE);
  const navigate = useNavigate();

  useEffect(() => {
    const token = user.token;

    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp && decodedToken.exp * 1000 < new Date().getTime()) {
        removeUser();
        toast({
          title: "Session expired. Please Sign In again",
          variant: "destructive",
        });
        navigate("/sign-in");
      }
    }
  }, [user, navigate]);

  const saveUser = (userData: TProfile) => {
    localStorage.setItem("profile", JSON.stringify(userData));
    setUser(userData);
  };

  const removeUser = () => {
    localStorage.removeItem("profile");
    setUser(INITIAL_USER_PROFILE);
  };

  return (
    <UserContext.Provider value={{ user, saveUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
