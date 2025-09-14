import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Award, Users, Globe, Factory, Shield } from "lucide-react";
import aboutBuilding from "@/assets/about-building.svg";
import manufacturingImage from "@/assets/manufacturing.jpg";
import laboratoryImage from "@/assets/laboratory.jpg";

const About = () => {
  const stats = [
    { number: "500+", label: "Production Capacity (MT)", icon: Factory },
    { number: "35+", label: "Years of Experience", icon: Award },
    { number: "15+", label: "Countries Served", icon: Globe },
    { number: "2.5k+", label: "Satisfied Clients", icon: Users },
  ];

  const products = [
    {
      title: "Leather Chemicals",
      description: "Premium quality chemicals for leather processing and finishing.",
      image: laboratoryImage,
    },
    {
      title: "Herbal Solutions",
      description: "Natural and sustainable herbal-based industrial solutions.",
      image: manufacturingImage,
    },
    {
      title: "Infrastructure",
      description: "Complete infrastructure solutions for industrial applications.",
      image: aboutBuilding,
    },
  ];

  const directors = [
    {
      name: "Mr. Rajesh Saba",
      title: "Chairman & Managing Director",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Mrs. Priya Saba",
      title: "Executive Director",
      image: "/api/placeholder/300/300",
    },
  ];

  const faqs = [
    {
      question: "What is Saba Group's core expertise?",
      answer: "We specialize in specialty chemicals and industrial solutions with over 37 years of experience in chemical manufacturing, quality control, and innovative product development.",
    },
    {
      question: "Which industries do you serve?",
      answer: "We serve multiple industries including leather processing, herbal products, shoe manufacturing, infrastructure development, and various chemical-dependent sectors.",
    },
    {
      question: "What makes Saba Group different?",
      answer: "Our commitment to quality, 24/7 technical support, innovative solutions, and decades of industry expertise set us apart in the chemical solutions market.",
    },
    {
      question: "Do you offer international services?",
      answer: "Yes, we have a global presence serving clients across 15+ countries with our high-quality chemical solutions and technical expertise.",
    },
  ];

  return (
    <div className="min-h-screen bg-transparent">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${aboutBuilding})` }}
      >
        <div className="absolute inset-0 bg-gradient-overlay"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="hero-text text-primary-foreground mb-6">
            Decades of Innovation,
            <span className="block gradient-text">Built for Tomorrow</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
            Over 37 years of excellence in chemical solutions, driving innovation across industries worldwide.
          </p>
          <Button variant="hero" size="lg">
            Discover Our Story
          </Button>
        </div>
      </section>

      {/* Company Profile Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-title mb-8 text-foreground">
                Over 37+ Years of
                <span className="gradient-text block">Experience</span>
              </h2>
              <div className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Since 1988, Saba Group has been at the forefront of chemical innovation, 
                  providing cutting-edge solutions that drive industrial progress. Our journey 
                  began with a vision to revolutionize the chemical industry through quality and innovation.
                </p>
                <div className="space-y-4">
                  {[
                    "Pioneering chemical solutions since 1988",
                    "Industry-leading quality standards",
                    "Global presence across 15+ countries",
                    "24/7 technical support and consultation",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src={manufacturingImage}
                alt="Saba Group Manufacturing Facility"
                className="rounded-2xl shadow-corporate w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold">37+</div>
                  <div className="text-sm">Years Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlight Card */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              Driving Innovation Through High-Quality Chemical Solutions
            </h3>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Our state-of-the-art facilities and cutting-edge technology ensure that every product 
              meets the highest industry standards, delivering exceptional value to our clients worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-6">
              Our <span className="gradient-text">Impact</span> in Numbers
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Decades of excellence reflected in our production capacity and global reach.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <stat.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <div className="text-4xl font-bold text-foreground mb-2">{stat.number}</div>
                  <div className="text-muted-foreground font-medium">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products We Cater */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-6">
              Products <span className="gradient-text">We Cater</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions across diverse industries and applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/30 transition-colors"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-foreground">{product.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </CardContent>
              </Card>
            ))}
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

      {/* FAQ Section */}
      <section className="py-20">
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

export default About;