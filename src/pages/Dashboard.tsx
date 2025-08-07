
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, Gift, Heart, Clock, Plus, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [reminders] = useState([
    {
      id: 1,
      recipient: "Emma",
      event: "Birthday",
      date: "2025-09-10",
      daysLeft: 45,
      status: "pending"
    },
    {
      id: 2,
      recipient: "Dad",
      event: "Christmas",
      date: "2025-12-25",
      daysLeft: 140,
      status: "planning"
    }
  ]);

  const [topRecipients] = useState([
    { name: "Emma", relationship: "Friend", age: 34, initials: "EM" },
    { name: "Dad", relationship: "Parent", age: 64, initials: "DA" },
    { name: "Sarah", relationship: "Sister", age: 28, initials: "SA" },
    { name: "Mike", relationship: "Brother", age: 32, initials: "MI" }
  ]);

  const [recentActivity] = useState([
    {
      id: 1,
      action: "Added new recipient",
      recipient: "Emma",
      time: "2 hours ago"
    },
    {
      id: 2,
      action: "Generated gift suggestions",
      recipient: "Dad",
      time: "1 day ago"
    },
    {
      id: 3,
      action: "Set reminder",
      recipient: "Emma",
      time: "2 days ago"
    }
  ]);

  return (
    <div className="page-gradient min-h-screen">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 bg-gift-gradient bg-clip-text text-transparent">
              Welcome back, Chandra! 🎁
            </h1>
            <p className="text-xl text-gray-600">
              You have {reminders.length} upcoming events to plan for
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="card-minimal">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-gift-gradient rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800">12</div>
                <div className="text-sm text-gray-600">Gifts Given</div>
              </CardContent>
            </Card>
            
            <Card className="card-minimal">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-warm-gradient rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{topRecipients.length}</div>
                <div className="text-sm text-gray-600">Recipients</div>
              </CardContent>
            </Card>
            
            <Card className="card-minimal">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-cool-gradient rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{reminders.length}</div>
                <div className="text-sm text-gray-600">Reminders</div>
              </CardContent>
            </Card>
            
            <Card className="card-minimal">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-gift-gradient rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800">3</div>
                <div className="text-sm text-gray-600">This Month</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Reminders & Recipients */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gift Reminders */}
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-gift-primary" />
                      Upcoming Reminders
                    </span>
                    <Link to="/recipients">
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    Don't miss any special occasions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reminders.map((reminder) => (
                      <div key={reminder.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:border-gift-primary/30 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gift-gradient rounded-lg flex items-center justify-center">
                            <Gift className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">
                              {reminder.recipient}'s {reminder.event}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {new Date(reminder.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={reminder.daysLeft <= 30 ? "destructive" : "secondary"}>
                            {reminder.daysLeft} days left
                          </Badge>
                          <div className="mt-2">
                            <Link to="/gift-suggestions">
                              <Button size="sm" className="btn-accent">
                                Find Gift
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Recipients */}
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Heart className="w-5 h-5 mr-2 text-gift-secondary" />
                      Your Recipients
                    </span>
                    <Link to="/recipients">
                      <Button variant="outline" size="sm">
                        <Plus className="w-4 h-4 mr-1" />
                        Add New
                      </Button>
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    People you love to give gifts to
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {topRecipients.map((recipient, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 border border-gray-100 rounded-lg hover:border-gift-primary/30 transition-colors">
                        <Avatar>
                          <AvatarFallback className="bg-gift-gradient text-white font-semibold">
                            {recipient.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium text-gray-800">{recipient.name}</h4>
                          <p className="text-sm text-gray-600">{recipient.relationship}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Activity & Quick Actions */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="text-gift-primary">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/gift-suggestions" className="block">
                    <Button className="w-full justify-start btn-secondary">
                      <Gift className="w-4 h-4 mr-2" />
                      Find a Gift
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </Button>
                  </Link>
                  <Link to="/recipients" className="block">
                    <Button className="w-full justify-start btn-secondary">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Recipient
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </Button>
                  </Link>
                  <Link to="/explore" className="block">
                    <Button className="w-full justify-start btn-secondary">
                      <Heart className="w-4 h-4 mr-2" />
                      Explore Gifts
                      <ArrowRight className="w-4 h-4 ml-auto" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="card-elegant">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-gift-accent" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-gift-primary rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm text-gray-800">
                            {activity.action} <strong>{activity.recipient}</strong>
                          </p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
