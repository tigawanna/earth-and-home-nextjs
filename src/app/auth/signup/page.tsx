"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/client-side-auth";
import { toast } from "sonner";
import Link from "next/link";
import LinkLoadingIndicator from "@/lib/next/LinkLoadingIndicator";
import Image from "next/image";
import { SiteIcon } from "@/components/icons/SiteIcon";
import { AuthLayoutHeader } from "@/app/auth/_components/AuthLayoutHeader";

export default function SignUpPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }

    setIsLoading(true);

    try {
      const result = await authClient.signUp.email({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        toast.error(result.error.message || "Sign up failed");
        return;
      }

      toast.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Sign up error:", error);
      toast.error("An error occurred during sign up");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row pt-16" aria-label="Sign Up Page">
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
              Start your property discovery journey today
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground/50 whitespace-nowrap">
            Discover • Connect • Call Home
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md shadow-sm">
          <CardContent className="pt-6">
            <h2 className="sr-only">Create your Earth & Home account</h2>
            <span className="block mb-6 text-3xl font-extrabold text-primary" aria-label="Sign Up Label">Sign Up</span>
            <form
              onSubmit={handleSignUp}
              className="space-y-4"
              role="form"
              aria-label="Sign up form">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                  role="textbox"
                  aria-describedby="name-description"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
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
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    role="textbox"
                    aria-describedby="password-description"
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 bg-muted rounded hover:bg-accent focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((v) => !v)}>
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <p id="password-description" className="text-xs text-muted-foreground">
                  Password must be at least 8 characters long
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    autoComplete="new-password"
                    role="textbox"
                    aria-describedby="confirm-password-description"
                    minLength={8}
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs px-2 py-1 bg-muted rounded hover:bg-accent focus:outline-none"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowConfirmPassword((v) => !v)}>
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm flex flex-col justify-center items-center">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/auth/signin" className="text-primary hover:underline flex gap-2">
                Sign in
                <LinkLoadingIndicator />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
