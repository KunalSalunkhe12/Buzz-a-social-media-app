import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { TUser } from "@/types";
import { getCurrentUser } from "@/api";
import { toast } from "@/components/ui/use-toast";

const INITIAL_USER_PROFILE = {
  _id: "",
  name: "",
  username: "",
  email: "",
  bio: "",
  imageUrl: "",
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

  const saveToken = (token: string) => {
    localStorage.setItem("token", JSON.stringify(token));
    setToken(token);
  };

  const removeToken = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  const checkAuthUser = async () => {
    try {
      const { data } = await getCurrentUser();
      if (data) {
        setUser({
          _id: data._id,
          name: data.name,
          username: data.username,
          email: data.email,
          imageUrl: data.imageUrl,
          bio: data.bio,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === "[]" || token === null || token === undefined) {
      return navigate("/sign-in");
    }

    checkAuthUser();
    setToken(token);
  }, []);

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
