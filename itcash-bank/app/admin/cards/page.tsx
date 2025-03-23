"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Search, MoreHorizontal, CheckCircle, XCircle } from "lucide-react";

// Define TypeScript type
type CardRequest = {
  id: number;
  user: string;
  email: string;
  requestDate: string;
  status: string;
};

export default function CardRequestsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cardRequests, setCardRequests] = useState<CardRequest[]>([]);

  useEffect(() => {
    const fetchCardRequests = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/cards", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch card requests");
        }

        const data: CardRequest[] = await response.json();
        setCardRequests(data);
      } catch (err: any) {
        console.error(err.message);
        setError("Failed to load card requests.");
      } finally {
        setLoading(false);
      }
    };

    fetchCardRequests();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const filteredRequests = cardRequests.filter(
    (request) =>
      /*request.user.toLowerCase().includes(searchQuery.toLowerCase()) ||*/
      request.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApprove = (id: number) => {
    setCardRequests((prevRequests) =>
      prevRequests.map((request) => (request.id === id ? { ...request, status: "approved" } : request))
    );
  };

  const handleReject = (id: number) => {
    setCardRequests((prevRequests) =>
      prevRequests.map((request) => (request.id === id ? { ...request, status: "rejected" } : request))
    );
  };

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Card Requests</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Magnetic Bank Card Requests</CardTitle>
            <CardDescription>Review and manage card requests from users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search requests..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[150px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-24 text-center">
                        No card requests found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.user}</TableCell>
                        <TableCell>{request.email}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              request.status === "approved"
                                ? "success"
                                : request.status === "rejected"
                                  ? "destructive"
                                  : "outline"
                            }
                          >
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {request.status === "pending" ? (
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleApprove(request.id)}
                              >
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="sr-only">Approve</span>
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleReject(request.id)}
                              >
                                <XCircle className="h-4 w-4 text-red-500" />
                                <span className="sr-only">Reject</span>
                              </Button>
                            </div>
                          ) : (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">More</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Contact User</DropdownMenuItem>
                                {request.status === "rejected" && (
                                  <DropdownMenuItem onClick={() => handleApprove(request.id)}>
                                    Approve Request
                                  </DropdownMenuItem>
                                )}
                                {request.status === "approved" && (
                                  <DropdownMenuItem onClick={() => handleReject(request.id)}>
                                    Reject Request
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
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
  );
}
