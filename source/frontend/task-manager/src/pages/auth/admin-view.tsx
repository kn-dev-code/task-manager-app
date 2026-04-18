import { useAuth } from "@/hooks/use-auth";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Dashboard from "@/components/dashboard";
import { ShieldAlert, Users, Database } from "lucide-react";

const AdminView = () => {
  const { user } = useAuth();
  if (user?.role !== 'admin') {
    return <Dashboard />;
  }
  const allUsers = [
    { id: 1, name: "Temi", email: "temi@example.com", plan: "Premium" },
    { id: 2, name: "John Doe", email: "john@example.com", plan: "Free" },
    { id: 3, name: "Secret Admin", email: "admin@system.local", plan: "Admin" },
  ];

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <ShieldAlert className="h-10 w-10 text-red-600" />
        <h1 className="text-3xl font-bold italic">Admin Command Center</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white border-l-4 border-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
          </CardContent>
        </Card>
        
        <Card className="bg-white border-l-4 border-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">99.9%</div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-none">
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allUsers.map((u) => (
                <TableRow key={u.id}>
                  <TableCell className="font-mono">#{u.id}</TableCell>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded bg-slate-100 text-xs font-bold uppercase tracking-wider">
                      {u.plan}
                    </span>
                  </TableCell>
                  <TableCell>
                    <button className="text-blue-600 hover:underline text-sm font-semibold">Edit User</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminView;