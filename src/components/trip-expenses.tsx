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
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  DollarSign,
  Plus,
  Receipt,
  Users,
  TrendingDown,
  CreditCard,
  Plane,
  Hotel,
  Utensils,
  Camera,
  Car,
  Edit,
  Trash2,
  Download,
} from "lucide-react"

interface Expense {
  id: number
  title: string
  amount: number
  category: "flight" | "hotel" | "food" | "activity" | "transport" | "other"
  paidBy: string
  splitBetween: string[]
  date: string
  description?: string
  receipt?: string
}

interface TripExpensesProps {
  trip: any
}

const mockExpenses: Expense[] = [
  {
    id: 1,
    title: "Flight tickets to Paris",
    amount: 2600,
    category: "flight",
    paidBy: "John Doe",
    splitBetween: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"],
    date: "2024-01-15",
    description: "Round trip flights for all members",
  },
  {
    id: 2,
    title: "Hotel Le Marais - 3 nights",
    amount: 720,
    category: "hotel",
    paidBy: "Jane Smith",
    splitBetween: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"],
    date: "2024-01-20",
    description: "Boutique hotel in 4th arrondissement",
  },
  {
    id: 3,
    title: "Dinner at Le Comptoir",
    amount: 180,
    category: "food",
    paidBy: "Mike Johnson",
    splitBetween: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"],
    date: "2024-01-22",
  },
  {
    id: 4,
    title: "Eiffel Tower tickets",
    amount: 120,
    category: "activity",
    paidBy: "Sarah Wilson",
    splitBetween: ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson"],
    date: "2024-01-23",
  },
  {
    id: 5,
    title: "Taxi to airport",
    amount: 45,
    category: "transport",
    paidBy: "John Doe",
    splitBetween: ["John Doe", "Jane Smith"],
    date: "2024-01-25",
  },
]

