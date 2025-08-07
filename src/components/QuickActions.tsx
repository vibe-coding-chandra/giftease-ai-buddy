
import { Button } from "@/components/ui/button";
import { Gift, Users, Compass } from "lucide-react";
import { Link } from "react-router-dom";

const QuickActions = () => {
  const actions = [
    {
      title: "Find a Gift",
      description: "Get AI-powered gift suggestions for any occasion",
      icon: Gift,
      href: "/gift-suggestions",
      gradient: "bg-gift-gradient",
    },
    {
      title: "Manage Recipients",
      description: "Keep track of your loved ones and their preferences",
      icon: Users,
      href: "/recipients",
      gradient: "bg-warm-gradient",
    },
    {
      title: "Explore Gifts",
      description: "Discover trending gift ideas from the community",
      icon: Compass,
      href: "/explore",
      gradient: "bg-cool-gradient",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gift-gradient bg-clip-text text-transparent">
            What would you like to do?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose your path to perfect gift-giving
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {actions.map((action, index) => (
            <Link key={action.title} to={action.href} className="group">
              <div className="card-elegant h-full text-center group-hover:scale-105 group-hover:-translate-y-2">
                <div className={`w-16 h-16 ${action.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:animate-pulse-glow`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {action.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {action.description}
                </p>
                <Button className="btn-secondary group-hover:bg-gift-primary group-hover:text-white">
                  Get Started
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickActions;
