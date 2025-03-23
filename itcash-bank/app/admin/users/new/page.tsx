"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function NewUserPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to create a user
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSuccess(true)
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/users">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Add New User</h2>
        </div>

        <Card className="mx-auto max-w-md">
          <CardHeader>
            <CardTitle>Create User Account</CardTitle>
            <CardDescription>Add a new user to ITCash Bank</CardDescription>
          </CardHeader>
          <CardContent>
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center space-y-3 py-6 text-center">
                <div className="rounded-full bg-primary/10 p-3">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">User Created Successfully</h3>
                <p className="text-sm text-muted-foreground">A temporary password has been sent to {formData.email}</p>
                <div className="flex gap-4 mt-4">
                  <Button variant="outline" onClick={() => router.push("/admin/users")}>
                    Back to Users
                  </Button>
                  <Button
                    onClick={() => {
                      setFormData({ name: "", email: "", role: "user" })
                      setIsSuccess(false)
                    }}
                  >
                    Add Another User
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={handleRoleChange}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="pt-2">
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center">
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Creating User...
                      </span>
                    ) : (
                      "Create User"
                    )}
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
          {!isSuccess && (
            <CardFooter className="flex justify-center border-t px-6 py-4">
              <p className="text-xs text-muted-foreground">
                A temporary password will be generated and sent to the user&apos;s email
              </p>
            </CardFooter>
          )}
        </Card>
      </div>
    </DashboardLayout>
  )
}