export function TripExpenses({ trip }: TripExpensesProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredExpenses =
    selectedCategory === "all" ? mockExpenses : mockExpenses.filter((expense) => expense.category === selectedCategory)

  const totalExpenses = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  const expensesByCategory = mockExpenses.reduce(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount
      return acc
    },
    {} as Record<string, number>,
  )

  const calculateSplit = () => {
    const balances: Record<string, number> = {}

    // Initialize balances
    trip.members.forEach((member: any) => {
      balances[member.name] = 0
    })

    // Calculate what each person paid and owes
    mockExpenses.forEach((expense) => {
      const splitAmount = expense.amount / expense.splitBetween.length

      // Person who paid gets credited
      balances[expense.paidBy] += expense.amount

      // Everyone who should split gets debited
      expense.splitBetween.forEach((person) => {
        balances[person] -= splitAmount
      })
    })

    return balances
  }

  const balances = calculateSplit()

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "flight":
        return <Plane className="h-4 w-4" />
      case "hotel":
        return <Hotel className="h-4 w-4" />
      case "food":
        return <Utensils className="h-4 w-4" />
      case "activity":
        return <Camera className="h-4 w-4" />
      case "transport":
        return <Car className="h-4 w-4" />
      default:
        return <Receipt className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "flight":
        return "bg-blue-100 text-blue-800"
      case "hotel":
        return "bg-blue-200 text-blue-900"
      case "food":
        return "bg-blue-50 text-blue-700"
      case "activity":
        return "bg-blue-300 text-blue-900"
      case "transport":
        return "bg-blue-400 text-white"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-blue-900">Trip Expenses</h2>
          <p className="text-gray-600">Track spending and split costs with your group</p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>Record a new expense for the trip</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="expense-title">Expense Title</Label>
                  <Input id="expense-title" placeholder="e.g., Dinner at restaurant" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" type="number" placeholder="100" />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flight">Flight</SelectItem>
                        <SelectItem value="hotel">Hotel</SelectItem>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="activity">Activity</SelectItem>
                        <SelectItem value="transport">Transport</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="paid-by">Paid By</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Who paid?" />
                    </SelectTrigger>
                    <SelectContent>
                      {trip.members.map((member: any) => (
                        <SelectItem key={member.id} value={member.name}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Split Between</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {trip.members.map((member: any) => (
                      <label key={member.id} className="flex items-center space-x-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span className="text-sm">{member.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea id="description" placeholder="Additional details..." />
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => setIsAddDialogOpen(false)}>
                    Add Expense
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-600 text-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-white/70">{((totalExpenses / trip.budget) * 100).toFixed(1)}% of budget</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-500 text-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Per Person</CardTitle>
            <Users className="h-4 w-4 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalExpenses / trip.members.length).toFixed(0)}</div>
            <p className="text-xs text-white/70">Average spending</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-700 text-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Remaining Budget</CardTitle>
            <TrendingDown className="h-4 w-4 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${trip.budget - totalExpenses}</div>
            <p className="text-xs text-white/70">Available to spend</p>
          </CardContent>
        </Card>

        <Card className="bg-blue-800 text-white border-0 shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white/90">Transactions</CardTitle>
            <Receipt className="h-4 w-4 text-white/80" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockExpenses.length}</div>
            <p className="text-xs text-white/70">Total expenses</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expenses List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-blue-900">Recent Expenses</h3>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="flight">Flights</SelectItem>
                <SelectItem value="hotel">Hotels</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="activity">Activities</SelectItem>
                <SelectItem value="transport">Transport</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            {filteredExpenses.map((expense) => (
              <Card key={expense.id} className="border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className={getCategoryColor(expense.category)}>
                          {getCategoryIcon(expense.category)}
                          <span className="ml-1 capitalize">{expense.category}</span>
                        </Badge>
                        <span className="text-sm text-gray-500">{expense.date}</span>
                      </div>
                      <h4 className="font-semibold mb-1">{expense.title}</h4>
                      {expense.description && <p className="text-sm text-gray-600 mb-2">{expense.description}</p>}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Paid by {expense.paidBy}</span>
                        <span>Split {expense.splitBetween.length} ways</span>
                        <span>${(expense.amount / expense.splitBetween.length).toFixed(2)} each</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold">${expense.amount}</div>
                      <div className="flex space-x-1 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Category Breakdown */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Spending by Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(expensesByCategory).map(([category, amount]) => (
                <div key={category}>
                  <div className="flex justify-between text-sm mb-1">
                    <div className="flex items-center">
                      {getCategoryIcon(category)}
                      <span className="ml-2 capitalize">{category}</span>
                    </div>
                    <span className="font-medium">${amount}</span>
                  </div>
                  <Progress value={(amount / totalExpenses) * 100} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Settlement */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Who Owes What</CardTitle>
              <CardDescription>Current balance for each member</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {Object.entries(balances).map(([person, balance]) => (
                <div key={person} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-500 text-white">
                        {person
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{person}</span>
                  </div>
                  <div
                    className={`font-bold ${balance > 0 ? "text-green-600" : balance < 0 ? "text-red-600" : "text-gray-600"}`}
                  >
                    {balance > 0
                      ? `+$${balance.toFixed(2)}`
                      : balance < 0
                        ? `-$${Math.abs(balance).toFixed(2)}`
                        : "$0.00"}
                  </div>
                </div>
              ))}
              <Separator />
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <CreditCard className="h-4 w-4 mr-2" />
                Settle Up
              </Button>
            </CardContent>
          </Card>

          {/* Budget Progress */}
          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-blue-900">Budget Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Spent</span>
                  <span>
                    ${totalExpenses} / ${trip.budget}
                  </span>
                </div>
                <Progress value={(totalExpenses / trip.budget) * 100} className="h-3" />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>{((totalExpenses / trip.budget) * 100).toFixed(1)}% used</span>
                  <span>${trip.budget - totalExpenses} remaining</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
