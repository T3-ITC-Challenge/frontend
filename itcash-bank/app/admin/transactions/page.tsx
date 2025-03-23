"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, Calendar, Download } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminTransactionsPage() {
  // Mock data - in a real app, this would come from an API
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      sender: "John Doe",
      senderAccount: "1234567890",
      recipient: "Jane Smith",
      recipientAccount: "0987654321",
      amount: 1200,
      date: "2025-03-15",
      type: "transfer",
    },
    {
      id: 2,
      sender: "Jane Smith",
      senderAccount: "0987654321",
      recipient: "Utility Company",
      recipientAccount: "5555555555",
      amount: 85.5,
      date: "2025-03-14",
      type: "bill",
    },
    {
      id: 3,
      sender: "Robert Johnson",
      senderAccount: "2468135790",
      recipient: "John Doe",
      recipientAccount: "1234567890",
      amount: 500,
      date: "2025-03-12",
      type: "transfer",
    },
    {
      id: 4,
      sender: "Emily Davis",
      senderAccount: "1357924680",
      recipient: "Phone Company",
      recipientAccount: "6666666666",
      amount: 45.99,
      date: "2025-03-10",
      type: "bill",
    },
    {
      id: 5,
      sender: "Michael Brown",
      senderAccount: "9876543210",
      recipient: "Robert Johnson",
      recipientAccount: "2468135790",
      amount: 750,
      date: "2025-03-08",
      type: "transfer",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.recipient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.senderAccount.includes(searchQuery) ||
      transaction.recipientAccount.includes(searchQuery)

    const matchesType = typeFilter === "all" || transaction.type === typeFilter

    return matchesSearch && matchesType
  })

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>View and manage all transactions across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-[180px]">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="transfer">Transfers</SelectItem>
                    <SelectItem value="bill">Bill Payments</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Sender</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No transactions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          <div className="font-medium">{transaction.sender}</div>
                          <div className="text-xs text-muted-foreground">{transaction.senderAccount}</div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">{transaction.recipient}</div>
                          <div className="text-xs text-muted-foreground">{transaction.recipientAccount}</div>
                        </TableCell>
                        <TableCell className="text-right font-medium">${transaction.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>{transaction.date}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={transaction.type === "transfer" ? "outline" : "secondary"}>
                            {transaction.type === "transfer" ? "Transfer" : "Bill Payment"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Flag Transaction</DropdownMenuItem>
                              <DropdownMenuItem>Generate Report</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}

