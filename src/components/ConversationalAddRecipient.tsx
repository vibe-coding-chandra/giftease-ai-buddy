
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, User, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Recipient {
  name: string;
  relationship: string;
  age: number | string;
  interests: string[];
  nextEvent?: {
    label: string;
    date: Date;
  };
}

interface ConversationalAddRecipientProps {
  onSave: (recipient: any) => void;
  onCancel: () => void;
}

const ConversationalAddRecipient = ({ onSave, onCancel }: ConversationalAddRecipientProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [recipient, setRecipient] = useState<Recipient>({
    name: "",
    relationship: "",
    age: "",
    interests: [],
    nextEvent: undefined
  });
  const [inputValue, setInputValue] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [eventLabel, setEventLabel] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  const relationships = ["Friend", "Parent", "Partner", "Sibling", "Colleague", "Other"];
  const ageRanges = ["0-5", "6-12", "13-18", "19-30", "31-50", "51+"];
  const interestOptions = ["Cooking", "Sports", "Reading", "Fashion", "Gaming", "Music", "Travel", "Tech"];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      setInputValue("");
    }
  };

  const handleNameSubmit = () => {
    if (inputValue.trim()) {
      setRecipient({ ...recipient, name: inputValue.trim() });
      handleNext();
    }
  };

  const handleRelationshipSelect = (relationship: string) => {
    setRecipient({ ...recipient, relationship });
    handleNext();
  };

  const handleAgeSubmit = () => {
    if (inputValue.trim() || recipient.age) {
      const age = inputValue.trim() || recipient.age;
      setRecipient({ ...recipient, age });
      handleNext();
    }
  };

  const handleAgeRangeSelect = (range: string) => {
    setRecipient({ ...recipient, age: range });
    handleNext();
  };

  const toggleInterest = (interest: string) => {
    const newInterests = recipient.interests.includes(interest)
      ? recipient.interests.filter(i => i !== interest)
      : [...recipient.interests, interest];
    setRecipient({ ...recipient, interests: newInterests });
  };

  const handleInterestsNext = () => {
    handleNext();
  };

  const handleEventSubmit = () => {
    if (selectedDate && eventLabel) {
      setRecipient({
        ...recipient,
        nextEvent: { label: eventLabel, date: selectedDate }
      });
    }
    setShowSummary(true);
  };

  const handleSkipEvent = () => {
    setShowSummary(true);
  };

  const handleSave = () => {
    const recipientData = {
      id: Date.now(),
      name: recipient.name,
      age: typeof recipient.age === 'string' && recipient.age.includes('-') ? recipient.age : parseInt(recipient.age as string),
      relationship: recipient.relationship,
      interests: recipient.interests,
      nextEvent: recipient.nextEvent?.label || "No upcoming events",
      nextEventDate: recipient.nextEvent?.date ? recipient.nextEvent.date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      notes: `Added through conversational interface`
    };
    onSave(recipientData);
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
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="h-96 overflow-y-auto mb-6 space-y-4">
        {/* Introduction */}
        {renderMessage("Let's help you add someone special to your gifting list. I'll ask you a few quick questions.")}
        
        {/* Step 1: Name */}
        {currentStep >= 0 && renderMessage("What's the name of the person you're gifting to?")}
        {recipient.name && renderMessage(recipient.name, false)}
        
        {/* Step 2: Relationship */}
        {currentStep >= 1 && renderMessage(`What's your relationship with ${recipient.name}?`)}
        {recipient.relationship && renderMessage(recipient.relationship, false)}
        
        {/* Step 3: Age */}
        {currentStep >= 2 && renderMessage(`How old is ${recipient.name}? If you're not sure, just give an estimate.`)}
        {recipient.age && renderMessage(recipient.age.toString(), false)}
        
        {/* Step 4: Interests */}
        {currentStep >= 3 && renderMessage(`What are ${recipient.name}'s interests or hobbies?`)}
        {recipient.interests.length > 0 && renderMessage(recipient.interests.join(", "), false)}
        
        {/* Step 5: Event */}
        {currentStep >= 4 && renderMessage(`Do you want to be reminded of a special date for ${recipient.name}? Like a birthday or anniversary?`)}
        {recipient.nextEvent && renderMessage(`${recipient.nextEvent.label} on ${format(recipient.nextEvent.date, "PPP")}`, false)}
        
        {/* Summary */}
        {showSummary && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border">
            {renderMessage(`Great! Here's what we've got for ${recipient.name}:
            
• Relationship: ${recipient.relationship}
• Age: ${recipient.age}
• Interests: ${recipient.interests.join(', ') || 'None specified'}
• Next Event: ${recipient.nextEvent ? `${recipient.nextEvent.label} on ${format(recipient.nextEvent.date, "PPP")}` : 'None specified'}

Would you like to save this profile?`)}
          </div>
        )}
      </div>

      {/* Input Area */}
      <Card className="border-t">
        <CardContent className="p-4">
          {currentStep === 0 && !recipient.name && (
            <div className="flex space-x-2">
              <Input
                placeholder="Enter their name..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                className="flex-1"
              />
              <Button onClick={handleNameSubmit} disabled={!inputValue.trim()}>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {currentStep === 1 && !recipient.relationship && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Choose a relationship:</p>
              <div className="flex flex-wrap gap-2">
                {relationships.map((rel) => (
                  <Button
                    key={rel}
                    variant="outline"
                    size="sm"
                    onClick={() => handleRelationshipSelect(rel)}
                    className="hover:bg-gift-primary hover:text-white"
                  >
                    {rel}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {currentStep === 2 && !recipient.age && (
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter age..."
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAgeSubmit()}
                  className="flex-1"
                />
                <Button onClick={handleAgeSubmit} disabled={!inputValue.trim()}>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-center text-gray-500">or</div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Choose an age range:</p>
                <div className="flex flex-wrap gap-2">
                  {ageRanges.map((range) => (
                    <Button
                      key={range}
                      variant="outline"
                      size="sm"
                      onClick={() => handleAgeRangeSelect(range)}
                      className="hover:bg-gift-primary hover:text-white"
                    >
                      {range}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Select interests (tap to toggle):</p>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => (
                  <Badge
                    key={interest}
                    variant={recipient.interests.includes(interest) ? "default" : "secondary"}
                    className={`cursor-pointer transition-colors ${
                      recipient.interests.includes(interest)
                        ? 'bg-gift-primary text-white'
                        : 'hover:bg-gift-primary/20'
                    }`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
              <Button onClick={handleInterestsNext} className="w-full mt-4">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}

          {currentStep === 4 && !showSummary && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Event Type</label>
                  <Input
                    placeholder="Birthday, Anniversary..."
                    value={eventLabel}
                    onChange={(e) => setEventLabel(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleEventSubmit} disabled={!selectedDate || !eventLabel} className="flex-1">
                  Add Event
                </Button>
                <Button variant="outline" onClick={handleSkipEvent} className="flex-1">
                  Skip
                </Button>
              </div>
            </div>
          )}

          {showSummary && (
            <div className="flex space-x-2">
              <Button onClick={handleSave} className="flex-1 bg-green-600 hover:bg-green-700">
                Yes, Save Profile
              </Button>
              <Button variant="outline" onClick={onCancel} className="flex-1">
                No, Start Over
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ConversationalAddRecipient;
