"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
import { Progress } from "@/components/ui/progress"
import {
  MapPin,
  Plus,
  Vote,
  Heart,
  Star,
  Users,
  Clock,
  CheckCircle,
  Search,
  Filter,
  ThumbsUp,
  MessageCircle,
} from "lucide-react"
import Image from "next/image"

interface Destination {
  id: number
  name: string
  country: string
  votes: number
  status: "voting" | "confirmed" | "rejected"
}

interface TripDestinationsProps {
  destinations:readonly Destination[]
}

export function TripDestinations({ destinations }: TripDestinationsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [votedDestinations, setVotedDestinations] = useState<number[]>([])

  const handleVote = (destinationId: number) => {
    if (votedDestinations.includes(destinationId)) {
      setVotedDestinations(votedDestinations.filter((id) => id !== destinationId))
    } else {
      setVotedDestinations([...votedDestinations, destinationId])
    }
  }

  const suggestedDestinations = [
    { id: 5, name: "Prague", country: "Czech Republic", rating: 4.8, image: "/placeholder.svg?height=200&width=300" },
    { id: 6, name: "Vienna", country: "Austria", rating: 4.7, image: "/placeholder.svg?height=200&width=300" },
    { id: 7, name: "Budapest", country: "Hungary", rating: 4.6, image: "/placeholder.svg?height=200&width=300" },
    { id: 8, name: "Berlin", country: "Germany", rating: 4.5, image: "/placeholder.svg?height=200&width=300" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-blue-900">Destinations</h2>
          <p className="text-gray-600">Vote on destinations and discover new places to visit</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Suggest Destination
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Suggest a Destination</DialogTitle>
              <DialogDescription>Add a new destination for the group to vote on</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="destination-name">Destination Name</Label>
                <Input id="destination-name" placeholder="e.g., Amsterdam" />
              </div>
              <div>
                <Label htmlFor="destination-country">Country</Label>
                <Input id="destination-country" placeholder="e.g., Netherlands" />
              </div>
              <div>
                <Label htmlFor="destination-reason">Why this destination?</Label>
                <Textarea id="destination-reason" placeholder="Tell the group why you'd like to visit..." />
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddDialogOpen(false)}>
                  Add Destination
                </Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Current Destinations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {destinations.map((destination) => (
          <Card
            key={destination.id}
            className="relative bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center text-blue-900">
                    <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                    {destination.name}
                  </CardTitle>
                  <CardDescription className="text-blue-700">{destination.country}</CardDescription>
                </div>
                <Badge
                  variant={
                    destination.status === "confirmed"
                      ? "default"
                      : destination.status === "voting"
                        ? "secondary"
                        : "destructive"
                  }
                  className={
                    destination.status === "confirmed"
                      ? "bg-green-500 text-white"
                      : destination.status === "voting"
                        ? "bg-blue-500 text-white"
                        : "bg-red-500 text-white"
                  }
                >
                  {destination.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {destination.status === "voting" && (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{destination.votes} of 4 votes</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant={votedDestinations.includes(destination.id) ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleVote(destination.id)}
                          className={
                            votedDestinations.includes(destination.id)
                              ? "bg-blue-600 hover:bg-blue-700"
                              : "border-blue-300 text-blue-700 hover:bg-blue-50"
                          }
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {votedDestinations.includes(destination.id) ? "Voted" : "Vote"}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                        >
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Progress value={(destination.votes / 4) * 100} className="h-2" />
                  </>
                )}

                {destination.status === "confirmed" && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Confirmed destination</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />4 members
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />2 days left
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Suggested Destinations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-blue-900">Suggested Destinations</h3>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search destinations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {suggestedDestinations.map((destination) => (
            <Card
              key={destination.id}
              className="hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-lg"
            >
             
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <Image
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  fill
                  className="object-cover"
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 25vw"
                  priority={true}
                />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="bg-white/90 text-blue-700">
                    <Star className="h-3 w-3 mr-1" />
                    {destination.rating}
                  </Badge>
                </div>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-blue-900">{destination.name}</CardTitle>
                <CardDescription className="text-blue-700">{destination.country}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-1" />
                    Add to Trip
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Voting Rules */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Voting Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start space-x-2">
              <Vote className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">Majority Wins</p>
                <p className="text-gray-600">Need 3+ votes to confirm</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">7-Day Voting</p>
                <p className="text-gray-600">Votes close automatically</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Users className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="font-medium">All Members</p>
                <p className="text-gray-600">Everyone can vote and suggest</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
