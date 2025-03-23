import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, CreditCard, BarChart3, DollarSign } from "lucide-react"
import Link from "next/link"

export default function AdminDashboardPage() {
  // Mock data - in a real app, this would come from an API
  const stats = {
    totalUsers: 124,
    activeUsers: 98,
    pendingCardRequests: 5,
    totalTransactions: 1245,
    totalBalance: 1245680.42,
  }

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <div className="flex items-center gap-2">
            <Link href="/admin/users/new">
              <Button>
                <Users className="mr-2 h-4 w-4" />
                Add New User
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">{stats.activeUsers} active users</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalBalance.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Across all accounts</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Card Requests</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingCardRequests}</div>
              <p className="text-xs text-muted-foreground">Pending approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTransactions}</div>
              <p className="text-xs text-muted-foreground">All time transactions</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest activities across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New user registered</p>
                    <p className="text-xs text-muted-foreground">John Doe (john.doe@example.com)</p>
                  </div>
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Card request approved</p>
                    <p className="text-xs text-muted-foreground">Sarah Johnson (sarah.j@example.com)</p>
                  </div>
                  <div className="text-xs text-muted-foreground">5 hours ago</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Large transaction detected</p>
                    <p className="text-xs text-muted-foreground">$5,000 transfer between accounts</p>
                  </div>
                  <div className="text-xs text-muted-foreground">Yesterday</div>
                </div>
              </div>
              <div className="mt-4 flex justify-center">
                <Link href="/admin/activities">
                  <Button variant="outline" size="sm">
                    View All Activities
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage banking operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/admin/users">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
              </Link>
              <Link href="/admin/cards">
                <Button className="w-full justify-start" variant="outline">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Review Card Requests
                </Button>
              </Link>
              <Link href="/admin/transactions">
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Transactions
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}

