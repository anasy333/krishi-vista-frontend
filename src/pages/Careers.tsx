import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, TrendingUp, Award, Globe, Heart, Lightbulb } from "lucide-react";
import careersHero from "@/assets/careers-hero.jpg";
import manufacturingImage from "@/assets/manufacturing.jpg";
import laboratoryImage from "@/assets/laboratory.jpg";

const Careers = () => {
  const benefits = [
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Structured career progression with opportunities for skill development and leadership roles."
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible work arrangements and comprehensive wellness programs for our team members."
    },
    {
      icon: Award,
      title: "Recognition",
      description: "Performance-based rewards and recognition programs that celebrate excellence."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "Environment that encourages creativity, innovation, and breakthrough thinking."
    }
  ];

  const careerOpportunities = [
    {
      category: "Sales & Marketing",
      positions: [
        "Sales Executive",
        "Marketing Manager",
        "Business Development"
      ],
      description: "Drive business growth and build lasting client relationships in the chemical industry."
    },
    {
      category: "Production & Quality Control",
      positions: [
        "Production Engineer",
        "Quality Analyst",
        "Process Engineer"
      ],
      description: "Ensure excellence in manufacturing processes and product quality standards."
    },
    {
      category: "Human Resources",
      positions: [
        "HR Generalist",
        "Talent Acquisition",
        "Employee Relations"
      ],
      description: "Shape our company culture and support our team's professional development."
    },
    {
      category: "Finance & Administration",
      positions: [
        "Financial Analyst",
        "Accounts Manager",
        "Administrative Executive"
      ],
      description: "Support business operations through strategic financial management and administration."
    },
    {
      category: "Supply Chain & Logistics",
      positions: [
        "Supply Chain Manager",
        "Logistics Coordinator",
        "Procurement Specialist"
      ],
      description: "Optimize supply chain operations and ensure efficient product delivery worldwide."
    },
    {
      category: "Warehouse & Distribution",
      positions: [
        "Warehouse Manager",
        "Distribution Executive",
        "Inventory Controller"
      ],
      description: "Manage inventory and distribution operations with precision and efficiency."
    }
  ];

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${careersHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-overlay"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="hero-text text-primary-foreground mb-6">
            Grow With A Legacy Of
            <span className="block gradient-text">Innovation And Excellence</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Join our dynamic team and build a rewarding career in the chemical industry with endless opportunities for growth.
          </p>
          <Button variant="hero" size="lg">
            Explore Opportunities
          </Button>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-title mb-8 text-foreground">
                Building Careers,
                <span className="gradient-text block">Shaping Futures</span>
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Saba Group, we believe that our people are our greatest asset. With over 37 years 
                  of industry leadership, we offer a dynamic work environment where innovation thrives 
                  and career growth is not just encouraged but actively supported.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Whether you're a recent graduate or an experienced professional, we provide 
                  opportunities to work with cutting-edge technology, collaborate with industry experts, 
                  and make a meaningful impact in the chemical solutions sector.
                </p>
                <Button variant="corporate" className="mt-6">
                  Learn About Our Culture
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={laboratoryImage}
                alt="Team Working Together"
                className="rounded-2xl shadow-corporate w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Us Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-6">
              Why <span className="gradient-text">Join Us?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the benefits and opportunities that make Saba Group an exceptional place to build your career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow group">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <benefit.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-6">
              Start Your Career <span className="gradient-text">Journey Here</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore diverse career opportunities across various departments and find your perfect fit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {careerOpportunities.map((opportunity, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-foreground mb-2">
                    {opportunity.category}
                  </CardTitle>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {opportunity.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {opportunity.positions.map((position, posIndex) => (
                      <div key={posIndex} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                        <span className="text-foreground font-medium">{position}</span>
                        <span className="text-xs text-muted-foreground">Open</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="corporate" className="w-full">
                    Apply Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Internship Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src={manufacturingImage}
                alt="Internship Program"
                className="rounded-2xl shadow-corporate w-full h-96 object-cover"
              />
            </div>
            <div>
              <h2 className="section-title mb-8 text-foreground">
                Internships &
                <span className="gradient-text block">Campus Hiring</span>
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Launch your career with our comprehensive internship program designed for fresh graduates 
                  and final-year students. Get hands-on experience with industry-leading projects and 
                  mentorship from experienced professionals.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Structured Learning Path</h4>
                      <p className="text-muted-foreground text-sm">Comprehensive training programs with real project experience</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Globe className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground">Global Exposure</h4>
                      <p className="text-muted-foreground text-sm">Opportunity to work on international projects and clients</p>
                    </div>
                  </div>
                </div>
                <Button variant="corporate" className="mt-6">
                  Apply for Internship
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Join Our Team?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Take the next step in your career journey with Saba Group. We're looking for passionate 
              individuals who want to make a difference in the chemical industry.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                View All Positions
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Submit Your Resume
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;