import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, MapPin, BarChart3, Download, Satellite, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { farmAPI, analysisAPI } from '../services/api';
import { toast } from '../hooks/use-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const FarmerDashboard = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    loadFarms();
  }, []);

  const loadFarms = async () => {
    try {
      const response = await farmAPI.getFarms(user.id);
      setFarms(response.data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load farms',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyzeFarm = async (farmId) => {
    setActionLoading(prev => ({ ...prev, [`analyze_${farmId}`]: true }));
    try {
      await analysisAPI.analyzeField(user.id, farmId, {});
      toast({
        title: 'Analysis Started',
        description: 'Your farm analysis has been initiated. Results will be available shortly.',
      });
      loadFarms(); // Refresh farms data
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to start analysis',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(prev => ({ ...prev, [`analyze_${farmId}`]: false }));
    }
  };

  const handleDownloadPDF = async (farmId) => {
    setActionLoading(prev => ({ ...prev, [`pdf_${farmId}`]: true }));
    try {
      const response = await analysisAPI.downloadPDF(user.id, farmId);
      
      // Create blob and download
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `farm-analysis-${farmId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: 'Download Complete',
        description: 'Your farm analysis report has been downloaded.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to download report',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(prev => ({ ...prev, [`pdf_${farmId}`]: false }));
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading your dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {user?.first_name}!
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your farms and access satellite analytics
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/add-farm">
                <Button className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Farm
                </Button>
              </Link>
            </div>
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
                  <p className="text-sm font-medium text-muted-foreground">Active Farms</p>
                  <p className="text-2xl font-bold text-foreground">
                    {farms.filter(farm => farm.status === 'active').length}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Analysis Complete</p>
                  <p className="text-2xl font-bold text-foreground">
                    {farms.filter(farm => farm.status === 'completed').length}
                  </p>
                </div>
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-foreground">
                    {farms.filter(farm => {
                      const farmDate = new Date(farm.created_at);
                      const now = new Date();
                      return farmDate.getMonth() === now.getMonth() && 
                             farmDate.getFullYear() === now.getFullYear();
                    }).length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Farms Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Your Farms</h2>
          </div>
          
          {farms.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No farms yet</h3>
                <p className="text-muted-foreground mb-6">
                  Add your first farm to start monitoring with satellite analytics
                </p>
                <Link to="/add-farm">
                  <Button className="btn-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Farm
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {farms.map((farm) => (
                <Card key={farm.id} className="card-elevated">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{farm.name}</CardTitle>
                      {getStatusBadge(farm.status)}
                    </div>
                    <CardDescription>{farm.location}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Area</p>
                        <p className="font-medium">{farm.area} acres</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Crop</p>
                        <p className="font-medium">{farm.crop_type || 'Not specified'}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col space-y-2">
                      <Link to={`/crop-dashboard/${user.id}/farm/${farm.id}`}>
                        <Button variant="outline" className="w-full">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Analytics
                        </Button>
                      </Link>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAnalyzeFarm(farm.id)}
                          disabled={actionLoading[`analyze_${farm.id}`]}
                          className="btn-secondary"
                        >
                          {actionLoading[`analyze_${farm.id}`] ? (
                            <LoadingSpinner size="sm" text="" />
                          ) : (
                            <>
                              <Satellite className="h-4 w-4 mr-1" />
                              Analyze
                            </>
                          )}
                        </Button>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadPDF(farm.id)}
                          disabled={actionLoading[`pdf_${farm.id}`]}
                        >
                          {actionLoading[`pdf_${farm.id}`] ? (
                            <LoadingSpinner size="sm" text="" />
                          ) : (
                            <>
                              <Download className="h-4 w-4 mr-1" />
                              PDF
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;