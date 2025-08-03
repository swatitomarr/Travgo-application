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
import {
  Plus,
  Navigation,
  Layers,
  Search,
  Star,
  Clock,
  DollarSign,
  Camera,
  Utensils,
  Hotel,
  Car,
  Edit,
  Trash2,
  Eye,
  EyeOff,
} from "lucide-react"

interface TripMapPin {
  id: number
  name: string
  type: "destination" | "hotel" | "restaurant" | "activity" | "transport" | "custom"
  coordinates: [number, number]
  description?: string
  rating?: number
  cost?: number
  visitDate?: string
  notes?: string
  color: string
}

interface TripMapProps {
  destinations: readonly unknown[]
}

const mockPins: TripMapPin[] = [
  {
    id: 1,
    name: "Eiffel Tower",
    type: "activity",
    coordinates: [48.8584, 2.2945],
    description: "Iconic iron lattice tower and symbol of Paris",
    rating: 4.6,
    cost: 25,
    visitDate: "2024-06-16",
    color: "green",
  },
  {
    id: 2,
    name: "Le Marais Hotel",
    type: "hotel",
    coordinates: [48.8566, 2.3522],
    description: "Boutique hotel in historic district",
    rating: 4.4,
    cost: 120,
    color: "purple",
  },
  {
    id: 3,
    name: "Louvre Museum",
    type: "activity",
    coordinates: [48.8606, 2.3376],
    description: "World's largest art museum",
    rating: 4.7,
    cost: 17,
    visitDate: "2024-06-17",
    color: "green",
  },
  {
    id: 4,
    name: "Café de Flore",
    type: "restaurant",
    coordinates: [48.8542, 2.332],
    description: "Historic café in Saint-Germain",
    rating: 4.2,
    cost: 35,
    color: "orange",
  },
  {
    id: 5,
    name: "Charles de Gaulle Airport",
    type: "transport",
    coordinates: [49.0097, 2.5479],
    description: "Main international airport",
    color: "blue",
  },
  {
    id: 6,
    name: "Seine River Cruise",
    type: "activity",
    coordinates: [48.8566, 2.3522],
    description: "Scenic boat tour along the Seine",
    rating: 4.3,
    cost: 15,
    visitDate: "2024-06-18",
    color: "green",
  },
]

