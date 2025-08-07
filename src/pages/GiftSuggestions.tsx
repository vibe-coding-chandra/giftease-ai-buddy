
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import ConversationalGiftSuggestions from "@/components/ConversationalGiftSuggestions";
import { useToast } from "@/hooks/use-toast";

interface GiftSuggestion {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  match: string;
  link: string;
}

const GiftSuggestions = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  // Sample recipients data - in a real app, this would come from a database
  const recipients = [
    { 
      id: "1", 
      name: "Emma", 
      relationship: "Friend", 
      interests: ["Cooking", "Travel", "Books"],
      nextEvent: "Birthday",
      nextEventDate: "2025-09-10"
    },
    { 
      id: "2", 
      name: "Dad", 
      relationship: "Parent", 
      interests: ["Fishing", "Gardening"],
      nextEvent: "Christmas",
      nextEventDate: "2025-12-25"
    },
    { 
      id: "3", 
      name: "Sarah", 
      relationship: "Sister", 
      interests: ["Yoga", "Photography"],
      nextEvent: "Wedding Anniversary",
      nextEventDate: "2025-08-15"
    },
  ];

  const handleSaveIdea = (suggestion: GiftSuggestion) => {
    // In a real app, this would save to a database
    console.log("Saving gift idea:", suggestion);
    toast({
      title: "Gift idea saved!",
      description: `"${suggestion.title}" has been added to your saved ideas.`,
    });
  };

  const handleRestart = () => {
    // Reset the conversation
    window.location.reload();
  };

  const handleGoToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="page-gradient min-h-screen">
      <Header />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gift-gradient bg-clip-text text-transparent">
              Find the Perfect Gift
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Let our AI help you discover thoughtful, personalized gift ideas
            </p>
          </div>

          <ConversationalGiftSuggestions
            recipients={recipients}
            onSaveIdea={handleSaveIdea}
            onRestart={handleRestart}
            onGoToDashboard={handleGoToDashboard}
          />
        </div>
      </div>
    </div>
  );
};

export default GiftSuggestions;
