"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/client-side-auth";
import { toast } from "sonner";
import Link from "next/link";
import LinkLoadingIndicator from "@/lib/next/LinkLoadingIndicator";
import Image from "next/image";


export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        toast.error(result.error.message || "Sign in failed");
        return;
      }

      toast.success("Signed in successfully!");
      router.push(callbackUrl);
    } catch (error) {
      console.error("Sign in error:", error);
      toast.error("An error occurred during sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row pt-16" aria-label="Sign In Page">
      {/* pt-16 to account for fixed header */}
      {/* Brand Side */}
      <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10 p-12">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-primary/30 to-transparent blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-accent/30 to-transparent blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-primary/20 rounded-full animate-float" />
        <div className="absolute bottom-32 left-1/4 w-6 h-6 bg-accent/20 rotate-45 animate-float-delayed" />
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-secondary/30 rounded-full animate-float-slow" />

        <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-md">
          {/* Brand Logo with glow effect */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500" />
            <div className="relative bg-gradient-to-br from-background to-background/80 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
              <Image
                src="/globe.svg"
                alt="Earth & Home Logo"
                className="w-24 h-24 mx-auto drop-shadow-lg"
                width={96}
                height={96}
              />
            </div>
          </div>

          {/* Brand text with gradient */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-br from-primary via-accent to-secondary bg-clip-text text-transparent leading-tight">
              Earth & Home
            </h1>
            <p className="text-lg text-muted-foreground/80 leading-relaxed font-medium">
              Welcome back to your property discovery journey
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground/50 whitespace-nowrap">
            Discover • Connect • Call Home
          </div>
        </div>
      </div>
      {/* Login Form Side */}
      <div className="flex flex-1 items-center justify-center p-4 bg-background">
        <Card className="w-full max-w-md">
          <CardContent>
            <span
              className="block mb-6 text-5xl font-extrabold text-primary"
              aria-label="Sign In Label">
              Sign In
            </span>
            <form
              onSubmit={handleSignIn}
              className="space-y-4"
              role="form"
              aria-label="Sign in form">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  role="textbox"
                  aria-describedby="email-description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    role="textbox"
                    aria-describedby="password-description"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 bg-muted rounded hover:bg-accent focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((v) => !v)}>
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm flex flex-col justify-center items-center">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link href="/auth/signup" className="text-primary hover:underline flex gap-2">
                Sign up
                <LinkLoadingIndicator />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
