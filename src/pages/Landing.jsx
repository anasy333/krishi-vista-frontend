import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Satellite, BarChart3, Users, Shield, Leaf, MapPin } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Landing = () => {
  const features = [
    {
      icon: Satellite,
      title: 'Satellite Analytics',
      description: 'Advanced satellite imagery analysis for crop monitoring and yield prediction.',
    },
    {
      icon: BarChart3,
      title: 'Smart Dashboard',
      description: 'Comprehensive analytics and insights tailored for farmers, staff, and officials.',
    },
    {
      icon: MapPin,
      title: 'Geospatial Mapping',
      description: 'Interactive farm mapping with precise field boundary detection.',
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Role-based access control ensuring data security and privacy.',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Farms Analyzed' },
    { number: '95%', label: 'Accuracy Rate' },
    { number: '500+', label: 'Active Users' },
    { number: '24/7', label: 'Support' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 hero-gradient text-white overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Smart Agriculture with{' '}
                  <span className="text-primary-light">Satellite Intelligence</span>
                </h1>
                <p className="text-xl text-gray-200 max-w-2xl">
                  Empower your farming decisions with cutting-edge satellite analytics, 
                  AI-driven insights, and comprehensive crop monitoring solutions.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/register">
                  <Button size="lg" className="btn-gradient text-lg px-8">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-full h-96 bg-white/10 backdrop-blur rounded-3xl flex items-center justify-center">
                <Leaf className="h-32 w-32 text-primary-light" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose KrishiSat?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform combines advanced technology with agricultural expertise 
              to deliver actionable insights for modern farming.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-elevated text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-gray-200 mb-8">
            Join thousands of farmers already using KrishiSat to make smarter decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100 text-lg px-8">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 text-lg px-8"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">KrishiSat</span>
              </div>
              <p className="text-gray-400 max-w-md">
                Empowering agriculture with satellite intelligence and data-driven insights 
                for sustainable farming practices.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/about" className="hover:text-primary">About</Link></li>
                <li><Link to="/services" className="hover:text-primary">Services</Link></li>
                <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Documentation</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 KrishiSat. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;