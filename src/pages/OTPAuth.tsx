import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Lock, Phone, Mail } from "lucide-react";

const OTPAuth = () => {
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"input" | "verify">("input");
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/");
      }
    };
    checkUser();
  }, [navigate]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (method === "phone" && !phone) {
      toast({
        title: "Error",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }

    if (method === "email" && !email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      if (method === "phone") {
        const { error } = await supabase.auth.signInWithOtp({
          phone: phone,
        });

        if (error) {
          toast({
            title: "Failed to send OTP",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setStep("verify");
          toast({
            title: "OTP Sent!",
            description: "Please check your phone for the verification code.",
          });
        }
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          email: email,
        });

        if (error) {
          toast({
            title: "Failed to send OTP",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setStep("verify");
          toast({
            title: "OTP Sent!",
            description: "Please check your email for the verification code.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter the complete 6-digit code",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const verifyData = method === "phone" 
        ? { phone: phone, token: otp, type: 'sms' as const }
        : { email: email, token: otp, type: 'email' as const };

      const { error } = await supabase.auth.verifyOtp(verifyData);

      if (error) {
        toast({
          title: "Verification Failed",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Welcome!",
          description: "You have successfully signed in.",
        });
        navigate("/");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setStep("input");
    setOtp("");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">
            Secure <span className="text-primary">Access</span>
          </h1>
          <p className="text-muted-foreground mt-2">
            Enter your {method} to receive a verification code
          </p>
        </div>

        <Card className="border-primary/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">OTP Authentication</CardTitle>
            <CardDescription className="text-center">
              {step === "input" 
                ? "Choose your preferred verification method" 
                : "Enter the 6-digit code sent to your device"
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            {step === "input" ? (
              <>
                <Tabs value={method} onValueChange={(value) => setMethod(value as "phone" | "email")} className="w-full mb-6">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="phone">Phone</TabsTrigger>
                    <TabsTrigger value="email">Email</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="phone">
                    <form onSubmit={handleSendOTP} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="pl-10"
                            disabled={loading}
                          />
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={loading}
                      >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Send OTP via SMS
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="email">
                    <form onSubmit={handleSendOTP} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                            disabled={loading}
                          />
                        </div>
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-primary hover:bg-primary/90"
                        disabled={loading}
                      >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Send OTP via Email
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="otp">Enter 6-Digit Code</Label>
                  <div className="flex justify-center">
                    <InputOTP
                      value={otp}
                      onChange={setOtp}
                      maxLength={6}
                      disabled={loading}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    Code sent to {method === "phone" ? phone : email}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={loading || otp.length !== 6}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Verify & Sign In
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full"
                    onClick={handleBack}
                    disabled={loading}
                  >
                    Back
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Button variant="ghost" asChild>
            <a href="/">← Back to Portfolio</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OTPAuth;