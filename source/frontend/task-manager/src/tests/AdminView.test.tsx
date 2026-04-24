/**
 * @vitest-environment jsdom
 */

import { render, screen } from "@testing-library/react"
import { vi, describe, it, expect } from "vitest"
import AdminView from "@/pages/auth/admin-view"
import { useAuth } from "../hooks/use-auth"
import "@testing-library/jest-dom/vitest"
import { MemoryRouter } from "react-router-dom"

vi.mock("../hooks/use-auth")

describe("AdminView Security Gate", () => {
  it("should show Dashboard instead of Admin Center if user is NOT an admin", () => {
    (useAuth as any).mockReturnValue({
      user: { name: "Test User", role: "free" },
      allUsers: [],
    })

    render(
    <MemoryRouter>
    <AdminView />
    </MemoryRouter>
    )
    
    expect(screen.queryByText(/Admin Command Center/i)).not.toBeInTheDocument()
  })

  it("should render correctly if the user is an admin", () => {
    (useAuth as any).mockReturnValue({
      user: { name: "Cowboy", role: "admin" },
      allUsers: [{ _id: "1", name: "User 1", email: "u1@test.com", planType: "free" }],
      isRetrievingUsers: vi.fn(),
    })

    render(<AdminView />)
    
    expect(screen.getByText(/Admin Command Center/i)).toBeInTheDocument()
    expect(screen.getByText(/User 1/i)).toBeInTheDocument()
  })
})