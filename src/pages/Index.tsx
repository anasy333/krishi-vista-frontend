import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Award, Users, Globe, Factory, Phone, Truck, Star, ArrowRight } from "lucide-react";
import heroWarehouse from "@/assets/hero-warehouse.svg";
import manufacturingImage from "@/assets/manufacturing.jpg";
import laboratoryImage from "@/assets/laboratory.jpg";

const Index = () => {
  const services = [
    {
      icon: Phone,
      title: "24/7 Tech Support",
      description: "Round-the-clock technical assistance for all your chemical solution needs."
    },
    {
      icon: Truck,
      title: "Global Delivery",
      description: "Worldwide shipping and distribution network ensuring timely deliveries."
    },
    {
      icon: Star,
      title: "High-Quality Standards",
      description: "ISO certified manufacturing processes with stringent quality control measures."
    }
  ];

  const statistics = [
    { number: "500+", label: "Production Capacity (MT)" },
    { number: "15+", label: "Countries Served" },
    { number: "37+", label: "Years Experience" },
    { number: "2.5k+", label: "Satisfied Clients" }
  ];

  const businessDivisions = [
    {
      title: "Leather Chemicals",
      description: "Premium leather processing solutions",
      image: laboratoryImage,
      badge: "Premium Quality"
    },
    {
      title: "Herbal Solutions",
      description: "Natural and sustainable products",
      image: manufacturingImage,
      badge: "Eco-Friendly"
    },
    {
      title: "Shoe Division",
      description: "Specialized footwear chemicals",
      image: heroWarehouse,
      badge: "Specialized"
    },
    {
      title: "Infrastructure",
      description: "Industrial construction solutions",
      image: laboratoryImage,
      badge: "Industrial Grade"
    }
  ];

  const globalPartners = [
    "ChemCorp International", "Industrial Solutions Ltd", "Global Chemical Partners",
    "Asian Chemical Alliance", "European Chemical Group", "Americas Chemical Co."
  ];

  const directors = [
    {
      name: "Mr. Rajesh Saba",
      title: "Chairman & Managing Director",
      image: "/api/placeholder/300/300"
    },
    {
      name: "Mrs. Priya Saba",
      title: "Executive Director",
      image: "/api/placeholder/300/300"
    }
  ];

  const testimonials = [
    {
      name: "John Anderson",
      company: "Global Leather Inc.",
      rating: 5,
      text: "Saba Group has been our trusted partner for chemical solutions. Their quality and service are unmatched.",
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "Maria Rodriguez",
      company: "EcoTech Industries",
      rating: 5,
      text: "Outstanding product quality and exceptional customer support. Highly recommend their services.",
      avatar: "/api/placeholder/60/60"
    },
    {
      name: "David Chen",
      company: "Asian Manufacturing Co.",
      rating: 5,
      text: "Reliable delivery and consistent quality have made them our preferred chemical solutions provider.",
      avatar: "/api/placeholder/60/60"
    }
  ];

  const faqs = [
    {
      question: "What types of chemical solutions does Saba Group provide?",
      answer: "We specialize in leather chemicals, herbal solutions, industrial chemicals, and infrastructure-related chemical products with over 37 years of expertise."
    },
    {
      question: "Do you offer international shipping and support?",
      answer: "Yes, we serve clients in 15+ countries worldwide with comprehensive shipping solutions and 24/7 technical support."
    },
    {
      question: "What quality certifications do you maintain?",
      answer: "We maintain ISO certifications and follow stringent quality control measures in all our manufacturing processes."
    },
    {
      question: "How can I get technical support for your products?",
      answer: "We provide 24/7 technical support through multiple channels including phone, email, and on-site consultation services."
    }
  ];

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroWarehouse})` }}
      >
        <div className="absolute inset-0 bg-gradient-overlay"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="hero-text text-primary-foreground mb-6">
            Pioneering Excellence in
            <span className="block gradient-text">Specialty Chemicals & Industrial Solutions</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Trusted by industries worldwide for over 37 years, delivering innovation and quality in every solution.
          </p>
          <Button variant="hero" size="lg">
            Know More
          </Button>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <Badge variant="outline" className="mb-4 border-primary text-primary">Since 1988</Badge>
              <h2 className="section-title mb-8 text-foreground">
                Pioneers in the Chemical
                <span className="gradient-text block">Industry Since 1988</span>
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Saba Group has been at the forefront of chemical innovation for over three decades, 
                  providing cutting-edge solutions that drive industrial progress across the globe.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  From our humble beginnings to becoming a trusted name in specialty chemicals, 
                  we've consistently delivered excellence through innovation, quality, and 
                  unwavering commitment to our clients' success.
                </p>
                <Button variant="corporate" className="mt-6">
                  Learn Our Story
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={manufacturingImage}
                alt="Saba Group Manufacturing Facility"
                className="rounded-2xl shadow-corporate w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-secondary text-secondary-foreground p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold">37+</div>
                  <div className="text-sm">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-6">
              Our Network & <span className="gradient-text">Infrastructure</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support and infrastructure that ensures excellence in every aspect of our service delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow group">
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-6 text-primary-foreground">
              Our <span className="text-secondary">Impact</span> in Numbers
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-6xl font-bold text-secondary mb-2">{stat.number}</div>
                <div className="text-primary-foreground/90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Divisions */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-6">
              Business <span className="gradient-text">Divisions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Diverse portfolio of specialized chemical solutions across multiple industry sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessDivisions.map((division, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={division.image}
                    alt={division.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-secondary/90 text-secondary-foreground">
                      {division.badge}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-foreground">{division.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{division.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Global Partnerships */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-6">
              Global <span className="gradient-text">Partnerships</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by leading companies worldwide for our chemical expertise and reliable solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {globalPartners.map((partner, index) => (
              <div key={index} className="text-center p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-2"></div>
                <p className="text-xs text-muted-foreground font-medium">{partner}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* International Operations */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-title mb-8 text-foreground">
                International
                <span className="gradient-text block">Operations</span>
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our global presence spans across 15+ countries, delivering chemical solutions 
                  that meet international standards and local market requirements.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="font-bold text-foreground">Global Reach</div>
                    <div className="text-sm text-muted-foreground">15+ Countries</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <Factory className="w-8 h-8 text-primary mx-auto mb-2" />
                    <div className="font-bold text-foreground">Production</div>
                    <div className="text-sm text-muted-foreground">500+ MT Capacity</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-primary-light to-secondary-light rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-24 h-24 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Global Presence Map</h3>
                  <p className="text-muted-foreground">Serving clients across continents</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-6">
              Board of <span className="gradient-text">Directors</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Visionary leadership driving innovation and excellence in chemical solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {directors.map((director, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-gray-200">
                    <img
                      src={director.image}
                      alt={director.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{director.name}</h3>
                  <p className="text-muted-foreground">{director.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-6">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by industry leaders worldwide for our commitment to quality and service excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="section-title mb-6">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Get answers to common questions about our services and expertise.
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-lg px-6">
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
