"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar, DollarSign, MapPin, Settings, Share, Bell, ChevronLeft, Plus, Navigation } from "lucide-react"
import Link from "next/link"
import { TripOverview } from "@/components/trip-overview"
import { TripDestinations } from "@/components/trip-destinations"
import { TripItinerary } from "@/components/trip-itinerary"
import { TripExpenses } from "@/components/trip-expenses"
import { TripChat } from "@/components/trip-chat"
import { TripMap } from "@/components/trip-map"

// Mock trip data
const mockTrip = {
  id: 1,
  title: "European Adventure",
  description: "A 2-week journey through the most beautiful cities in Europe",
  destination: "Paris, Rome, Barcelona",
  dates: "Jun 15-30, 2024",
  status: "active",
  budget: 3500,
  spent: 2100,
  currency: "USD",
  image: "/placeholder.svg?height=300&width=800",
  members: [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "admin",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "editor",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "editor",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "viewer",
      avatar: "/placeholder.svg?height=32&width=32",
    },
  ],
  destinations: [
    { id: 1, name: "Paris", country: "France", votes: 4, status: "confirmed" },
    { id: 2, name: "Rome", country: "Italy", votes: 3, status: "confirmed" },
    { id: 3, name: "Barcelona", country: "Spain", votes: 4, status: "confirmed" },
    { id: 4, name: "Amsterdam", country: "Netherlands", votes: 2, status: "voting" },
  ] as const,
}

export default function TripDetails() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-600 rounded-xl shadow-sm">
                  <Navigation className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-slate-900 tracking-tight">Travgo</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
              >
                <Share className="h-4 w-4 mr-1" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
              >
                <Bell className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Trip Hero */}
      <div className="relative h-64 bg-gradient-to-r from-indigo-600 to-sky-500">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative container mx-auto px-4 py-8 h-full flex items-end">
          <div className="text-white">
            <div className="flex items-center space-x-2 mb-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {mockTrip.status}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {mockTrip.members.length} members
              </Badge>
            </div>
            <h1 className="text-4xl font-semibold mb-2 tracking-tight">{mockTrip.title}</h1>
            <p className="text-xl opacity-90 mb-3 leading-relaxed">{mockTrip.description}</p>
            <div className="flex items-center space-x-6 text-sm opacity-80">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {mockTrip.destination}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {mockTrip.dates}
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />${mockTrip.spent} / ${mockTrip.budget}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Members */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-slate-600">Trip Members:</span>
              <div className="flex -space-x-2">
                {mockTrip.members.map((member) => (
                  <Avatar key={member.id} className="border-2 border-white ring-1 ring-slate-200">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-slate-100 text-slate-700 font-medium">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
              >
                <Plus className="h-4 w-4 mr-1" />
                Invite
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-slate-600">
                Budget:{" "}
                <span className="font-medium text-slate-900">
                  ${mockTrip.spent} / ${mockTrip.budget}
                </span>
              </div>
              <Progress value={(mockTrip.spent / mockTrip.budget) * 100} className="w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-slate-100 p-1 rounded-xl">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 font-medium"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="destinations"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 font-medium"
            >
              Destinations
            </TabsTrigger>
            <TabsTrigger
              value="itinerary"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 font-medium"
            >
              Itinerary
            </TabsTrigger>
            <TabsTrigger
              value="expenses"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 font-medium"
            >
              Expenses
            </TabsTrigger>
            <TabsTrigger
              value="chat"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 font-medium"
            >
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="map"
              className="data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm text-slate-600 font-medium"
            >
              Map
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <TripOverview trip={mockTrip} />
          </TabsContent>

          <TabsContent value="destinations">
            <TripDestinations destinations={mockTrip.destinations} />
          </TabsContent>

          <TabsContent value="itinerary">
            <TripItinerary />
          </TabsContent>

          <TabsContent value="expenses">
            <TripExpenses trip={mockTrip} />
          </TabsContent>

          <TabsContent value="chat">
            <TripChat members={mockTrip.members} />
          </TabsContent>

          <TabsContent value="map">
            <TripMap destinations={mockTrip.destinations} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
