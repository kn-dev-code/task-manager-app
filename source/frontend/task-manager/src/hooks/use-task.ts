import { API } from "@/lib/api-client";
import type { createTaskType, updateTaskType } from "@/types/task-types";
import { toast } from "sonner";
import { create } from "zustand";

interface Task {
  _id: string;
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

  createMethod: (data: createTaskType) => void;
  updateMethod: (data: updateTaskType, id: string) => void;
  deleteMethod: (id: string) => void;
  isTaskStatus: () => void;
}

export const useTask = create<TaskState>()((set) => ({
  tasks: [],
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isTaskStatusLoading: false,

  createMethod: async(data: createTaskType) => {
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

  updateMethod: async(data: updateTaskType, id) => {
    set({isUpdating: true});
    try {
      const response = await API.patch(`/task/update-task/${id}`, data);
      const updatedTask = response.data.task;
      set((state) => ({
        tasks: state.tasks ? state.tasks.map((task) => (task._id === id ? updatedTask : task))
        : [],
      }))
      //set({tasks: response.data.task})
      toast.success("Update successfully");
    } catch(e: any) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally {
      set({isUpdating: false});
    }
  },

  deleteMethod: async(id: string) => {
    if (!id) return;
    try {
       await API.delete(`/task/delete-task/${id}`);
       set((state) => ({
      tasks: state.tasks ? state.tasks.filter(t => (t._id !== id && t._id !== id)) : []
    }));
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
const response = await API.get("/task/get-all-tasks");
const taskData = Array.isArray(response.data) ? response.data : response.data.tasks;
set({tasks: taskData || []});
    } catch(e: any) {
toast.error(e.response?.data?.message || "Task Failed")
    } finally {
      set({isTaskStatusLoading: false});
    }
  }
}))