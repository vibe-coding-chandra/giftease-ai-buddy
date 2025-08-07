
import { useState } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Search, Heart, ExternalLink, RefreshCw } from "lucide-react";

const GiftSuggestions = () => {
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const recipients = [
    { id: "1", name: "Emma", relationship: "Friend", interests: ["Cooking", "Travel", "Books"] },
    { id: "2", name: "Dad", relationship: "Parent", interests: ["Fishing", "Gardening"] },
    { id: "3", name: "Sarah", relationship: "Sister", interests: ["Yoga", "Photography"] },
  ];

  const sampleSuggestions = [
    {
      id: 1,
      title: "Professional Cooking Class",
      description: "A hands-on cooking class focusing on Italian cuisine, perfect for someone who loves to cook and learn new techniques.",
      price: "$120 - $180",
      category: "Experience",
      match: "95%",
      link: "#"
    },
    {
      id: 2,
      title: "Travel Journal Set",
      description: "Beautifully crafted leather-bound travel journal with world map and planning pages.",
      price: "$35 - $65",
      category: "Accessory",
      match: "88%",
      link: "#"
    },
    {
      id: 3,
      title: "Signed Book Collection",
      description: "First edition books from her favorite authors, professionally authenticated and beautifully presented.",
      price: "$80 - $250",
      category: "Books",
      match: "92%",
      link: "#"
    }
  ];

  const generateSuggestions = () => {
    setIsLoading(true);
    // Simulate AI generation
    setTimeout(() => {
      setSuggestions(sampleSuggestions);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="page-gradient min-h-screen">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gift-gradient bg-clip-text text-transparent">
              Find the Perfect Gift
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Let our AI help you discover thoughtful, personalized gift ideas
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-1">
              <Card className="card-elegant sticky top-28">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Search className="w-5 h-5 mr-2 text-gift-primary" />
                    Gift Finder
                  </CardTitle>
                  <CardDescription>
                    Tell us about the recipient and occasion
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Select Recipient</Label>
                    <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
                      <SelectTrigger className="input-modern">
                        <SelectValue placeholder="Choose a recipient" />
                      </SelectTrigger>
                      <SelectContent>
                        {recipients.map((recipient) => (
                          <SelectItem key={recipient.id} value={recipient.id}>
                            <div className="flex flex-col">
                              <span>{recipient.name}</span>
                              <span className="text-sm text-gray-500">{recipient.relationship}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedRecipient && (
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
                      <h4 className="font-medium mb-2">Recipient Interests:</h4>
                      <div className="flex flex-wrap gap-2">
                        {recipients.find(r => r.id === selectedRecipient)?.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary" className="bg-gift-primary/10 text-gift-primary">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="event">Event Description</Label>
                    <Textarea
                      id="event"
                      placeholder="e.g., Birthday party, Christmas celebration, graduation gift..."
                      value={eventDescription}
                      onChange={(e) => setEventDescription(e.target.value)}
                      className="input-modern resize-none"
                      rows={3}
                    />
                  </div>

                  <Button 
                    onClick={generateSuggestions}
                    disabled={!selectedRecipient || !eventDescription || isLoading}
                    className="w-full btn-hero"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                        Generating Ideas...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Gift Ideas
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Suggestions Grid */}
            <div className="lg:col-span-2">
              {suggestions.length === 0 ? (
                <Card className="card-elegant h-64 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Select a recipient and describe the event to get started</p>
                  </div>
                </Card>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-800">
                      AI-Generated Suggestions
                    </h2>
                    <Badge className="bg-gift-primary/10 text-gift-primary">
                      {suggestions.length} ideas found
                    </Badge>
                  </div>

                  <div className="grid gap-6">
                    {suggestions.map((suggestion, index) => (
                      <Card key={suggestion.id} className="card-elegant group hover:scale-[1.02]">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gift-primary transition-colors">
                                  {suggestion.title}
                                </h3>
                                <Badge 
                                  variant="secondary" 
                                  className="bg-green-100 text-green-800"
                                >
                                  {suggestion.match} match
                                </Badge>
                              </div>
                              <Badge variant="outline" className="mb-3">
                                {suggestion.category}
                              </Badge>
                              <p className="text-gray-600 mb-4 leading-relaxed">
                                {suggestion.description}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-gift-primary">
                              {suggestion.price}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Heart className="w-4 h-4 mr-1" />
                                Save
                              </Button>
                              <Button size="sm" className="btn-accent">
                                <ExternalLink className="w-4 h-4 mr-1" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="text-center pt-6">
                    <Button variant="outline" onClick={generateSuggestions} disabled={isLoading}>
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Generate More Ideas
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftSuggestions;
