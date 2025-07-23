"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, MapPin, Users, Calendar, DollarSign, Search, Filter, Globe, Plane, TrendingUp } from "lucide-react"
import Link from "next/link"

// Mock data
const mockTrips = [
  {
    id: 1,
    title: "European Adventure",
    destination: "Paris, Rome, Barcelona",
    dates: "Jun 15-30, 2024",
    members: 4,
    budget: 3500,
    spent: 2100,
    status: "active",
    image: "/placeholder.svg?height=200&width=300",
    role: "admin",
  },
  {
    id: 2,
    title: "Tokyo Explorer",
    destination: "Tokyo, Kyoto, Osaka",
    dates: "Aug 10-20, 2024",
    members: 2,
    budget: 4000,
    spent: 800,
    status: "planning",
    image: "/placeholder.svg?height=200&width=300",
    role: "editor",
  },
  {
    id: 3,
    title: "Bali Retreat",
    destination: "Ubud, Seminyak, Canggu",
    dates: "Dec 1-14, 2024",
    members: 6,
    budget: 2500,
    spent: 0,
    status: "planning",
    image: "/placeholder.svg?height=200&width=300",
    role: "viewer",
  },
]

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const filteredTrips = mockTrips.filter((trip) => {
    const matchesSearch =
      trip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || trip.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 rounded-xl shadow-sm">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-semibold text-slate-900 tracking-tight">Travgo</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Avatar className="ring-2 ring-slate-200">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-slate-100 text-slate-700 font-medium">ST</AvatarFallback>
            </Avatar>
            <span className="font-medium text-slate-900">Swati Tomar</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 mb-2 tracking-tight">My Trips</h1>
            <p className="text-slate-600 leading-relaxed">Plan, collaborate, and explore the world together</p>
          </div>

         <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="mt-6 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all duration-200"
              >
                <Plus className="mr-2 h-5 w-5" />
                Create New Trip
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-slate-900 font-semibold">Create New Trip</DialogTitle>
                <DialogDescription className="text-slate-600">
                  Start planning your next adventure with friends
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="trip-name" className="text-slate-700 font-medium">
                    Trip Name
                  </Label>
                  <Input
                    id="trip-name"
                    placeholder="e.g., European Adventure"
                    className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <Label htmlFor="destination" className="text-slate-700 font-medium">
                    Primary Destination
                  </Label>
                  <Input
                    id="destination"
                    placeholder="e.g., Paris, France"
                    className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-slate-700 font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Tell us about your trip..."
                    className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <Label htmlFor="budget" className="text-slate-700 font-medium">
                    Estimated Budget (per person)
                  </Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="2000"
                    className="border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex space-x-3 pt-4">
                  <Button
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Create Trip
                  </Button>
                  <Button
                    variant="outline"
                    className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                    onClick={() => setIsCreateDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search trips or destinations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full md:w-48 border-slate-300 focus:border-indigo-500 focus:ring-indigo-500">
              <Filter className="mr-2 h-4 w-4 text-slate-400" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Trips</SelectItem>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Trips</CardTitle>
              <Plane className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-slate-900">3</div>
              <p className="text-xs text-slate-500 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +1 from last month
              </p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Countries Visited</CardTitle>
              <Globe className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-slate-900">8</div>
              <p className="text-xs text-slate-500">Across 3 continents</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Travel Buddies</CardTitle>
              <Users className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-slate-900">12</div>
              <p className="text-xs text-slate-500">Unique travelers</p>
            </CardContent>
          </Card>
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Budget</CardTitle>
              <DollarSign className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-slate-900">$10,000</div>
              <p className="text-xs text-slate-500">$2,900 spent</p>
            </CardContent>
          </Card>
        </div>

        {/* Trips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <Link key={trip.id} href={`/trip/${trip.id}`}>
              <Card className="border-slate-200 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-xl">
                <div className="aspect-video relative overflow-hidden rounded-t-xl">
                  <img src={trip.image || "/placeholder.svg"} alt={trip.title} className="object-cover w-full h-full" />
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant={trip.status === "active" ? "default" : "secondary"}
                      className={
                        trip.status === "active"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : "bg-slate-100 text-slate-700 border-slate-200"
                      }
                    >
                      {trip.status}
                    </Badge>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge variant="outline" className="bg-white/90 text-slate-700 border-slate-200">
                      {trip.role}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold text-slate-900">{trip.title}</CardTitle>
                  <CardDescription className="flex items-center text-slate-600">
                    <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                    {trip.destination}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-slate-600">
                      <Calendar className="h-4 w-4 mr-2 text-slate-400" />
                      {trip.dates}
                    </div>
                    <div className="flex items-center text-sm text-slate-600">
                      <Users className="h-4 w-4 mr-2 text-slate-400" />
                      {trip.members} members
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Budget Progress</span>
                      <span className="font-medium text-slate-900">
                        ${trip.spent} / ${trip.budget}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(trip.spent / trip.budget) * 100}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredTrips.length === 0 && (
          <div className="text-center py-16">
            <Plane className="h-16 w-16 text-slate-300 mx-auto mb-6" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No trips found</h3>
            <p className="text-slate-600 mb-6 max-w-sm mx-auto">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Create your first trip to get started"}
            </p>
            {!searchTerm && filterStatus === "all" && (
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Your First Trip
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
