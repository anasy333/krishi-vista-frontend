import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { ArrowLeft, Download, Satellite, TrendingUp, Droplets, Thermometer, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { analysisAPI } from '../services/api';
import { toast } from '../hooks/use-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const CropDashboard = () => {
  const { farmerId, farmId } = useParams();
  const [cropData, setCropData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample data for the charts
  const ndviData = [
    { date: '2024-01-01', ndvi: 0.3, health: 'Poor' },
    { date: '2024-01-15', ndvi: 0.45, health: 'Fair' },
    { date: '2024-02-01', ndvi: 0.6, health: 'Good' },
    { date: '2024-02-15', ndvi: 0.75, health: 'Excellent' },
    { date: '2024-03-01', ndvi: 0.8, health: 'Excellent' },
    { date: '2024-03-15', ndvi: 0.72, health: 'Good' },
  ];

  const weatherData = [
    { date: '2024-03-10', temperature: 25, humidity: 65, rainfall: 0 },
    { date: '2024-03-11', temperature: 27, humidity: 58, rainfall: 2 },
    { date: '2024-03-12', temperature: 24, humidity: 72, rainfall: 8 },
    { date: '2024-03-13', temperature: 26, humidity: 60, rainfall: 0 },
    { date: '2024-03-14', temperature: 28, humidity: 55, rainfall: 0 },
    { date: '2024-03-15', temperature: 25, humidity: 68, rainfall: 5 },
  ];

  const yieldPrediction = [
    { month: 'Jan', predicted: 2.1, actual: 2.0 },
    { month: 'Feb', predicted: 2.3, actual: 2.2 },
    { month: 'Mar', predicted: 2.5, actual: null },
    { month: 'Apr', predicted: 2.8, actual: null },
    { month: 'May', predicted: 3.0, actual: null },
    { month: 'Jun', predicted: 3.2, actual: null },
  ];

  useEffect(() => {
    loadCropDashboard();
  }, [farmerId, farmId]);

  const loadCropDashboard = async () => {
    try {
      const response = await analysisAPI.getCropDashboard(farmerId, farmId);
      setCropData(response.data);
    } catch (error) {
      // Using sample data for demonstration
      setCropData({
        farm_name: 'North Field',
        crop_type: 'Wheat',
        area: 8.5,
        planting_date: '2024-01-01',
        status: 'growing',
        current_ndvi: 0.72,
        health_score: 85,
        growth_stage: 'Flowering',
        estimated_yield: 3.2,
        water_stress: 'Low',
        disease_risk: 'Medium',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    try {
      const response = await analysisAPI.downloadPDF(farmerId, farmId);
      
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `crop-dashboard-${farmId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast({
        title: 'Download Complete',
        description: 'Crop dashboard report has been downloaded.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to download report',
        variant: 'destructive',
      });
    }
  };

  const getHealthColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      growing: { variant: 'default', label: 'Growing' },
      flowering: { variant: 'secondary', label: 'Flowering' },
      harvesting: { variant: 'success', label: 'Ready for Harvest' },
      harvested: { variant: 'outline', label: 'Harvested' },
    };
    
    const config = statusConfig[status] || statusConfig.growing;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading crop dashboard..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/farmer-dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {cropData?.farm_name} - Crop Analytics
                </h1>
                <p className="text-muted-foreground">
                  {cropData?.crop_type} • {cropData?.area} acres • {getStatusBadge(cropData?.status)}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Link to={`/analysis-results/${farmerId}/farm/${farmId}`}>
                <Button variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  View Analysis
                </Button>
              </Link>
              <Button onClick={handleDownloadReport} className="btn-primary">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Health Score</p>
                  <p className={`text-2xl font-bold ${getHealthColor(cropData?.health_score)}`}>
                    {cropData?.health_score}%
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {cropData?.growth_stage}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Current NDVI</p>
                  <p className="text-2xl font-bold text-foreground">{cropData?.current_ndvi}</p>
                  <p className="text-xs text-success">+0.05 from last week</p>
                </div>
                <Satellite className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Water Stress</p>
                  <p className="text-2xl font-bold text-foreground">{cropData?.water_stress}</p>
                  <p className="text-xs text-muted-foreground">Optimal range</p>
                </div>
                <Droplets className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Est. Yield</p>
                  <p className="text-2xl font-bold text-foreground">{cropData?.estimated_yield} t/ha</p>
                  <p className="text-xs text-success">Above average</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="ndvi" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ndvi">NDVI Trends</TabsTrigger>
            <TabsTrigger value="weather">Weather Data</TabsTrigger>
            <TabsTrigger value="yield">Yield Prediction</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ndvi">
            <Card>
              <CardHeader>
                <CardTitle>NDVI (Vegetation Health) Trends</CardTitle>
                <CardDescription>
                  Normalized Difference Vegetation Index over time showing crop health progression
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={ndviData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 1]} />
                    <Tooltip 
                      formatter={(value, name) => [value.toFixed(2), 'NDVI']}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="ndvi" 
                      stroke="#4CAF50" 
                      fill="#4CAF50" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="weather">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Temperature & Humidity</CardTitle>
                  <CardDescription>Daily weather conditions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weatherData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="temperature" stroke="#4CAF50" name="Temperature (°C)" />
                      <Line type="monotone" dataKey="humidity" stroke="#A5D6A7" name="Humidity (%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Rainfall</CardTitle>
                  <CardDescription>Daily precipitation levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weatherData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="rainfall" fill="#4CAF50" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="yield">
            <Card>
              <CardHeader>
                <CardTitle>Yield Prediction vs Actual</CardTitle>
                <CardDescription>
                  Predicted yield compared to actual harvest data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={yieldPrediction}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="predicted" 
                      stroke="#4CAF50" 
                      strokeDasharray="5 5"
                      name="Predicted Yield (t/ha)" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#A5D6A7" 
                      strokeWidth={2}
                      name="Actual Yield (t/ha)" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Recommendations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>AI Recommendations</CardTitle>
            <CardDescription>Personalized insights based on your crop data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-success">Optimal Growth Detected</h4>
                  <p className="text-sm text-muted-foreground">
                    Your crop is showing excellent health indicators. Continue current irrigation schedule.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-warning">Monitor Disease Risk</h4>
                  <p className="text-sm text-muted-foreground">
                    Weather conditions suggest moderate disease risk. Consider preventive measures.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <h4 className="font-medium text-primary">Fertilizer Recommendation</h4>
                  <p className="text-sm text-muted-foreground">
                    Based on soil analysis, consider nitrogen application in the next 7-10 days.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CropDashboard;