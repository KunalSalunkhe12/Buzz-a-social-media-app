import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { TUser } from "@/types";
import { toast } from "@/components/ui/use-toast";

const INITIAL_USER = {
  token: "",
  result: {
    _id: "",
    name: "",
    username: "",
    email: "",
    bio: "",
    imageUrl: "",
  },
};

const storedUserData = localStorage.getItem("profile");
const INITIAL_USER_STATE = storedUserData
  ? JSON.parse(storedUserData)
  : INITIAL_USER;

const INITIAL_CONTEXT_STATE = {
  user: INITIAL_USER,
  saveUser: () => {},
  removeUser: () => {},
};

type TUserContext = {
  user: TUser;
  saveUser: (userData: TUser) => void;
  removeUser: () => void;
};

const UserContext = createContext<TUserContext>(INITIAL_CONTEXT_STATE);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser>(INITIAL_USER_STATE);
  const navigate = useNavigate();

  useEffect(() => {
    const token = user.token;

    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp && decodedToken.exp * 1000 < new Date().getTime()) {
        removeUser();
        toast({
          title: "Session expired. Please Sign In again",
        });
        navigate("/sign-in");
      }
    }
  }, [user, navigate]);

  const saveUser = (userData: TUser) => {
    localStorage.setItem("profile", JSON.stringify(userData));
    setUser(userData);
  };

  const removeUser = () => {
    localStorage.removeItem("profile");
    setUser(INITIAL_USER);
  };

  return (
    <UserContext.Provider value={{ user, saveUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
