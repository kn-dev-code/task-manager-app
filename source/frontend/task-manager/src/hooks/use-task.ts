import { API } from "@/lib/api-client";
import type { createTaskType, updateTaskType } from "@/types/task-types";
import { toast } from "sonner";
import { create } from "zustand";

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'complete' | 'in-progress' | 'to-do';
  priority: 'low' | 'medium' | 'high'; 
  dueDate?: Date;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface TaskState {
  tasks: Task[] | null;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  isTaskStatusLoading: boolean;

  create: (data: createTaskType) => void;
  update: (data: updateTaskType, id: string) => void;
  delete: (id: string) => void;
  isTaskStatus: () => void;
}

export const useTask = create<TaskState>()((set) => ({
  tasks: null,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isTaskStatusLoading: false,

  create: async(data: createTaskType) => {
    set({isCreating: true});
    try {
      const response = await API.post("/task/create-task", data)
      set({tasks: response.data.task});
    } catch(e: any) {
      toast.error(e.response?.data?.message || "Creation failed");
    } finally {
      set({isCreating: false});
    }
  },

  update: async(data: updateTaskType, id) => {
    set({isUpdating: true});
    try {
      const response = await API.put(`/task/update-task/${id}`, data);
      set({tasks: response.data.task});
      toast.success("Update successfully");
    } catch(e: any) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally {
      set({isUpdating: false});
    }
  },

  delete: async(id: string) => {
    try {
       await API.delete(`/task/delete-task/${id}`);
       set({tasks: null});
       toast.success("Deletion successful");
    } catch(e: any) {
toast.error(e.response?.data?.message || "Deletion failed");
    } finally {
      set({isDeleting: false});
    }
  },

  isTaskStatus: async() => {
    set({isTaskStatusLoading: true});
    try {
const response = await API.post("/task/");
set({tasks: response.data.task});
    } catch(e: any) {
toast.error(e.response?.data?.message || "Task Failed")
    } finally {
      set({isTaskStatusLoading: false});
    }
  }
}))