import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Satellite, 
  BarChart3, 
  MapPin, 
  Users, 
  TrendingUp, 
  Leaf, 
  Cloud, 
  ArrowRight,
  CheckCircle,
  Star,
  Activity,
  Shield,
  Zap
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Satellite,
      title: "Satellite Analytics",
      description: "Real-time crop monitoring using advanced satellite imagery and AI-powered analysis."
    },
    {
      icon: BarChart3,
      title: "Yield Prediction",
      description: "Accurate yield forecasting based on historical data and current field conditions."
    },
    {
      icon: MapPin,
      title: "Precision Mapping",
      description: "Detailed field mapping with soil analysis and crop health visualization."
    },
    {
      icon: Cloud,
      title: "Weather Intelligence",
      description: "Advanced weather forecasting and climate impact assessment for better planning."
    }
  ];

  const stats = [
    { number: "50,000+", label: "Farmers Connected", icon: Users },
    { number: "2M+", label: "Acres Monitored", icon: MapPin },
    { number: "95%", label: "Accuracy Rate", icon: TrendingUp },
    { number: "24/7", label: "Real-time Monitoring", icon: Activity }
  ];

  const benefits = [
    "Increase crop yield by up to 30%",
    "Reduce water consumption by 25%",
    "Early pest & disease detection",
    "Optimize fertilizer usage",
    "Weather-based recommendations",
    "Real-time field monitoring"
  ];

  const testimonials = [
    {
      name: "Ravi Kumar",
      location: "Punjab, India",
      rating: 5,
      text: "KrishiSat helped me increase my wheat yield by 35% this season. The satellite monitoring is incredible!",
      avatar: "/api/placeholder/60/60",
      crop: "Wheat Farmer"
    },
    {
      name: "Priya Sharma",
      location: "Maharashtra, India", 
      rating: 5,
      text: "The weather predictions are so accurate. I saved my cotton crop from unexpected rainfall.",
      avatar: "/api/placeholder/60/60",
      crop: "Cotton Farmer"
    },
    {
      name: "Suresh Patel",
      location: "Gujarat, India",
      rating: 5,
      text: "Amazing analytics dashboard. I can monitor all my fields from my mobile phone.",
      avatar: "/api/placeholder/60/60",
      crop: "Multi-crop Farmer"
    }
  ];

  return (
    <div className="min-h-screen bg-transparent overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary/20 via-background to-primary/10">
        <div className="absolute inset-0 opacity-30"></div>
        
        <div className="container mx-auto px-4 lg:px-8 pt-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content - Not Centered */}
            <div className="text-left space-y-8">
              <Badge variant="outline" className="border-primary text-primary text-lg px-4 py-2">
                🌾 AI-Powered Agriculture
              </Badge>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
                <span className="text-foreground">Smart</span>
                <br />
                <span className="gradient-text">Farming</span>
                <br />
                <span className="text-foreground">Starts</span>
                <br />
                <span className="text-primary">Here</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
                Revolutionize your agriculture with satellite-powered crop monitoring, 
                AI-driven insights, and precision farming solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button size="lg" className="text-lg px-8 py-4 hover:scale-105 transition-all duration-300">
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 hover:scale-105 transition-all duration-300">
                  Watch Demo
                </Button>
              </div>
              
              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">4.9★</div>
                  <div className="text-sm text-muted-foreground">User Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-sm text-muted-foreground">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Monitoring</div>
                </div>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="relative">
              <div className="w-full h-96 lg:h-[600px] bg-gradient-to-br from-primary/20 to-primary/40 rounded-3xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent"></div>
                <div className="relative z-10 text-center">
                  <Satellite className="w-32 h-32 text-primary mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Live Satellite Feed</h3>
                  <p className="text-muted-foreground">Real-time crop monitoring</p>
                </div>
                
                {/* Floating Cards */}
                <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Field Status: Healthy</span>
                  </div>
                </div>
                
                <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Yield +25%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Asymmetric Layout */}
      <section className="py-32 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mb-20">
            <Badge variant="secondary" className="mb-6 text-lg px-4 py-2">
              🚀 Advanced Technology
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Precision Agriculture
              <span className="gradient-text block">Powered by AI</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Harness the power of satellite imagery, machine learning, and IoT sensors 
              to make data-driven farming decisions that increase yield and reduce costs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 hover:shadow-xl transition-all duration-500 hover:scale-105 group">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <feature.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Off-center */}
      <section className="py-32 bg-primary relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-center">
            <div className="lg:col-span-1">
              <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
                Transforming
                <span className="text-secondary block">Agriculture</span>
                Nationwide
              </h2>
              <p className="text-xl text-primary-foreground/80 leading-relaxed">
                Join thousands of farmers who are already using KrishiSat to optimize their farming operations.
              </p>
            </div>
            
            <div className="lg:col-span-2">
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-20 h-20 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/30 transition-all duration-300">
                      <stat.icon className="w-10 h-10 text-secondary" />
                    </div>
                    <div className="text-4xl md:text-6xl font-bold text-secondary mb-2">{stat.number}</div>
                    <div className="text-primary-foreground/80 font-medium text-lg">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Left Aligned */}
      <section className="py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="w-full h-96 bg-gradient-to-br from-primary/10 to-primary/30 rounded-3xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                <div className="relative z-10 text-center">
                  <Leaf className="w-24 h-24 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground">Smart Insights</h3>
                </div>
                
                {/* Animated Elements */}
                <div className="absolute top-8 left-8 w-4 h-4 bg-primary rounded-full"></div>
                <div className="absolute bottom-8 right-8 w-6 h-6 bg-secondary rounded-full"></div>
                <div className="absolute top-1/2 right-8 w-3 h-3 bg-primary/60 rounded-full"></div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <Badge variant="outline" className="border-primary text-primary text-lg px-4 py-2">
                ✨ Smart Benefits
              </Badge>
              
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Why Choose
                <span className="gradient-text block">KrishiSat?</span>
              </h2>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 rounded-xl hover:bg-muted/50 transition-all duration-300">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <span className="text-lg font-medium text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Button size="lg" className="text-lg px-8 py-4 hover:scale-105 transition-all duration-300">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Staggered Layout */}
      <section className="py-32 bg-muted/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-20">
            <Badge variant="secondary" className="mb-6 text-lg px-4 py-2">
              🌟 Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Farmers Love <span className="gradient-text">KrishiSat</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real stories from farmers who transformed their agricultural practices with our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className={`p-8 hover:shadow-xl transition-all duration-500 hover:scale-105 ${index === 1 ? 'md:mt-8' : ''}`}>
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 text-lg italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center space-x-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-bold text-foreground text-lg">{testimonial.name}</div>
                      <div className="text-sm text-primary font-medium">{testimonial.crop}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Full Width */}
      <section className="py-32 bg-gradient-to-r from-primary to-primary-hover relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-7xl font-bold text-primary-foreground leading-tight">
              Ready to Transform
              <span className="text-secondary block">Your Farm?</span>
            </h2>
            
            <p className="text-2xl text-primary-foreground/90 leading-relaxed">
              Join thousands of farmers who are already using KrishiSat to increase their yield, 
              reduce costs, and make smarter farming decisions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Button size="lg" variant="secondary" className="text-xl px-12 py-6 hover:scale-105 transition-all duration-300">
                Start Free Trial
                <Zap className="w-6 h-6 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="text-xl px-12 py-6 border-white text-white hover:bg-white hover:text-primary hover:scale-105 transition-all duration-300">
                Schedule Demo
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-8 pt-12 text-primary-foreground/80">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>30-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;