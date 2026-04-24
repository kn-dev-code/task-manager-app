import { toast } from "sonner";
import type { LoginType, RegisterType } from "../types/auth-types";
import { create } from "zustand";
import { API } from "../lib/api-client";

export type UserUpdateType = {
  name?: string;
  email?: string;
  planType?: User["planType"];
  role?: User["role"];
};

interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
  planType: 'free' | 'premium' | 'pro';
}

interface AuthState {
  user: User | null;
  allUsers: User[];
  isSigningUp: boolean;
  isLoggingIn: boolean;
  isAuthStatusLoading: boolean;
  isUpgrading: boolean;
  isRetrieving: boolean;
  isEditing: boolean;
  isDeleting: boolean;


  register: (data: RegisterType) => void;
  login: (data: LoginType) => void;
  logout: () => void;
  isAuthStatus: () => void;
  isUpgradingPlan: (data: User["planType"]) => void;
  isRetrievingUsers: () => void;
  isDeletingUser: (id: string) => void;
  isEditingUser: (id: string, data: UserUpdateType) => Promise<void>;
}

export const useAuth = create<AuthState>()((set) => ({
  user: null,
  allUsers: [],
  isSigningUp: false,
  isLoggingIn: false,
  isAuthStatusLoading: false,
  isUpgrading: false,
  isRetrieving: false,
  isEditing: false,
  isDeleting: false,

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
      const response = await API.get("/auth/status");
      set({ user: response.data.user })
    } catch (e: any) {
      set({user: null});
      console.log(e);
    }
    finally {
      set({ isAuthStatusLoading: false });
    }
  },

  isUpgradingPlan: async (planId: User["planType"]) => {
    set({ isUpgrading: true });
    try {
      const response = await API.patch("/user/upgrade-plan", { newPlantype: planId });
      set({ user: response.data.user });
      toast.success("Plan upgraded successfully");
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Plan upgrade failed");
      console.log(e);
    } finally {
      set({ isUpgrading: false });
    }
  },

  isRetrievingUsers: async () => {
    set({ isRetrieving: true })
    try {
      const response = await API.get("/auth/all-users")
      set({ allUsers: response.data.data})
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Admin access denied")
      console.log(e)
    } finally {
      set({ isRetrieving: false })
    }
  },
  isEditingUser: async (id, data) => {
    set({ isEditing: true })
    try {
      const response = await API.patch(`/auth/edit-user/${id}`, data)
      set((state) => ({
        allUsers: state.allUsers.map((u) => 
          u._id === id ? { ...u, ...response.data.updatedUser } : u
        )
      }));
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Admin access denied")
      console.log(e)
    } finally {
      set({ isEditing: false })
    }
  },
  isDeletingUser: async (id) => {
    set({ isDeleting: true })
    try {
      await API.delete(`/auth/delete-user/${id}`)
      set((state) => ({
        allUsers: state.allUsers.filter((u) => u._id !== id)
      }));
    } catch (e: any) {
      toast.error(e.response?.data?.message || "Admin access denied")
      console.log(e)
    } finally {
      set({ isDeleting: false })
    }
  }
}))