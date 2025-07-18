import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Download, Share, Map, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { analysisAPI } from '../services/api';
import { toast } from '../hooks/use-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AnalysisResults = () => {
  const { farmerId, farmId } = useParams();
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample satellite analysis data
  const soilHealthData = [
    { parameter: 'Moisture', value: 85, max: 100 },
    { parameter: 'Organic Matter', value: 72, max: 100 },
    { parameter: 'pH Level', value: 68, max: 100 },
    { parameter: 'Nitrogen', value: 78, max: 100 },
    { parameter: 'Phosphorus', value: 65, max: 100 },
    { parameter: 'Potassium', value: 80, max: 100 },
  ];

  const vegetationIndex = [
    { x: 10, y: 0.3, health: 'Poor' },
    { x: 25, y: 0.45, health: 'Fair' },
    { x: 40, y: 0.6, health: 'Good' },
    { x: 55, y: 0.75, health: 'Excellent' },
    { x: 70, y: 0.8, health: 'Excellent' },
    { x: 85, y: 0.72, health: 'Good' },
  ];

  const riskAssessment = [
    {
      category: 'Disease Risk',
      current: 25,
      threshold: 50,
      status: 'low',
      description: 'Low probability of disease outbreak based on weather patterns'
    },
    {
      category: 'Pest Risk',
      current: 35,
      threshold: 60,
      status: 'medium',
      description: 'Moderate pest activity detected in nearby areas'
    },
    {
      category: 'Water Stress',
      current: 15,
      threshold: 40,
      status: 'low',
      description: 'Adequate soil moisture levels detected'
    },
    {
      category: 'Nutrient Deficiency',
      current: 45,
      threshold: 70,
      status: 'medium',
      description: 'Slight nitrogen deficiency in some areas'
    },
  ];

  useEffect(() => {
    loadAnalysisResults();
  }, [farmerId, farmId]);

  const loadAnalysisResults = async () => {
    try {
      const response = await analysisAPI.getAnalysisResults(farmerId, farmId);
      setAnalysisData(response.data);
    } catch (error) {
      // Using sample data for demonstration
      setAnalysisData({
        farm_name: 'North Field',
        analysis_date: '2024-03-15',
        satellite_pass: 'Sentinel-2A',
        cloud_coverage: 5,
        overall_health: 82,
        area_analyzed: 8.5,
        recommendations: [
          {
            priority: 'high',
            title: 'Irrigation Adjustment',
            description: 'Reduce irrigation in the eastern section by 15% to prevent waterlogging.',
            action: 'Implement within 3-5 days'
          },
          {
            priority: 'medium',
            title: 'Fertilizer Application',
            description: 'Apply nitrogen-rich fertilizer in the northern quadrant.',
            action: 'Schedule for next week'
          },
          {
            priority: 'low',
            title: 'Monitor Growth',
            description: 'Continue monitoring vegetation indices for optimal growth.',
            action: 'Ongoing monitoring'
          }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (status) => {
    switch (status) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBadge = (status) => {
    const variants = {
      low: 'success',
      medium: 'warning',
      high: 'destructive',
    };
    return <Badge variant={variants[status]}>{status.toUpperCase()}</Badge>;
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'medium': return <TrendingUp className="h-4 w-4 text-warning" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-success" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading analysis results..." />
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
              <Link to={`/crop-dashboard/${farmerId}/farm/${farmId}`}>
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  Satellite Analysis Results
                </h1>
                <p className="text-muted-foreground">
                  {analysisData?.farm_name} • {analysisData?.analysis_date} • {analysisData?.satellite_pass}
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Link to={`/map/${farmId}/farmer/${farmerId}`}>
                <Button variant="outline">
                  <Map className="h-4 w-4 mr-2" />
                  View Map
                </Button>
              </Link>
              <Button variant="outline">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button className="btn-primary">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Analysis Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Overall Health</p>
                  <p className="text-2xl font-bold text-success">{analysisData?.overall_health}%</p>
                  <p className="text-xs text-muted-foreground">Excellent condition</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cloud Coverage</p>
                  <p className="text-2xl font-bold text-foreground">{analysisData?.cloud_coverage}%</p>
                  <p className="text-xs text-success">Excellent visibility</p>
                </div>
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Area Analyzed</p>
                  <p className="text-2xl font-bold text-foreground">{analysisData?.area_analyzed} acres</p>
                  <p className="text-xs text-muted-foreground">Complete coverage</p>
                </div>
                <Map className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Data Quality</p>
                  <p className="text-2xl font-bold text-success">A+</p>
                  <p className="text-xs text-muted-foreground">High resolution</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analysis */}
        <Tabs defaultValue="soil" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="soil">Soil Health</TabsTrigger>
            <TabsTrigger value="vegetation">Vegetation</TabsTrigger>
            <TabsTrigger value="risks">Risk Assessment</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="soil">
            <Card>
              <CardHeader>
                <CardTitle>Soil Health Analysis</CardTitle>
                <CardDescription>
                  Comprehensive soil condition assessment based on satellite data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {soilHealthData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{item.parameter}</span>
                          <span className="text-sm text-muted-foreground">{item.value}%</span>
                        </div>
                        <Progress value={item.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={soilHealthData}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="parameter" />
                        <PolarRadiusAxis 
                          angle={90} 
                          domain={[0, 100]} 
                          tick={{ fontSize: 12 }}
                        />
                        <Radar
                          name="Soil Health"
                          dataKey="value"
                          stroke="#4CAF50"
                          fill="#4CAF50"
                          fillOpacity={0.3}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="vegetation">
            <Card>
              <CardHeader>
                <CardTitle>Vegetation Index Analysis</CardTitle>
                <CardDescription>
                  NDVI patterns and vegetation health distribution across the farm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart data={vegetationIndex}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="x" 
                      name="Time (days)" 
                      unit=" days"
                    />
                    <YAxis 
                      dataKey="y" 
                      name="NDVI" 
                      domain={[0, 1]}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'y' ? value.toFixed(2) : value,
                        name === 'y' ? 'NDVI' : 'Days'
                      ]}
                    />
                    <Scatter 
                      dataKey="y" 
                      fill="#4CAF50"
                      r={8}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="risks">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {riskAssessment.map((risk, index) => (
                <Card key={index}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{risk.category}</CardTitle>
                      {getRiskBadge(risk.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Risk Level</span>
                          <span className={getRiskColor(risk.status)}>
                            {risk.current}%
                          </span>
                        </div>
                        <Progress 
                          value={risk.current} 
                          className="h-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0%</span>
                          <span>Threshold: {risk.threshold}%</span>
                          <span>100%</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {risk.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recommendations">
            <div className="space-y-6">
              {analysisData?.recommendations?.map((rec, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {getPriorityIcon(rec.priority)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{rec.title}</h3>
                          <Badge 
                            variant={
                              rec.priority === 'high' ? 'destructive' :
                              rec.priority === 'medium' ? 'warning' : 'secondary'
                            }
                          >
                            {rec.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">{rec.description}</p>
                        <p className="text-sm font-medium text-primary">{rec.action}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Next Steps */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>Recommended actions based on analysis results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-primary/5 rounded-lg">
                <Map className="h-8 w-8 text-primary mx-auto mb-3" />
                <h3 className="font-medium mb-2">Schedule Field Visit</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Visit the highlighted areas for on-ground verification
                </p>
                <Button variant="outline" size="sm">Schedule Visit</Button>
              </div>
              
              <div className="text-center p-6 bg-success/5 rounded-lg">
                <TrendingUp className="h-8 w-8 text-success mx-auto mb-3" />
                <h3 className="font-medium mb-2">Monitor Progress</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Set up automated monitoring for key indicators
                </p>
                <Button variant="outline" size="sm">Setup Monitoring</Button>
              </div>
              
              <div className="text-center p-6 bg-warning/5 rounded-lg">
                <Share className="h-8 w-8 text-warning mx-auto mb-3" />
                <h3 className="font-medium mb-2">Share with Advisor</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get expert advice on the analysis results
                </p>
                <Button variant="outline" size="sm">Share Report</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalysisResults;