import { useAuth } from "@/hooks/use-auth"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useEffect, useState} from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Dashboard from "@/components/dashboard"
import { ShieldAlert, Users, Database } from "lucide-react"
import { toast } from "sonner"

const AdminView = () => {
  const { user, allUsers, isRetrievingUsers, isEditingUser, isDeletingUser} = useAuth()
  const [userId, setUserId] = useState<string | null>(null);


  const handleEdit = async (targetUser: any) => {
  setUserId(targetUser._id); 
  await isEditingUser(targetUser._id, { name: targetUser.name }); 
};

const handleDelete = async (targetUser: any) => {
  if (targetUser._id === user?._id) {
    return toast.error("Safety Protocol: You cannot delete yourself.");
  }

  if (window.confirm(`Are you sure you want to delete ${targetUser.name}?`)) {
    await isDeletingUser(targetUser._id);
  }
};

  useEffect(() => {
    if (user?.role === "admin") {
      isRetrievingUsers()
    }
  }, [user?.role])

  if (!user || user.role !== "admin") {
    return <Dashboard />
  }


  return (
    <div className="min-h-screen bg-slate-50 bg-[linear-gradient(to_right,#8BC0FC_0%,#739ED0_43%,#6F99C9_62%,#537296_100%)] p-8 brightness-110">
      <div className="mb-8 flex items-center gap-4">
        <ShieldAlert className="h-10 w-10 text-red-600" />
        <h1 className="text-3xl font-bold italic text-black ">Admin Command Center</h1>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="border-l-4 border-blue-500 bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-black">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {allUsers.length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-green-500 bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-black">
              System Health
            </CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.9%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle>User Database Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Current Plan</TableHead>
                <TableHead className = "pl-26">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.length > 0
                ? allUsers?.map((u) => (
                    <TableRow key={u._id}>
                      <TableCell className="font-mono">#{u._id}</TableCell>
                      <TableCell className="font-medium">{u.name}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        <span className="rounded bg-slate-100 px-2 py-1 text-xs font-bold tracking-wider uppercase text-black">
                          {u.planType}
                        </span>
                      </TableCell>
                      <TableCell className = "flex flex-row justify-between">
                        <button onClick = {() => handleEdit(u)} className="text-sm font-semibold text-blue-600 hover:underline hover:cursor-pointer">
                          Edit User
                        </button>
                        <button onClick = {() => handleDelete(u)} className = "text-sm font-semibold text-blue-600 hover:underline hover:cursor-pointer">
                          Delete User
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminView
