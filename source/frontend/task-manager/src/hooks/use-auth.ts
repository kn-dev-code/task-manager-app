import { toast } from "sonner";
import type { LoginType, RegisterType } from "../types/auth-types";
import { create } from "zustand";
import { API } from "../lib/api-client";

interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
}

interface AuthState {
  user: User | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isAuthStatusLoading: boolean;


  register: (data: RegisterType) => void;
  login: (data: LoginType) => void;
  logout: () => void;
  isAuthStatus: () => void;
}

export const useAuth = create<AuthState>()((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isAuthStatusLoading: false,

  register: async (data: RegisterType) => {
    set({ isSigningUp: true });
    try {
      const response = await API.post("/auth/register", data);
      set({ user: response.data.user });
      toast.success("Registration successful");
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Register failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data: LoginType) => {
    set({ isLoggingIn: true });
    try {
      const response = await API.post("/auth/login", data);
      set({ user: response.data.user });
      toast.success("Login successful");
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await API.post("/auth/logout");
      set({ user: null });
      toast.success("Logout successful");
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Register failed");
    }
  },

  isAuthStatus: async () => {
    try {
      const response = await API.post("/auth/status");
      set({ user: response.data.user })
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Authentication failed");
      console.log(e);
    }
    finally {
      set({ isAuthStatusLoading: false });
    }
  }
}))