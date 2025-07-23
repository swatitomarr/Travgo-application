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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, MapPin, Plus, Edit, Trash2, Plane, Hotel, Camera, Utensils, Car, Star } from "lucide-react"
import { DollarSign } from "lucide-react" // Import DollarSign

interface ItineraryItem {
  id: number
  day: number
  time: string
  title: string
  description: string
  location: string
  type: "flight" | "hotel" | "activity" | "meal" | "transport"
  duration: string
  cost?: number
  notes?: string
}

const mockItinerary: ItineraryItem[] = [
  {
    id: 1,
    day: 1,
    time: "08:00",
    title: "Flight to Paris",
    description: "Departure from JFK Airport",
    location: "New York → Paris",
    type: "flight",
    duration: "8h 30m",
    cost: 650,
  },
  {
    id: 2,
    day: 1,
    time: "18:30",
    title: "Hotel Check-in",
    description: "Le Marais Boutique Hotel",
    location: "4th Arrondissement, Paris",
    type: "hotel",
    duration: "30m",
    cost: 120,
  },
  {
    id: 3,
    day: 2,
    time: "09:00",
    title: "Eiffel Tower Visit",
    description: "Skip-the-line tickets and guided tour",
    location: "Champ de Mars, Paris",
    type: "activity",
    duration: "3h",
    cost: 45,
  },
  {
    id: 4,
    day: 2,
    time: "13:00",
    title: "Lunch at Café de Flore",
    description: "Traditional French bistro experience",
    location: "Saint-Germain-des-Prés, Paris",
    type: "meal",
    duration: "1h 30m",
    cost: 35,
  },
  {
    id: 5,
    day: 2,
    time: "15:00",
    title: "Louvre Museum",
    description: "Mona Lisa and classical art collection",
    location: "1st Arrondissement, Paris",
    type: "activity",
    duration: "4h",
    cost: 25,
  },
]

export function TripItinerary() {
  const [selectedDay, setSelectedDay] = useState(1)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  const days = Array.from(new Set(mockItinerary.map((item) => item.day))).sort()
  const dayItems = mockItinerary.filter((item) => item.day === selectedDay)

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Plane className="h-4 w-4" />
      case "hotel":
        return <Hotel className="h-4 w-4" />
      case "activity":
        return <Camera className="h-4 w-4" />
      case "meal":
        return <Utensils className="h-4 w-4" />
      case "transport":
        return <Car className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "flight":
        return "bg-blue-100 text-blue-800"
      case "hotel":
        return "bg-purple-100 text-purple-800"
      case "activity":
        return "bg-green-100 text-green-800"
      case "meal":
        return "bg-orange-100 text-orange-800"
      case "transport":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Trip Itinerary</h2>
          <p className="text-gray-600">Plan your day-by-day activities and schedule</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Activity
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Activity</DialogTitle>
              <DialogDescription>Add a new item to your itinerary</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="day">Day</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Day 1</SelectItem>
                      <SelectItem value="2">Day 2</SelectItem>
                      <SelectItem value="3">Day 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" type="time" />
                </div>
              </div>
              <div>
                <Label htmlFor="title">Activity Title</Label>
                <Input id="title" placeholder="e.g., Visit Eiffel Tower" />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activity">Activity</SelectItem>
                    <SelectItem value="meal">Meal</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="hotel">Accommodation</SelectItem>
                    <SelectItem value="flight">Flight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="e.g., Champ de Mars, Paris" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Additional details..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input id="duration" placeholder="e.g., 2h 30m" />
                </div>
                <div>
                  <Label htmlFor="cost">Cost per person</Label>
                  <Input id="cost" type="number" placeholder="25" />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
                  Add Activity
                </Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Day Selector */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {days.map((day) => (
          <Button
            key={day}
            variant={selectedDay === day ? "default" : "outline"}
            onClick={() => setSelectedDay(day)}
            className="whitespace-nowrap"
          >
            Day {day}
          </Button>
        ))}
        <Button variant="outline" className="whitespace-nowrap bg-transparent">
          <Plus className="h-4 w-4 mr-1" />
          Add Day
        </Button>
      </div>

      {/* Itinerary Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Day {selectedDay} Schedule</h3>
          <div className="text-sm text-gray-600">{dayItems.length} activities planned</div>
        </div>

        <div className="space-y-4">
          {dayItems.map((item, index) => (
            <Card key={item.id} className="relative">
              <CardContent className="p-4">
                <div className="flex items-start space-x-4">
                  {/* Time */}
                  <div className="flex flex-col items-center">
                    <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="text-sm font-medium mt-2">{item.time}</div>
                    {index < dayItems.length - 1 && <div className="w-px h-16 bg-gray-200 mt-2" />}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getTypeColor(item.type)}>
                            {getTypeIcon(item.type)}
                            <span className="ml-1 capitalize">{item.type}</span>
                          </Badge>
                          {item.cost && (
                            <Badge variant="outline">
                              <DollarSign className="h-3 w-3 mr-1" />${item.cost}
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                        <p className="text-gray-600 mb-2">{item.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {item.location}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {item.duration}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {dayItems.length === 0 && (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No activities planned</h3>
              <p className="text-gray-600 mb-4">Start building your itinerary for Day {selectedDay}</p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Activity
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Day Summary */}
      {dayItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Day {selectedDay} Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{dayItems.length}</div>
                <div className="text-sm text-gray-600">Activities</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${dayItems.reduce((sum, item) => sum + (item.cost || 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Total Cost</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {dayItems[0]?.time} - {dayItems[dayItems.length - 1]?.time}
                </div>
                <div className="text-sm text-gray-600">Time Span</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  <Star className="h-6 w-6 inline" />
                </div>
                <div className="text-sm text-gray-600">Fully Planned</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Add</CardTitle>
          <CardDescription>Common activities for your trip</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Button variant="outline" size="sm" className="justify-start bg-transparent">
              <Utensils className="h-4 w-4 mr-2" />
              Meal
            </Button>
            <Button variant="outline" size="sm" className="justify-start bg-transparent">
              <Camera className="h-4 w-4 mr-2" />
              Sightseeing
            </Button>
            <Button variant="outline" size="sm" className="justify-start bg-transparent">
              <Car className="h-4 w-4 mr-2" />
              Transport
            </Button>
            <Button variant="outline" size="sm" className="justify-start bg-transparent">
              <Hotel className="h-4 w-4 mr-2" />
              Check-in
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
