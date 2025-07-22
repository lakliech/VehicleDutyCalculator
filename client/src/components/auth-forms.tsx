import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/components/auth-provider";
import { apiRequest } from "@/lib/queryClient";
import { userRegistrationSchema, userLoginSchema, type UserRegistration, type UserLogin } from "@shared/schema";
import { Eye, EyeOff, User, Mail, Phone, Lock, LogIn, UserPlus, AlertCircle, KeyRound } from "lucide-react";
import { z } from "zod";

// Social login icons
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const AppleIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

interface AuthFormsProps {
  onAuthSuccess?: (user: any) => void;
}

export function AuthForms({ onAuthSuccess }: AuthFormsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const { toast } = useToast();
  const { login, register } = useAuth();

  const forgotPasswordForm = useForm<{ email: string }>({
    resolver: zodResolver(z.object({ email: z.string().email() })),
    defaultValues: { email: "" },
  });

  const loginForm = useForm<UserLogin>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<UserRegistration>({
    resolver: zodResolver(userRegistrationSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = async (data: UserLogin) => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await login(data.email, data.password);
      
      if (success) {
        toast({
          title: "Login Successful",
          description: `Welcome back!`,
        });
        setIsOpen(false);
        loginForm.reset();
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: UserRegistration) => {
    setIsLoading(true);
    setError(null);

    try {
      const success = await register(data);
      
      if (success) {
        toast({
          title: "Registration Successful",
          description: `Welcome to Gariyangu, ${data.firstName}!`,
        });
        setIsOpen(false);
        registerForm.reset();
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (data: { email: string }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Password Reset Email Sent",
          description: "Check your email for password reset instructions.",
        });
        setIsForgotPassword(false);
        setIsOpen(false);
        forgotPasswordForm.reset();
      } else {
        setError(result.message || "Failed to send reset email.");
      }
    } catch (error: any) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple' | 'facebook') => {
    setIsLoading(true);
    setError(null);

    try {
      // Get current page URL to return user after authentication
      const currentPage = window.location.pathname + window.location.search;
      const returnUrl = encodeURIComponent(currentPage);
      
      // Redirect to social login endpoint with return URL
      window.location.href = `/api/auth/${provider}?returnUrl=${returnUrl}`;
    } catch (error: any) {
      setError(`${provider} login failed. Please try again.`);
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
          <User className="w-4 h-4 mr-2" />
          Login / Register
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-purple-700">
            {isForgotPassword ? "Reset Password" : "Welcome to Gariyangu"}
          </DialogTitle>
        </DialogHeader>
        
        {isForgotPassword ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Forgot Password</CardTitle>
              <CardDescription>
                Enter your email to receive a password reset link
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...forgotPasswordForm}>
                <form onSubmit={forgotPasswordForm.handleSubmit(handleForgotPassword)} className="space-y-4">
                  <FormField
                    control={forgotPasswordForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              type="email"
                              placeholder="Enter your email"
                              className="pl-10"
                              disabled={isLoading}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setIsForgotPassword(false)}
                      disabled={isLoading}
                    >
                      Back to Login
                    </Button>
                    <Button 
                      type="submit" 
                      className="w-full bg-purple-600 hover:bg-purple-700" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send Reset Link"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        ) : (
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="flex items-center gap-2">
              <LogIn className="w-4 h-4" />
              Login
            </TabsTrigger>
            <TabsTrigger value="register" className="flex items-center gap-2">
              <UserPlus className="w-4 h-4" />
              Register
            </TabsTrigger>
          </TabsList>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sign In</CardTitle>
                <CardDescription>
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Social Login Buttons */}
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center gap-2 hover:bg-gray-50"
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                  >
                    <GoogleIcon />
                    Continue with Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center gap-2 hover:bg-gray-50"
                    onClick={() => handleSocialLogin('apple')}
                    disabled={isLoading}
                  >
                    <AppleIcon />
                    Continue with Apple
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center gap-2 hover:bg-gray-50"
                    onClick={() => handleSocialLogin('facebook')}
                    disabled={isLoading}
                  >
                    <FacebookIcon />
                    Continue with Facebook
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with email</span>
                  </div>
                </div>

                <Form {...loginForm}>
                  <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                    <FormField
                      control={loginForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type="email"
                                placeholder="Enter your email"
                                className="pl-10"
                                disabled={isLoading}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="pl-10 pr-10"
                                disabled={isLoading}
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center justify-between">
                      <Button 
                        type="button" 
                        variant="link" 
                        className="text-xs text-purple-600 hover:text-purple-700 p-0 h-auto"
                        onClick={() => setIsForgotPassword(true)}
                      >
                        Forgot password?
                      </Button>
                    </div>
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Create Account</CardTitle>
                <CardDescription>
                  Join Kenya's Car Marketplace today
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Social Login Buttons */}
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center gap-2 hover:bg-gray-50"
                    onClick={() => handleSocialLogin('google')}
                    disabled={isLoading}
                  >
                    <GoogleIcon />
                    Continue with Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center gap-2 hover:bg-gray-50"
                    onClick={() => handleSocialLogin('apple')}
                    disabled={isLoading}
                  >
                    <AppleIcon />
                    Continue with Apple
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center gap-2 hover:bg-gray-50"
                    onClick={() => handleSocialLogin('facebook')}
                    disabled={isLoading}
                  >
                    <FacebookIcon />
                    Continue with Facebook
                  </Button>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or register with email</span>
                  </div>
                </div>

                <Form {...registerForm}>
                  <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={registerForm.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                  {...field}
                                  placeholder="First name"
                                  className="pl-10"
                                  disabled={isLoading}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                  {...field}
                                  placeholder="Last name"
                                  className="pl-10"
                                  disabled={isLoading}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={registerForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type="email"
                                placeholder="Enter your email"
                                className="pl-10"
                                disabled={isLoading}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                placeholder="e.g., 0712345678"
                                className="pl-10"
                                disabled={isLoading}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password"
                                className="pl-10 pr-10"
                                disabled={isLoading}
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="pl-10 pr-10"
                                disabled={isLoading}
                              />
                              <button
                                type="button"
                                className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              >
                                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                      {isLoading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}