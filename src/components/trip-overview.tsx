import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, MapPin, Users, DollarSign, Clock, Plane, Hotel, Camera } from "lucide-react"

interface TripOverviewProps {
  trip: any
}

export function TripOverview({ trip }: TripOverviewProps) {
  const upcomingTasks = [
    { id: 1, task: "Book flights to Paris", due: "2 days", priority: "high" },
    { id: 2, task: "Reserve hotel in Rome", due: "5 days", priority: "medium" },
    { id: 3, task: "Vote on Barcelona activities", due: "1 week", priority: "low" },
    { id: 4, task: "Apply for travel insurance", due: "2 weeks", priority: "medium" },
  ]

  const recentActivity = [
    { id: 1, user: "Jane Smith", action: "added Rome to destinations", time: "2 hours ago" },
    { id: 2, user: "Mike Johnson", action: "voted for Colosseum tour", time: "4 hours ago" },
    { id: 3, user: "Sarah Wilson", action: "uploaded flight confirmation", time: "1 day ago" },
    { id: 4, user: "John Doe", action: "updated trip budget", time: "2 days ago" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Info */}
      <div className="lg:col-span-2 space-y-8">
        {/* Trip Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Days Until Trip</CardTitle>
              <Calendar className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-slate-900">45</div>
              <p className="text-xs text-slate-500">Jun 15, 2024</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Destinations</CardTitle>
              <MapPin className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-slate-900">3</div>
              <p className="text-xs text-slate-500">Cities confirmed</p>
            </CardContent>
          </Card>

          <Card className="border-slate-200 bg-white shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Budget Used</CardTitle>
              <DollarSign className="h-4 w-4 text-slate-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold text-slate-900">60%</div>
              <p className="text-xs text-slate-500">
                ${trip.spent} of ${trip.budget}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Tasks */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-slate-900 font-semibold">
              <Clock className="h-5 w-5 mr-2 text-slate-400" />
              Upcoming Tasks
            </CardTitle>
            <CardDescription className="text-slate-600">Important items that need attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        task.priority === "high"
                          ? "bg-red-500"
                          : task.priority === "medium"
                            ? "bg-amber-500"
                            : "bg-green-500"
                      }`}
                    />
                    <div>
                      <p className="font-medium text-slate-900">{task.task}</p>
                      <p className="text-sm text-slate-500">Due in {task.due}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
                  >
                    Complete
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900 font-semibold">Recent Activity</CardTitle>
            <CardDescription className="text-slate-600">Latest updates from your trip members</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-slate-100 text-slate-700 font-medium text-xs">
                      {activity.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm text-slate-900">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-slate-600">{activity.action}</span>
                    </p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Quick Actions */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900 font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-indigo-600 hover:bg-indigo-700 text-white">
              <Plane className="h-4 w-4 mr-2" />
              Book Flights
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
            >
              <Hotel className="h-4 w-4 mr-2" />
              Find Hotels
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
            >
              <Camera className="h-4 w-4 mr-2" />
              Add Activities
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
            >
              <Users className="h-4 w-4 mr-2" />
              Invite Friends
            </Button>
          </CardContent>
        </Card>

        {/* Budget Overview */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900 font-semibold">Budget Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Flights</span>
                <span className="font-medium text-slate-900">$800</span>
              </div>
              <Progress value={40} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Hotels</span>
                <span className="font-medium text-slate-900">$900</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Food</span>
                <span className="font-medium text-slate-900">$300</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-600">Activities</span>
                <span className="font-medium text-slate-900">$100</span>
              </div>
              <Progress value={5} className="h-2" />
            </div>
            <div className="pt-4 border-t border-slate-200">
              <div className="flex justify-between font-semibold text-slate-900">
                <span>Total Spent</span>
                <span>${trip.spent}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600 mt-1">
                <span>Remaining</span>
                <span>${trip.budget - trip.spent}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Weather Preview */}
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900 font-semibold">Weather Forecast</CardTitle>
            <CardDescription className="text-slate-600">Paris, France</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Today</span>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">☀️</span>
                  <span className="font-medium text-slate-900">22°C</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Tomorrow</span>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">⛅</span>
                  <span className="font-medium text-slate-900">19°C</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Day 3</span>
                <div className="flex items-center">
                  <span className="text-2xl mr-2">🌧️</span>
                  <span className="font-medium text-slate-900">16°C</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
