import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, BarChart3, Search, Filter, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { useAuth } from '../contexts/AuthContext';
import { farmAPI, profileAPI } from '../services/api';
import { toast } from '../hooks/use-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const StaffDashboard = () => {
  const [farmers, setFarmers] = useState([]);
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('farmers');
  const { user } = useAuth();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // In a real app, you'd have endpoints to get farmers and their farms
      // For now, we'll simulate this data
      setFarmers([
        {
          id: 1,
          name: 'Raj Kumar',
          phone: '+91 9876543210',
          location: 'Punjab',
          farms_count: 2,
          total_area: 15.5,
          status: 'active'
        },
        {
          id: 2,
          name: 'Sita Devi',
          phone: '+91 9876543211',
          location: 'Haryana',
          farms_count: 1,
          total_area: 8.2,
          status: 'active'
        },
        {
          id: 3,
          name: 'Ram Singh',
          phone: '+91 9876543212',
          location: 'Uttar Pradesh',
          farms_count: 3,
          total_area: 22.3,
          status: 'inactive'
        }
      ]);

      setFarms([
        {
          id: 1,
          name: 'North Field',
          farmer: 'Raj Kumar',
          location: 'Punjab',
          area: 8.5,
          crop: 'Wheat',
          status: 'analyzing',
          last_analysis: '2024-01-15'
        },
        {
          id: 2,
          name: 'South Field',
          farmer: 'Raj Kumar',
          location: 'Punjab',
          area: 7.0,
          crop: 'Rice',
          status: 'completed',
          last_analysis: '2024-01-10'
        },
        {
          id: 3,
          name: 'Main Farm',
          farmer: 'Sita Devi',
          location: 'Haryana',
          area: 8.2,
          crop: 'Sugarcane',
          status: 'active',
          last_analysis: '2024-01-12'
        }
      ]);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { variant: 'default', label: 'Active' },
      analyzing: { variant: 'secondary', label: 'Analyzing' },
      completed: { variant: 'success', label: 'Completed' },
      inactive: { variant: 'outline', label: 'Inactive' },
    };
    
    const config = statusConfig[status] || statusConfig.inactive;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farmer.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFarms = farms.filter(farm =>
    farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farm.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    farm.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Staff Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Manage farmers and monitor agricultural activities
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Farmers</p>
                  <p className="text-2xl font-bold text-foreground">{farmers.length}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Farmers</p>
                  <p className="text-2xl font-bold text-foreground">
                    {farmers.filter(f => f.status === 'active').length}
                  </p>
                </div>
                <Users className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Farms</p>
                  <p className="text-2xl font-bold text-foreground">{farms.length}</p>
                </div>
                <MapPin className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Area</p>
                  <p className="text-2xl font-bold text-foreground">
                    {farms.reduce((sum, farm) => sum + farm.area, 0).toFixed(1)} acres
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs and Search */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              <Button
                variant={activeTab === 'farmers' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('farmers')}
                className="btn-secondary"
              >
                Farmers
              </Button>
              <Button
                variant={activeTab === 'farms' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('farms')}
                className="btn-secondary"
              >
                Farms
              </Button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64 input-field"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'farmers' ? (
          <Card>
            <CardHeader>
              <CardTitle>Farmers Management</CardTitle>
              <CardDescription>
                Monitor and manage farmer accounts and their activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Farms</TableHead>
                    <TableHead>Total Area</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFarmers.map((farmer) => (
                    <TableRow key={farmer.id}>
                      <TableCell className="font-medium">{farmer.name}</TableCell>
                      <TableCell>{farmer.phone}</TableCell>
                      <TableCell>{farmer.location}</TableCell>
                      <TableCell>{farmer.farms_count}</TableCell>
                      <TableCell>{farmer.total_area} acres</TableCell>
                      <TableCell>{getStatusBadge(farmer.status)}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Farms Management</CardTitle>
              <CardDescription>
                Monitor farm activities and analysis results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Farm Name</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead>Crop</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Analysis</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFarms.map((farm) => (
                    <TableRow key={farm.id}>
                      <TableCell className="font-medium">{farm.name}</TableCell>
                      <TableCell>{farm.farmer}</TableCell>
                      <TableCell>{farm.location}</TableCell>
                      <TableCell>{farm.area} acres</TableCell>
                      <TableCell>{farm.crop}</TableCell>
                      <TableCell>{getStatusBadge(farm.status)}</TableCell>
                      <TableCell>{farm.last_analysis}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Link to={`/crop-dashboard/1/farm/${farm.id}`}>
                            <Button variant="outline" size="sm">
                              <BarChart3 className="h-4 w-4 mr-1" />
                              View
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;