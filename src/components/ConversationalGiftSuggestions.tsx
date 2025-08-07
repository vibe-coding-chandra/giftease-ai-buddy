
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User, ArrowRight, Sparkles, RefreshCw, Heart, ExternalLink, Share, Check } from "lucide-react";

interface Recipient {
  id: string;
  name: string;
  relationship: string;
  interests: string[];
  nextEvent?: string;
  nextEventDate?: string;
}

interface GiftSuggestion {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  match: string;
  link: string;
}

interface ConversationalGiftSuggestionsProps {
  recipients: Recipient[];
  onSaveIdea: (suggestion: GiftSuggestion) => void;
  onRestart: () => void;
  onGoToDashboard: () => void;
}

const ConversationalGiftSuggestions = ({ 
  recipients, 
  onSaveIdea, 
  onRestart, 
  onGoToDashboard 
}: ConversationalGiftSuggestionsProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
  const [eventType, setEventType] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [preferences, setPreferences] = useState({
    budgetRange: "",
    giftType: "",
    surpriseMe: null as boolean | null
  });
  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [savedIdeas, setSavedIdeas] = useState<number[]>([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<GiftSuggestion | null>(null);

  const eventOptions = ["Birthday", "Anniversary", "Graduation", "Just Because", "Baby Shower", "Wedding", "Christmas", "Valentine's Day"];
  const budgetRanges = ["Under $25", "$25-$50", "$50-$100", "$100-$250", "$250+"];
  const giftTypes = ["Experience", "Personalized", "Hobby-related", "Practical", "Sentimental"];

  const sampleSuggestions: GiftSuggestion[] = [
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

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleRecipientSelect = (recipient: Recipient) => {
    setSelectedRecipient(recipient);
    handleNext();
  };

  const handleEventSubmit = () => {
    if (eventType || eventDescription) {
      handleNext();
    }
  };

  const handlePreferencesSubmit = () => {
    handleNext();
  };

  const generateSuggestions = () => {
    setIsLoading(true);
    // Simulate AI generation
    setTimeout(() => {
      setSuggestions(sampleSuggestions);
      setIsLoading(false);
      handleNext();
    }, 2000);
  };

  const handleSaveIdea = (suggestion: GiftSuggestion) => {
    setSelectedSuggestion(suggestion);
    setShowSaveDialog(true);
  };

  const confirmSaveIdea = () => {
    if (selectedSuggestion) {
      setSavedIdeas([...savedIdeas, selectedSuggestion.id]);
      onSaveIdea(selectedSuggestion);
      setShowSaveDialog(false);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderMessage = (text: string, isBot: boolean = true) => (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
        isBot 
          ? 'bg-gradient-to-r from-gift-primary/10 to-accent-primary/10 text-gray-800' 
          : 'bg-gift-gradient text-white'
      }`}>
        {isBot && <User className="w-4 h-4 inline mr-2" />}
        <span className="text-sm">{text}</span>
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg min-h-96">
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {/* Introduction */}
          {renderMessage("Hi there! Let's help you find the perfect gift. I'll ask you a few quick questions.")}
          
          {/* Step 1: Who is this gift for? */}
          {currentStep >= 0 && renderMessage("Who is this gift for?")}
          {selectedRecipient && renderMessage(`This gift is for ${selectedRecipient.name}`, false)}
          
          {/* Step 2: Event */}
          {currentStep >= 1 && renderMessage(`What's the occasion or event for ${selectedRecipient?.name}?`)}
          {(eventType || eventDescription) && renderMessage(eventType || eventDescription, false)}
          
          {/* Step 3: Preferences */}
          {currentStep >= 2 && renderMessage("Do you have something in mind or want us to surprise you?")}
          {currentStep >= 2 && preferences.surpriseMe !== null && renderMessage(preferences.surpriseMe ? "Surprise me!" : "I have a few preferences...", false)}
          
          {/* Step 4: Loading */}
          {currentStep >= 3 && !isLoading && renderMessage("Got it! I'm thinking...")}
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <RefreshCw className="w-8 h-8 animate-spin text-gift-primary" />
              <span className="ml-2 text-gift-primary">Generating perfect gift ideas...</span>
            </div>
          )}
          
          {/* Step 5: Suggestions */}
          {currentStep >= 4 && suggestions.length > 0 && (
            <div className="space-y-4">
              {renderMessage("Here are some perfect gift ideas I found for you!")}
              
              <div className="space-y-4">
                {suggestions.map((suggestion) => (
                  <Card key={suggestion.id} className="card-elegant hover:scale-[1.02]">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold text-gray-800">
                              {suggestion.title}
                            </h3>
                            <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                              {suggestion.match} match
                            </Badge>
                          </div>
                          <Badge variant="outline" className="mb-2 text-xs">
                            {suggestion.category}
                          </Badge>
                          <p className="text-gray-600 text-sm mb-3">
                            {suggestion.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-gift-primary">
                          {suggestion.price}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSaveIdea(suggestion)}
                            disabled={savedIdeas.includes(suggestion.id)}
                          >
                            {savedIdeas.includes(suggestion.id) ? (
                              <Check className="w-4 h-4 mr-1" />
                            ) : (
                              <Heart className="w-4 h-4 mr-1" />
                            )}
                            {savedIdeas.includes(suggestion.id) ? 'Saved' : 'Save'}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share className="w-4 h-4 mr-1" />
                            Share
                          </Button>
                          <Button size="sm" className="btn-accent">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {renderMessage("Want to explore gifts for someone else?")}
              
              <div className="flex justify-center gap-4 pt-4">
                <Button onClick={onRestart} className="btn-hero">
                  Yes, find more gifts
                </Button>
                <Button variant="outline" onClick={onGoToDashboard}>
                  No, go to dashboard
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        {currentStep < 4 && !isLoading && (
          <Card className="border-t rounded-t-none">
            <CardContent className="p-4">
              {/* Recipient Selection */}
              {currentStep === 0 && !selectedRecipient && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">Choose from your recipients:</p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {recipients.map((recipient) => (
                      <Card 
                        key={recipient.id}
                        className="cursor-pointer hover:bg-gift-primary/5 border transition-colors"
                        onClick={() => handleRecipientSelect(recipient)}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-gift-gradient text-white text-sm">
                                {getInitials(recipient.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">{recipient.name}</p>
                              <p className="text-sm text-gray-600">{recipient.relationship}</p>
                              {recipient.nextEvent && (
                                <p className="text-xs text-gift-primary">
                                  {recipient.nextEvent} coming up
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Add a new recipient
                  </Button>
                </div>
              )}

              {/* Event Selection */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  {selectedRecipient?.nextEvent && (
                    <div className="p-3 bg-gift-primary/10 rounded-lg border">
                      <p className="text-sm text-gray-600 mb-2">Suggested based on upcoming events:</p>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setEventType(selectedRecipient.nextEvent!);
                          handleEventSubmit();
                        }}
                        className="w-full"
                      >
                        {selectedRecipient.nextEvent} on {new Date(selectedRecipient.nextEventDate!).toLocaleDateString()}
                      </Button>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600">Or choose an occasion:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {eventOptions.map((event) => (
                        <Button
                          key={event}
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEventType(event);
                            handleEventSubmit();
                          }}
                          className="hover:bg-gift-primary hover:text-white"
                        >
                          {event}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Or type a custom occasion..."
                        value={eventDescription}
                        onChange={(e) => setEventDescription(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleEventSubmit()}
                        className="flex-1"
                      />
                      <Button onClick={handleEventSubmit} disabled={!eventDescription.trim()}>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Preferences */}
              {currentStep === 2 && preferences.surpriseMe === null && (
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Button
                      onClick={() => {
                        setPreferences({...preferences, surpriseMe: true});
                        generateSuggestions();
                      }}
                      className="flex-1 btn-hero"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Surprise me!
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setPreferences({...preferences, surpriseMe: false});
                        handlePreferencesSubmit();
                      }}
                      className="flex-1"
                    >
                      I have preferences...
                    </Button>
                  </div>
                </div>
              )}

              {/* Detailed Preferences */}
              {currentStep === 3 && preferences.surpriseMe === false && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Budget Range</label>
                    <div className="grid grid-cols-2 gap-2">
                      {budgetRanges.map((range) => (
                        <Button
                          key={range}
                          variant={preferences.budgetRange === range ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPreferences({...preferences, budgetRange: range})}
                          className={preferences.budgetRange === range ? "bg-gift-primary" : ""}
                        >
                          {range}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Gift Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      {giftTypes.map((type) => (
                        <Button
                          key={type}
                          variant={preferences.giftType === type ? "default" : "outline"}
                          size="sm"
                          onClick={() => setPreferences({...preferences, giftType: type})}
                          className={preferences.giftType === type ? "bg-gift-primary" : ""}
                        >
                          {type}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <Button onClick={generateSuggestions} className="w-full btn-hero">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Find Perfect Gifts
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Save Ideas Dialog */}
      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Gift Idea</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Do you want to save "{selectedSuggestion?.title}" to your gift ideas?
            </p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                Cancel
              </Button>
              <Button onClick={confirmSaveIdea} className="bg-green-600 hover:bg-green-700">
                Yes, Save It
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ConversationalGiftSuggestions;
