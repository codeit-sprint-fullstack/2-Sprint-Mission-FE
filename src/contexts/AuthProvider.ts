import { instance } from "@/api/axios";
import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  isLoading: false,
  login: {},
  signUp: {},
  isModalOpen: false,
  isRedirecting: false,
});
