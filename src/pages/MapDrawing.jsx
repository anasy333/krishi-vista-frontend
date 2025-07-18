import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Save, Download, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { geoAPI } from '../services/api';
import { toast } from '../hooks/use-toast';
import LoadingSpinner from '../components/common/LoadingSpinner';

const MapDrawing = () => {
  const { farmId, farmerId } = useParams();
  const [mapData, setMapData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFarmMap();
  }, [farmId, farmerId]);

  const loadFarmMap = async () => {
    try {
      const response = await geoAPI.getFarmMap(farmId, farmerId);
      setMapData(response.data);
    } catch (error) {
      setMapData({
        farm_name: 'North Field',
        boundaries: {
          type: 'FeatureCollection',
          features: []
        }
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading farm map..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/10">
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to={`/crop-dashboard/${farmerId}/farm/${farmId}`}>
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-2xl font-bold">Farm Boundary Mapping</h1>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline">
                <Save className="h-4 w-4 mr-2" />
                Save Boundaries
              </Button>
              <Button className="btn-primary">
                <Download className="h-4 w-4 mr-2" />
                Export GeoJSON
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Interactive Farm Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg font-medium">Interactive Map Component</p>
                <p className="text-muted-foreground">Integrate with Mapbox or Google Maps for field boundary drawing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapDrawing;