import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Building, Shield, ArrowRight, Leaf } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from '../hooks/use-toast';

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
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  // Mock data
  const states = [
    { id: 1, name: 'Punjab' },
    { id: 2, name: 'Haryana' },
    { id: 3, name: 'Uttar Pradesh' },
    { id: 4, name: 'Rajasthan' },
    { id: 5, name: 'Madhya Pradesh' }
  ];

  const districts = [
    { id: 1, name: 'Ludhiana' },
    { id: 2, name: 'Amritsar' },
    { id: 3, name: 'Chandigarh' },
    { id: 4, name: 'Gurgaon' },
    { id: 5, name: 'Faridabad' }
  ];

  const userTypes = [
    {
      type: 'farmer',
      title: 'Farmer',
      description: 'Monitor your crops with satellite analytics and get personalized insights',
      icon: User,
      color: 'bg-emerald-50 border-emerald-200 hover:bg-emerald-100',
      iconColor: 'text-emerald-600'
    },
    {
      type: 'staff',
      title: 'Agricultural Staff',
      description: 'Support farmers with data-driven recommendations and field management',
      icon: Building,
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      type: 'govt_official',
      title: 'Government Official',
      description: 'Access regional agricultural data and policy insights for better governance',
      icon: Shield,
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      iconColor: 'text-purple-600'
    },
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    
    // Mock registration - simulate API call
    setTimeout(() => {
      toast({
        title: 'Registration Successful! 🎉',
        description: 'Welcome to KrishiSat! Please login to continue.',
      });
      
      navigate('/login');
      setLoading(false);
    }, 1500);
  };

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link to="/" className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
              <Leaf className="h-8 w-8" />
              <span className="text-xl font-bold">KrishiSat</span>
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Join the Future of <span className="text-green-600">Smart Agriculture</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose your role and start leveraging satellite technology for data-driven farming decisions
            </p>
          </div>
          
          {/* User Type Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {userTypes.map((type) => (
              <Card 
                key={type.type}
                className={`${type.color} cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-2`}
                onClick={() => setUserType(type.type)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <type.icon className={`h-10 w-10 ${type.iconColor}`} />
                  </div>
                  <CardTitle className="text-2xl text-gray-800">{type.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 text-base mb-6 leading-relaxed">
                    {type.description}
                  </CardDescription>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium">
                    Get Started as {type.title}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Already have an account?</p>
            <Link to="/login">
              <Button variant="outline" className="px-8 py-3 text-lg border-green-600 text-green-600 hover:bg-green-50">
                Sign In Instead
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const selectedUserType = userTypes.find(type => type.type === userType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-green-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors">
            <Leaf className="h-8 w-8" />
            <span className="text-xl font-bold">KrishiSat</span>
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className={`mx-auto w-20 h-20 ${selectedUserType.color} rounded-full flex items-center justify-center mb-6`}>
              <selectedUserType.icon className={`h-10 w-10 ${selectedUserType.iconColor}`} />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-800">
              Register as {selectedUserType.title}
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 mt-2">
              {selectedUserType.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first_name" className="text-gray-700 font-medium">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="Enter your first name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name" className="text-gray-700 font-medium">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="Enter your last name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone_number" className="text-gray-700 font-medium">Phone Number</Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-700 font-medium">State</Label>
                  <Select onValueChange={(value) => setFormData({...formData, state: value})} value={formData.state}>
                    <SelectTrigger className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500">
                      <SelectValue placeholder="Select your state" />
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
                  <Label className="text-gray-700 font-medium">District</Label>
                  <Select 
                    onValueChange={(value) => setFormData({...formData, district: value})}
                    value={formData.district}
                    disabled={!formData.state}
                  >
                    <SelectTrigger className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500">
                      <SelectValue placeholder="Select your district" />
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="organization" className="text-gray-700 font-medium">Organization</Label>
                    <Input
                      id="organization"
                      name="organization"
                      type="text"
                      placeholder="Enter organization name"
                      value={formData.organization}
                      onChange={handleInputChange}
                      className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="designation" className="text-gray-700 font-medium">Designation</Label>
                    <Input
                      id="designation"
                      name="designation"
                      type="text"
                      placeholder="Enter your designation"
                      value={formData.designation}
                      onChange={handleInputChange}
                      className="h-12 border-gray-300 focus:border-green-500 focus:ring-green-500"
                      required
                    />
                  </div>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-green-600 hover:bg-green-700 text-white text-lg font-medium mt-8"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create My Account'
                )}
              </Button>
            </form>
            
            <div className="text-center pt-6 border-t border-gray-200 mt-8">
              <Button
                variant="ghost"
                onClick={() => setUserType('')}
                className="text-gray-600 hover:text-gray-800 mb-4"
              >
                ← Choose Different Role
              </Button>
              
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-green-600 hover:text-green-700 font-medium">
                  Sign in here
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