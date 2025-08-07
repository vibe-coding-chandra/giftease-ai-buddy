
import { Button } from "@/components/ui/button";
import { Gift, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50" />
      <div className="absolute top-20 left-10 floating-element opacity-20">
        <Gift className="w-16 h-16 text-gift-primary" />
      </div>
      <div className="absolute top-40 right-16 floating-element opacity-20" style={{ animationDelay: '2s' }}>
        <Heart className="w-12 h-12 text-gift-secondary" />
      </div>
      <div className="absolute bottom-32 left-20 floating-element opacity-20" style={{ animationDelay: '4s' }}>
        <Sparkles className="w-10 h-10 text-gift-accent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Headline */}
          <h1 className="hero-text mb-6">
            Gift-Giving
            <br />
            Made
            <span className="block bg-gradient-to-r from-gift-warm to-gift-accent bg-clip-text text-transparent">
              Effortless
            </span>
          </h1>

          {/* Subtitle */}
          <p className="subtitle-text mb-12">
            Transform how you give gifts with AI-powered suggestions, recipient management, 
            and collaborative planning. Never miss a special moment again.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/gift-suggestions">
              <Button className="btn-hero w-full sm:w-auto">
                <Gift className="w-5 h-5 mr-2" />
                Find Perfect Gifts
              </Button>
            </Link>
            <Link to="/recipients">
              <Button className="btn-secondary w-full sm:w-auto">
                Manage Recipients
              </Button>
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="card-elegant group hover:scale-105">
              <div className="w-12 h-12 bg-gift-gradient rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse-glow">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">AI-Powered Suggestions</h3>
              <p className="text-gray-600">
                Get personalized gift recommendations based on recipient interests and your history.
              </p>
            </div>

            <div className="card-elegant group hover:scale-105">
              <div className="w-12 h-12 bg-warm-gradient rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse-glow">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Never Forget Again</h3>
              <p className="text-gray-600">
                Smart reminders for birthdays, anniversaries, and special occasions with your loved ones.
              </p>
            </div>

            <div className="card-elegant group hover:scale-105">
              <div className="w-12 h-12 bg-cool-gradient rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse-glow">
                <Gift className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">Collaborate & Share</h3>
              <p className="text-gray-600">
                Work together on group gifts and share memorable moments with your community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
