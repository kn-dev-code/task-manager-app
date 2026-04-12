import { toast } from "sonner";
import type { LoginType, RegisterType, UserType } from "../types/auth-types";
import { create } from "zustand";
import { API } from "../lib/api-client";

interface AuthState {
  user: UserType | null;
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isUpgrading: boolean;
  isAuthStatusLoading: boolean;


  register: (data: RegisterType) => Promise<void>;
  login: (data: LoginType) => Promise<void>;
  logout: () => Promise<void>;
  upgradePlan: (planType: "free" | "pro" | "premium") => Promise<void>;
  isAuthStatus: () => Promise<void>;
}

export const useAuth = create<AuthState>()((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpgrading: false,
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
      toast.error(e.response?.data?.message || "Logout failed");
    }
  },

  upgradePlan: async (planType: "free" | "pro" | "premium") => {
    set({ isUpgrading: true });
    try {
      await API.patch("/user/upgrade", {planType});

      set((state) => ({
        user: state.user ? { ...state.user, planType} : null
      }));
      toast.success("Plan updated successfully");
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Upgrade failed");
    } finally {
      set({ isUpgrading: false });
    }
  },

  isAuthStatus: async () => {
    set({ isAuthStatusLoading: true})
    try {
      const response = await API.get("/auth/authstatus");
      set({ user: response.data.data })
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Authentication failed");
      console.log(e);
    }
    finally {
      set({ isAuthStatusLoading: false });
    }
  },
}))