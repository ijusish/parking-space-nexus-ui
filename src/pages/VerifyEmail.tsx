
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { Mail } from "lucide-react";

const VerifyEmail: React.FC = () => {
  const { sendVerificationEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isResending, setIsResending] = React.useState(false);
  const [resent, setResent] = React.useState(false);
  
  // Get email from location state or localStorage
  const email = location.state?.email || localStorage.getItem('userEmail') || '';
  
  const handleResendVerification = async () => {
    if (!email) {
      console.error("No email found");
      return;
    }
    
    setIsResending(true);
    try {
      await sendVerificationEmail(email);
      setResent(true);
    } catch (error) {
      console.error("Error resending verification email:", error);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-blue-100">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto bg-blue-100 p-3 rounded-full mb-4">
            <Mail className="h-6 w-6 text-parking-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-parking-accent">
            Verify Your Email
          </CardTitle>
          <CardDescription>
            We've sent a verification link to {email || 'your email address'}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-gray-600">
            Please check your inbox and click on the verification link to complete your registration.
            If you don't see the email in your inbox, please check your spam folder.
          </p>
          
          {resent ? (
            <div className="text-green-600 p-3 bg-green-50 rounded-md mb-4">
              Verification email resent successfully.
            </div>
          ) : null}
          
          <Button 
            onClick={handleResendVerification}
            variant="outline" 
            className="mb-4 w-full"
            disabled={isResending || resent}
          >
            {isResending ? (
              <>
                <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-parking-primary rounded-full"></div>
                Sending...
              </>
            ) : resent ? (
              "Email Sent"
            ) : (
              "Resend Verification Email"
            )}
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            variant="link" 
            onClick={() => navigate('/login')} 
            className="text-parking-primary hover:text-parking-secondary"
          >
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmail;
