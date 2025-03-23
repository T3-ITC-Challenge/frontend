"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { CreditCard, Shield, CheckCircle } from "lucide-react"

export default function CardsPage() {
  // Mock data - in a real app, this would come from an API
  const [cards, setCards] = useState([
    {
      id: "card-1",
      cardNumber: "**** **** **** 4567",
      expiryDate: "05/28",
      status: "active",
      type: "Magnetic Bank Card",
    },
  ])

  const [showRequestForm, setShowRequestForm] = useState(false)
  const [isRequesting, setIsRequesting] = useState(false)
  const [isRequestSuccess, setIsRequestSuccess] = useState(false)

  const handleCardStatusToggle = (cardId: string, newStatus: boolean) => {
    setCards(cards.map((card) => (card.id === cardId ? { ...card, status: newStatus ? "active" : "inactive" } : card)))
  }

  const handleCardRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsRequesting(true)

    try {
      // In a real app, this would be an API call to request a card
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsRequestSuccess(true)
    } catch (err) {
      // Handle error
    } finally {
      setIsRequesting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Bank Cards</h2>
          {cards.length < 2 && !showRequestForm && !isRequestSuccess && (
            <Button onClick={() => setShowRequestForm(true)}>
              <CreditCard className="mr-2 h-4 w-4" />
              Request New Card
            </Button>
          )}
        </div>

        {showRequestForm && !isRequestSuccess ? (
          <Card className="mx-auto max-w-md">
            <CardHeader>
              <CardTitle>Request a New Card</CardTitle>
              <CardDescription>Apply for a new Magnetic Bank Card</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCardRequest} className="space-y-4">
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center gap-4">
                    <CreditCard className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium">Magnetic Bank Card</h3>
                      <p className="text-sm text-muted-foreground">Standard magnetic stripe card for everyday use</p>
                    </div>
                  </div>
                  <div className="text-sm space-y-2">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>Secure transactions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      <span>No annual fee</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  By requesting a card, you agree to our terms and conditions. Your card will be delivered within 5-7
                  business days.
                </p>
                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setShowRequestForm(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1" disabled={isRequesting}>
                    {isRequesting ? (
                      <span className="flex items-center">
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Processing...
                      </span>
                    ) : (
                      "Submit Request"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        ) : isRequestSuccess ? (
          <Card className="mx-auto max-w-md">
            <CardContent className="flex flex-col items-center justify-center space-y-3 py-6 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold">Card Request Submitted</h3>
              <p className="text-sm text-muted-foreground">
                Your card request has been submitted successfully. You will be notified once it's approved.
              </p>
              <Button
                onClick={() => {
                  setShowRequestForm(false)
                  setIsRequestSuccess(false)
                }}
                className="mt-4"
              >
                Back to Cards
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <Card key={card.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{card.type}</CardTitle>
                  <CardDescription>{card.cardNumber}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Expires</span>
                    <span>{card.expiryDate}</span>
                  </div>
                  <div className="mt-4 flex items-center space-x-2">
                    <Switch
                      id={`card-status-${card.id}`}
                      checked={card.status === "active"}
                      onCheckedChange={(checked) => handleCardStatusToggle(card.id, checked)}
                    />
                    <Label htmlFor={`card-status-${card.id}`}>{card.status === "active" ? "Active" : "Inactive"}</Label>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

