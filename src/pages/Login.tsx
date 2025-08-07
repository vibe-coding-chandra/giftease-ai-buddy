
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Gift, Mail, Lock, Chrome, Facebook, Apple } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className="page-gradient flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 group">
            <div className="p-3 bg-gift-gradient rounded-xl group-hover:animate-pulse-glow">
              <Gift className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gift-gradient bg-clip-text text-transparent">
              Giftease
            </span>
          </Link>
        </div>

        <Card className="card-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              {isSignUp ? "Create your account" : "Welcome back"}
            </CardTitle>
            <CardDescription>
              {isSignUp 
                ? "Start your journey to effortless gift-giving"
                : "Sign in to your account to continue"
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button className="w-full btn-secondary flex items-center justify-center space-x-2">
                <Chrome className="w-5 h-5" />
                <span>Continue with Google</span>
              </Button>
              
              <Button className="w-full btn-secondary flex items-center justify-center space-x-2">
                <Facebook className="w-5 h-5" />
                <span>Continue with Facebook</span>
              </Button>
              
              <Button className="w-full btn-secondary flex items-center justify-center space-x-2">
                <Apple className="w-5 h-5" />
                <span>Continue with Apple</span>
              </Button>
            </div>

            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-sm text-gray-500">
                or
              </span>
            </div>

            {/* Email/Password Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="input-modern pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="input-modern pl-10"
                  />
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="input-modern pl-10"
                    />
                  </div>
                </div>
              )}

              <Button className="w-full btn-hero">
                {isSignUp ? "Create Account" : "Sign In"}
              </Button>
            </div>

            {/* Toggle Form */}
            <div className="text-center text-sm text-gray-600">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-gift-primary hover:underline font-medium"
              >
                {isSignUp ? "Sign in" : "Sign up"}
              </button>
            </div>

            {!isSignUp && (
              <div className="text-center">
                <button className="text-sm text-gift-primary hover:underline">
                  Forgot your password?
                </button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Auth0 Note */}
        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Note: Authentication will be powered by Auth0 in production</p>
          <Link to="/dashboard" className="text-gift-primary hover:underline">
            Continue to Dashboard (Demo)
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
