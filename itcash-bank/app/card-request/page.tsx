"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, ArrowLeft, CreditCard, CheckCircle } from "lucide-react"

export default function CardRequestPage() {
  const [email, setEmail] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // In a real app, this would be an API call to request a card
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
    } catch (err) {
      // Handle error
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-4">
      <Link href="/" className="absolute left-4 top-4 flex items-center text-sm font-medium text-muted-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>

      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex justify-center">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Request a Bank Card</h1>
          <p className="text-sm text-muted-foreground">Apply for a new Magnetic Bank Card</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Card Request</CardTitle>
            <CardDescription>Fill in your details to request a card</CardDescription>
          </CardHeader>
          <CardContent>
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center space-y-3 text-center">
                <CheckCircle className="h-8 w-8 text-primary" />
                <p>Request Submitted</p>
                <p className="text-sm text-muted-foreground">
                  We&apos;ve received your card request. Please check your email for updates.
                </p>
                <Link href="/login">
                  <Button className="mt-4">Sign In</Button>
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Enter your account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="rounded-lg border p-3 bg-background">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Magnetic Bank Card</p>
                      <p className="text-xs text-muted-foreground">Standard card for everyday use</p>
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-xs text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary underline-offset-4 hover:underline">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

