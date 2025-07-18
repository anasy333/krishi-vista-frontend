import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Building, Shield, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { authAPI, dataAPI } from '../services/api';
import { toast } from '../hooks/use-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Register = () => {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    phone_number: '',
    first_name: '',
    last_name: '',
    email: '',
    state: '',
    district: '',
    organization: '',
    designation: '',
  });
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  
  const navigate = useNavigate();

  const userTypes = [
    {
      type: 'farmer',
      title: 'Farmer',
      description: 'Access farm analytics, crop monitoring, and yield predictions',
      icon: User,
    },
    {
      type: 'staff',
      title: 'Staff',
      description: 'Manage farmer accounts and provide agricultural support',
      icon: Building,
    },
    {
      type: 'govt_official',
      title: 'Government Official',
      description: 'Access regional analytics and policy insights',
      icon: Shield,
    },
  ];

  useEffect(() => {
    loadStates();
  }, []);

  const loadStates = async () => {
    setLoadingData(true);
    try {
      const response = await dataAPI.getStates();
      setStates(response.data);
    } catch (error) {
      console.error('Failed to load states:', error);
    } finally {
      setLoadingData(false);
    }
  };

  const loadDistricts = async (stateId) => {
    try {
      const response = await dataAPI.getDistricts();
      // Filter districts by state (assuming API returns filtered data)
      setDistricts(response.data);
    } catch (error) {
      console.error('Failed to load districts:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStateChange = (value) => {
    setFormData({
      ...formData,
      state: value,
      district: '', // Reset district when state changes
    });
    loadDistricts(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!userType) {
      toast({
        title: 'Error',
        description: 'Please select a user type',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      let response;
      
      switch (userType) {
        case 'farmer':
          response = await authAPI.registerFarmer(formData);
          break;
        case 'staff':
          response = await authAPI.registerStaff(formData);
          break;
        case 'govt_official':
          response = await authAPI.registerGovtOfficial(formData);
          break;
        default:
          throw new Error('Invalid user type');
      }

      toast({
        title: 'Registration Successful!',
        description: 'Please login with your phone number to continue',
      });
      
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Registration Failed',
        description: error.response?.data?.message || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!userType) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/20 leaf-pattern px-4">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Join KrishiSat</h1>
            <p className="text-xl text-muted-foreground">Choose your role to get started</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {userTypes.map((type) => (
              <Card 
                key={type.type}
                className="card-elevated cursor-pointer transition-all hover:scale-105"
                onClick={() => setUserType(type.type)}
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <type.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{type.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center mb-4">
                    {type.description}
                  </CardDescription>
                  <Button className="w-full btn-primary">
                    Register as {type.title}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const selectedUserType = userTypes.find(type => type.type === userType);

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/20 leaf-pattern px-4 py-8">
      <div className="w-full max-w-md">
        <Card className="card-elevated">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <selectedUserType.icon className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Register as {selectedUserType.title}</CardTitle>
            <CardDescription>
              {selectedUserType.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>State</Label>
                  <Select onValueChange={handleStateChange} value={formData.state}>
                    <SelectTrigger className="input-field">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state.id} value={state.id.toString()}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>District</Label>
                  <Select 
                    onValueChange={(value) => setFormData({...formData, district: value})}
                    value={formData.district}
                    disabled={!formData.state}
                  >
                    <SelectTrigger className="input-field">
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((district) => (
                        <SelectItem key={district.id} value={district.id.toString()}>
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {(userType === 'staff' || userType === 'govt_official') && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <Input
                      id="organization"
                      name="organization"
                      type="text"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation</Label>
                    <Input
                      id="designation"
                      name="designation"
                      type="text"
                      value={formData.designation}
                      onChange={handleInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                </>
              )}
              
              <Button 
                type="submit" 
                className="w-full btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <LoadingSpinner size="sm" text="" />
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>
            
            <div className="text-center pt-4 border-t border-border mt-6">
              <Button
                variant="ghost"
                onClick={() => setUserType('')}
                className="text-sm"
              >
                ← Choose different role
              </Button>
            </div>
            
            <div className="text-center pt-2">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Login here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;