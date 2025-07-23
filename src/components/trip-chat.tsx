"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Send,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  MapPin,
  Calendar,
  DollarSign,
  ImageIcon,
  File,
} from "lucide-react"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
  type: "text" | "image" | "file" | "poll" | "expense" | "location"
  metadata?: any
}

interface TripChatProps {
  members: any[]
}

const mockMessages: Message[] = [
  {
    id: 1,
    sender: "John Doe",
    content: "Hey everyone! Just booked our flights to Paris 🎉",
    timestamp: "10:30 AM",
    type: "text",
  },
  {
    id: 2,
    sender: "Jane Smith",
    content: "Awesome! What time do we land?",
    timestamp: "10:32 AM",
    type: "text",
  },
  {
    id: 3,
    sender: "John Doe",
    content: "We arrive at 6:30 PM local time. I'll share the flight details.",
    timestamp: "10:33 AM",
    type: "text",
  },
  {
    id: 4,
    sender: "Mike Johnson",
    content: "Added a new expense: Flight tickets - $2,600",
    timestamp: "10:35 AM",
    type: "expense",
    metadata: { amount: 2600, category: "flight" },
  },
  {
    id: 5,
    sender: "Sarah Wilson",
    content: "Perfect! I found a great restaurant near our hotel. Should we make a reservation?",
    timestamp: "11:15 AM",
    type: "text",
  },
  {
    id: 6,
    sender: "Sarah Wilson",
    content: "Le Comptoir du Relais",
    timestamp: "11:16 AM",
    type: "location",
    metadata: { name: "Le Comptoir du Relais", address: "9 Carrefour de l'Odéon, Paris" },
  },
  {
    id: 7,
    sender: "Jane Smith",
    content: "Looks amazing! I'm in 👍",
    timestamp: "11:20 AM",
    type: "text",
  },
  {
    id: 8,
    sender: "Mike Johnson",
    content: "Same here! What time should we book?",
    timestamp: "11:22 AM",
    type: "text",
  },
]

export function TripChat({ members }: TripChatProps) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState(mockMessages)

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: "John Doe", // Current user
        content: message,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        type: "text",
      }
      setMessages([...messages, newMessage])
      setMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const renderMessage = (msg: Message) => {
    const isCurrentUser = msg.sender === "John Doe"

    return (
      <div key={msg.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}>
        <div className={`flex ${isCurrentUser ? "flex-row-reverse" : "flex-row"} items-start space-x-2 max-w-[70%]`}>
          {!isCurrentUser && (
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {msg.sender
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          )}

          <div className={`${isCurrentUser ? "mr-2" : "ml-2"}`}>
            {!isCurrentUser && <div className="text-xs text-gray-500 mb-1">{msg.sender}</div>}

            <div className={`rounded-lg p-3 ${isCurrentUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"}`}>
              {msg.type === "text" && <p className="text-sm">{msg.content}</p>}

              {msg.type === "expense" && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-sm font-medium">New Expense Added</span>
                  </div>
                  <p className="text-sm">{msg.content}</p>
                  <Badge variant="secondary" className="text-xs">
                    ${msg.metadata.amount} - {msg.metadata.category}
                  </Badge>
                </div>
              )}

              {msg.type === "location" && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm font-medium">Location Shared</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{msg.metadata.name}</p>
                    <p className="text-xs opacity-80">{msg.metadata.address}</p>
                  </div>
                  <Button size="sm" variant="secondary" className="text-xs">
                    View on Map
                  </Button>
                </div>
              )}
            </div>

            <div className={`text-xs text-gray-500 mt-1 ${isCurrentUser ? "text-right" : "text-left"}`}>
              {msg.timestamp}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Group Chat</h2>
          <p className="text-gray-600">Stay connected with your travel companions</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Video className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-3">
          <Card className="h-[600px] flex flex-col">
            {/* Chat Header */}
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {members.slice(0, 3).map((member) => (
                      <Avatar key={member.id} className="border-2 border-white h-8 w-8">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {members.length > 3 && (
                      <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                        +{members.length - 3}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">European Adventure</p>
                    <p className="text-sm text-gray-500">{members.length} members</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                  Online
                </Badge>
              </div>
            </CardHeader>

            <Separator />

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4">
              <div className="space-y-1">{messages.map(renderMessage)}</div>
            </CardContent>

            <Separator />

            {/* Message Input */}
            <div className="p-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-10"
                  />
                  <Button variant="ghost" size="sm" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={handleSendMessage} disabled={!message.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Members */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Members</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {members.map((member) => (
                <div key={member.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Share</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <MapPin className="h-4 w-4 mr-2" />
                Share Location
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Share Event
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <DollarSign className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                <File className="h-4 w-4 mr-2" />
                Share File
              </Button>
            </CardContent>
          </Card>

          {/* Recent Files */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Files</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                <File className="h-4 w-4 text-blue-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Flight_Confirmation.pdf</p>
                  <p className="text-xs text-gray-500">Shared by John</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                <ImageIcon className="h-4 w-4 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Hotel_Photos.jpg</p>
                  <p className="text-xs text-gray-500">Shared by Jane</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                <File className="h-4 w-4 text-purple-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Itinerary_Draft.docx</p>
                  <p className="text-xs text-gray-500">Shared by Mike</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
