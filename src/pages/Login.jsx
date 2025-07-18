import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Leaf, Phone, Key, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';
import { toast } from '../hooks/use-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Login = () => {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [formData, setFormData] = useState({
    phone_number: '',
    otp: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!formData.phone_number) {
      toast({
        title: 'Error',
        description: 'Please enter your phone number',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      await authAPI.sendOTP({ phone_number: formData.phone_number });
      setOtpSent(true);
      setStep('otp');
      toast({
        title: 'OTP Sent',
        description: 'Please check your phone for the verification code',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to send OTP',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!formData.otp) {
      toast({
        title: 'Error',
        description: 'Please enter the OTP',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await authAPI.verifyOTP({
        phone_number: formData.phone_number,
        otp: formData.otp,
      });
      
      if (response.data.token) {
        login(response.data.token, response.data.user);
        
        // Redirect based on user type
        const userType = response.data.user?.user_type;
        switch (userType) {
          case 'farmer':
            navigate('/farmer-dashboard');
            break;
          case 'staff':
            navigate('/staff-dashboard');
            break;
          case 'govt_official':
            navigate('/govt-dashboard');
            break;
          default:
            navigate('/');
        }
        
        toast({
          title: 'Welcome back!',
          description: 'You have been successfully logged in',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Invalid OTP',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      await authAPI.sendOTP({ phone_number: formData.phone_number });
      toast({
        title: 'OTP Resent',
        description: 'A new verification code has been sent to your phone',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to resend OTP',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/20 leaf-pattern px-4">
      <div className="w-full max-w-md">
        <Card className="card-elevated">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome to KrishiSat</CardTitle>
            <CardDescription>
              {step === 'phone' 
                ? 'Enter your phone number to get started'
                : 'Enter the verification code sent to your phone'
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {step === 'phone' ? (
              <form onSubmit={handleSendOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone_number"
                      name="phone_number"
                      type="tel"
                      placeholder="+91 9876543210"
                      value={formData.phone_number}
                      onChange={handleInputChange}
                      className="pl-10 input-field"
                      required
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <LoadingSpinner size="sm" text="" />
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="otp"
                      name="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={formData.otp}
                      onChange={handleInputChange}
                      className="pl-10 input-field text-center text-lg tracking-widest"
                      maxLength={6}
                      required
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    OTP sent to {formData.phone_number}
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <LoadingSpinner size="sm" text="" />
                  ) : (
                    'Verify & Login'
                  )}
                </Button>
                
                <div className="text-center">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-sm"
                  >
                    Resend OTP
                  </Button>
                </div>
              </form>
            )}
            
            <div className="text-center pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary hover:underline font-medium">
                  Register here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;