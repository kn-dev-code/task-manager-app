/**
 * @vitest-environment jsdom
 */

import { render, screen, fireEvent } from "@testing-library/react"
import { vi, describe, it, expect } from "vitest"
import Task from "@/tasks/components/task"
import { useTask } from "../hooks/use-task"
import { useAuth } from "../hooks/use-auth"
import "@testing-library/jest-dom/vitest"

vi.mock("../hooks/use-task")
vi.mock("../hooks/use-auth")

describe("Task Management UI", () => {
  it("filters tasks based on search query", async () => {
    const mockTasks = [
      { _id: "1", title: "Buy Milk", priority: "low", status: "to-do" },
      { _id: "2", title: "Hack Server", priority: "high", status: "in-progress" },
    ];

    (useAuth as any).mockReturnValue({ user: { name: "Admin" } });
    (useTask as any).mockReturnValue({
      tasks: mockTasks,
      isTaskStatus: vi.fn(),
    });

    render(<Task />)

    const searchInput = screen.getByPlaceholderText(/Search tasks.../i)
    
    fireEvent.change(searchInput, { target: { value: "Hack" } })

    expect(screen.getByText("Hack Server")).toBeInTheDocument()
    expect(screen.queryByText("Buy Milk")).not.toBeInTheDocument()
  })
})