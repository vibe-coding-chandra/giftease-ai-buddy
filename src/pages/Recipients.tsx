
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Users, Calendar, Edit, Gift, Heart } from "lucide-react";

const Recipients = () => {
  const [recipients, setRecipients] = useState([
    {
      id: 1,
      name: "Emma",
      age: 34,
      relationship: "Friend",
      interests: ["Cooking", "Travel", "Books"],
      nextEvent: "Birthday",
      nextEventDate: "2025-09-10",
      notes: "Loves Italian cuisine and mystery novels"
    },
    {
      id: 2,
      name: "Dad",
      age: 64,
      relationship: "Parent",
      interests: ["Fishing", "Gardening"],
      nextEvent: "Christmas",
      nextEventDate: "2025-12-25",
      notes: "Prefers practical gifts, enjoys outdoor activities"
    },
    {
      id: 3,
      name: "Sarah",
      age: 28,
      relationship: "Sister",
      interests: ["Yoga", "Photography", "Art"],
      nextEvent: "Wedding Anniversary",
      nextEventDate: "2025-08-15",
      notes: "Recently got into landscape photography"
    },
    {
      id: 4,
      name: "Mike",
      age: 32,
      relationship: "Brother",
      interests: ["Gaming", "Tech", "Fitness"],
      nextEvent: "Birthday",
      nextEventDate: "2025-11-22",
      notes: "Always looking for the latest gadgets"
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newRecipient, setNewRecipient] = useState({
    name: "",
    age: "",
    relationship: "",
    interests: "",
    nextEvent: "",
    nextEventDate: "",
    notes: ""
  });

  const handleAddRecipient = () => {
    const recipient = {
      id: recipients.length + 1,
      name: newRecipient.name,
      age: parseInt(newRecipient.age),
      relationship: newRecipient.relationship,
      interests: newRecipient.interests.split(",").map(i => i.trim()),
      nextEvent: newRecipient.nextEvent,
      nextEventDate: newRecipient.nextEventDate,
      notes: newRecipient.notes
    };
    
    setRecipients([...recipients, recipient]);
    setNewRecipient({
      name: "",
      age: "",
      relationship: "",
      interests: "",
      nextEvent: "",
      nextEventDate: "",
      notes: ""
    });
    setIsAddDialogOpen(false);
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const getDaysUntilEvent = (eventDate) => {
    const today = new Date();
    const event = new Date(eventDate);
    const timeDiff = event.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };

  return (
    <div className="page-gradient min-h-screen">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gift-gradient bg-clip-text text-transparent">
                Your Recipients
              </h1>
              <p className="text-xl text-gray-600">
                Manage the people you love to give gifts to
              </p>
            </div>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="btn-hero">
                  <Plus className="w-5 h-5 mr-2" />
                  Add Recipient
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Recipient</DialogTitle>
                  <DialogDescription>
                    Add someone special to your gift list
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newRecipient.name}
                        onChange={(e) => setNewRecipient({...newRecipient, name: e.target.value})}
                        className="input-modern"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        value={newRecipient.age}
                        onChange={(e) => setNewRecipient({...newRecipient, age: e.target.value})}
                        className="input-modern"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship</Label>
                    <Input
                      id="relationship"
                      placeholder="e.g., Friend, Sister, Colleague"
                      value={newRecipient.relationship}
                      onChange={(e) => setNewRecipient({...newRecipient, relationship: e.target.value})}
                      className="input-modern"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="interests">Interests</Label>
                    <Input
                      id="interests"
                      placeholder="Separate with commas: cooking, travel, books"
                      value={newRecipient.interests}
                      onChange={(e) => setNewRecipient({...newRecipient, interests: e.target.value})}
                      className="input-modern"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nextEvent">Next Event</Label>
                      <Input
                        id="nextEvent"
                        placeholder="e.g., Birthday, Anniversary"
                        value={newRecipient.nextEvent}
                        onChange={(e) => setNewRecipient({...newRecipient, nextEvent: e.target.value})}
                        className="input-modern"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nextEventDate">Event Date</Label>
                      <Input
                        id="nextEventDate"
                        type="date"
                        value={newRecipient.nextEventDate}
                        onChange={(e) => setNewRecipient({...newRecipient, nextEventDate: e.target.value})}
                        className="input-modern"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special notes about their preferences..."
                      value={newRecipient.notes}
                      onChange={(e) => setNewRecipient({...newRecipient, notes: e.target.value})}
                      className="input-modern"
                      rows={3}
                    />
                  </div>
                  
                  <Button onClick={handleAddRecipient} className="w-full btn-hero">
                    Add Recipient
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="card-minimal">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-gift-gradient rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{recipients.length}</div>
                <div className="text-sm text-gray-600">Total Recipients</div>
              </CardContent>
            </Card>
            
            <Card className="card-minimal">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-warm-gradient rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {recipients.filter(r => getDaysUntilEvent(r.nextEventDate) <= 30).length}
                </div>
                <div className="text-sm text-gray-600">Upcoming Events</div>
              </CardContent>
            </Card>
            
            <Card className="card-minimal">
              <CardContent className="p-4 text-center">
                <div className="w-12 h-12 bg-cool-gradient rounded-lg mx-auto mb-3 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800">
                  {recipients.reduce((acc, r) => acc + r.interests.length, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Interests</div>
              </CardContent>
            </Card>
          </div>

          {/* Recipients Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipients.map((recipient) => {
              const daysUntilEvent = getDaysUntilEvent(recipient.nextEventDate);
              
              return (
                <Card key={recipient.id} className="card-elegant group hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-gift-gradient text-white font-bold">
                            {getInitials(recipient.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gift-primary transition-colors">
                            {recipient.name}
                          </h3>
                          <p className="text-gray-600">{recipient.relationship} • {recipient.age}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Next Event */}
                    <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">{recipient.nextEvent}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(recipient.nextEventDate).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                        <Badge variant={daysUntilEvent <= 30 ? "destructive" : "secondary"}>
                          {daysUntilEvent} days
                        </Badge>
                      </div>
                    </div>

                    {/* Interests */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Interests:</p>
                      <div className="flex flex-wrap gap-1">
                        {recipient.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary" className="bg-gift-primary/10 text-gift-primary text-xs">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    {recipient.notes && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-600 italic">
                          "{recipient.notes}"
                        </p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" className="btn-accent flex-1">
                        <Gift className="w-4 h-4 mr-1" />
                        Find Gift
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recipients;