export function TripMap({ }: TripMapProps) {
  const [selectedPin, setSelectedPin] = useState<TripMapPin | null>(null)
  const [isAddPinDialogOpen, setIsAddPinDialogOpen] = useState(false)
  const [visibleLayers, setVisibleLayers] = useState({
    destinations: true,
    hotels: true,
    restaurants: true,
    activities: true,
    transport: true,
    custom: true,
  })
  const [searchTerm, setSearchTerm] = useState("")

  const filteredPins = mockPins.filter((pin) => {
    const matchesSearch = pin.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLayer = visibleLayers[pin.type as keyof typeof visibleLayers]
    return matchesSearch && matchesLayer
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "destination":
        return <Plus className="h-4 w-4" />
      case "hotel":
        return <Hotel className="h-4 w-4" />
      case "restaurant":
        return <Utensils className="h-4 w-4" />
      case "activity":
        return <Camera className="h-4 w-4" />
      case "transport":
        return <Car className="h-4 w-4" />
      default:
        return <Plus className="h-4 w-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "destination":
        return "bg-red-100 text-red-800"
      case "hotel":
        return "bg-purple-100 text-purple-800"
      case "restaurant":
        return "bg-orange-100 text-orange-800"
      case "activity":
        return "bg-green-100 text-green-800"
      case "transport":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const toggleLayer = (layer: keyof typeof visibleLayers) => {
    setVisibleLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer],
    }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Trip Map</h2>
          <p className="text-gray-600">Visualize your journey and discover nearby places</p>
        </div>
        <Dialog open={isAddPinDialogOpen} onOpenChange={setIsAddPinDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Pin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Map Pin</DialogTitle>
              <DialogDescription>Mark a location on your trip map</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="pin-name">Location Name</Label>
                <Input id="pin-name" placeholder="e.g., Notre-Dame Cathedral" />
              </div>
              <div>
                <Label htmlFor="pin-type">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="activity">Activity</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="hotel">Hotel</SelectItem>
                    <SelectItem value="transport">Transport</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="pin-address">Address</Label>
                <Input id="pin-address" placeholder="Enter address or coordinates" />
              </div>
              <div>
                <Label htmlFor="pin-notes">Notes</Label>
                <Textarea id="pin-notes" placeholder="Additional information..." />
              </div>
              <div className="flex space-x-2">
                <Button className="flex-1" onClick={() => setIsAddPinDialogOpen(false)}>
                  Add Pin
                </Button>
                <Button variant="outline" onClick={() => setIsAddPinDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search locations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Navigation className="h-4 w-4 mr-1" />
                    Directions
                  </Button>
                  <Button variant="outline" size="sm">
                    <Layers className="h-4 w-4 mr-1" />
                    Layers
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Mock Map Display */}
              <div className="h-[500px] bg-gradient-to-br from-blue-100 to-green-100 relative rounded-b-lg overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 opacity-20" />

                {/* Mock Map Pins */}
                {filteredPins.map((pin) => (
                  <div
                    key={pin.id}
                    className={`absolute w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110`}
                    style={{
                      backgroundColor:
                        pin.color === "green"
                          ? "#10b981"
                          : pin.color === "purple"
                            ? "#8b5cf6"
                            : pin.color === "orange"
                              ? "#f59e0b"
                              : pin.color === "blue"
                                ? "#3b82f6"
                                : "#6b7280",
                      left: `${20 + pin.id * 15}%`,
                      top: `${30 + pin.id * 8}%`,
                    }}
                    onClick={() => setSelectedPin(pin)}
                  >
                    <div className="w-full h-full flex items-center justify-center text-white text-xs">
                      {getTypeIcon(pin.type)}
                    </div>
                  </div>
                ))}

                {/* Mock Route Line */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  <path
                    d="M 20% 30% Q 35% 38% 50% 46% T 80% 62%"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="5,5"
                    opacity="0.7"
                  />
                </svg>

                {/* Map Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <Button variant="outline" size="sm" className="bg-white">
                    +
                  </Button>
                  <Button variant="outline" size="sm" className="bg-white">
                    -
                  </Button>
                </div>

                {/* Mock Map Label */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-sm">
                  <p className="font-medium">Paris, France</p>
                  <p className="text-gray-600">Interactive Map View</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Layer Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Map Layers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(visibleLayers).map(([layer, visible]) => (
                <div key={layer} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(layer)}
                    <span className="text-sm capitalize">{layer}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => toggleLayer(layer as keyof typeof visibleLayers)}>
                    {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Selected Pin Details */}
          {selectedPin && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{selectedPin.name}</CardTitle>
                  <Badge className={getTypeColor(selectedPin.type)}>
                    {getTypeIcon(selectedPin.type)}
                    <span className="ml-1 capitalize">{selectedPin.type}</span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedPin.description && <p className="text-sm text-gray-600">{selectedPin.description}</p>}

                <div className="space-y-2">
                  {selectedPin.rating && (
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{selectedPin.rating}/5</span>
                    </div>
                  )}

                  {selectedPin.cost && (
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <span className="text-sm">${selectedPin.cost}</span>
                    </div>
                  )}

                  {selectedPin.visitDate && (
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{selectedPin.visitDate}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1">
                    <Navigation className="h-4 w-4 mr-1" />
                    Directions
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Nearby Places */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Nearby Places</CardTitle>
              <CardDescription>Discover attractions around your route</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <Camera className="h-4 w-4 text-green-600" />
                    <div>
                      <p className="text-sm font-medium">Arc de Triomphe</p>
                      <p className="text-xs text-gray-500">0.8 km away</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <Utensils className="h-4 w-4 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium">Le Procope</p>
                      <p className="text-xs text-gray-500">0.3 km away</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <Hotel className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="text-sm font-medium">Hotel des Grands</p>
                      <p className="text-xs text-gray-500">0.5 km away</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trip Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Trip Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Distance</span>
                <span className="text-sm font-medium">2,847 km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Locations</span>
                <span className="text-sm font-medium">{mockPins.length} pins</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Countries</span>
                <span className="text-sm font-medium">3 countries</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Travel Time</span>
                <span className="text-sm font-medium">15 days</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
