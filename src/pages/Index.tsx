
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ArrowRight, ChevronRight, ZapIcon, Lightbulb, Leaf, Shield, BarChart, BookOpen, Users, Calculator } from 'lucide-react';
import { Award, Sparkles } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { cn } from '@/lib/utils';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const sections = document.querySelectorAll('.section-animate');
    sections.forEach((section) => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-energy-blue/5 to-transparent" />
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto animate-fade-in">
              <Badge className="mb-6 px-4 py-1 text-sm" variant="outline">
                Energy Mindset Collective
              </Badge>
              <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-6">
                Monitor, Reduce, and <span className="text-energy-blue">Transform</span> Your Energy Impact
              </h1>
              <p className="text-muted-foreground text-lg mb-10 max-w-2xl">
                Join our community of energy-conscious individuals committed to reducing consumption, tracking progress, and making a positive environmental impact.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/calculator">
                    Calculate Your Footprint
                  </Link>
                </Button>
              </div>
              
              {/* Stats Counter */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 w-full">
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-energy-blue to-energy-teal">
                    4,500+
                  </div>
                  <div className="text-muted-foreground text-sm">Active Members</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-energy-green to-energy-teal">
                    25,000+
                  </div>
                  <div className="text-muted-foreground text-sm">kWh Saved</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold mb-1 bg-clip-text text-transparent bg-gradient-to-r from-energy-teal to-energy-blue">
                    12 tons
                  </div>
                  <div className="text-muted-foreground text-sm">CO₂ Reduced</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section 
          ref={featuresRef} 
          className="py-24 bg-secondary/30"
          id="features"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 section-animate">
              <Badge className="mb-4" variant="outline">Features</Badge>
              <h2 className="text-3xl font-semibold mb-6">Everything You Need to Track and Reduce Energy</h2>
              <p className="text-muted-foreground">
                Our comprehensive platform helps you monitor energy usage, participate in the community, 
                and learn how to make impactful changes in your daily life.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="glassmorphism section-animate">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-energy-blue/20 flex items-center justify-center mb-6">
                    <BarChart className="h-6 w-6 text-energy-blue" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Real-Time Monitoring</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Connect with smart home devices to track energy consumption patterns across appliances.
                  </p>
                  <Link to="/dashboard" className="text-energy-blue text-sm font-medium flex items-center hover:underline">
                    View Dashboard
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="glassmorphism section-animate" style={{ animationDelay: '100ms' }}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-energy-green/20 flex items-center justify-center mb-6">
                    <Award className="h-6 w-6 text-energy-green" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Gamification Elements</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Earn badges, complete challenges, and compete on leaderboards with other members.
                  </p>
                  <Link to="/dashboard" className="text-energy-green text-sm font-medium flex items-center hover:underline">
                    Check Achievements
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="glassmorphism section-animate" style={{ animationDelay: '200ms' }}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-energy-purple/20 flex items-center justify-center mb-6">
                    <BookOpen className="h-6 w-6 text-energy-purple" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Educational Resources</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Access articles, videos, and webinars about sustainability and energy conservation.
                  </p>
                  <Link to="/resources" className="text-energy-purple text-sm font-medium flex items-center hover:underline">
                    Browse Resources
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
              
              <Card className="glassmorphism section-animate" style={{ animationDelay: '300ms' }}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-full bg-energy-yellow/20 flex items-center justify-center mb-6">
                    <Calculator className="h-6 w-6 text-energy-yellow" />
                  </div>
                  <h3 className="font-medium text-lg mb-2">Carbon Footprint Tools</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Calculate your carbon impact and get personalized recommendations for improvement.
                  </p>
                  <Link to="/calculator" className="text-energy-yellow text-sm font-medium flex items-center hover:underline">
                    Calculate Now
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16 section-animate">
              <Badge className="mb-4" variant="outline">How It Works</Badge>
              <h2 className="text-3xl font-semibold mb-6">Your Journey to Energy Mindfulness</h2>
              <p className="text-muted-foreground">
                Our platform makes it easy to understand, track, and improve your energy consumption habits in three simple steps.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              <div className="flex flex-col items-center text-center section-animate">
                <div className="relative mb-8">
                  <div className="w-16 h-16 rounded-full bg-energy-blue/20 flex items-center justify-center mb-4 relative z-10">
                    <ZapIcon className="h-8 w-8 text-energy-blue" />
                  </div>
                  <div className="text-4xl font-bold absolute -top-4 -left-4 text-gray-100">01</div>
                </div>
                <h3 className="text-xl font-medium mb-3">Connect & Monitor</h3>
                <p className="text-muted-foreground">
                  Link your smart home devices or manually input your energy usage data to establish your baseline consumption.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center section-animate" style={{ animationDelay: '100ms' }}>
                <div className="relative mb-8">
                  <div className="w-16 h-16 rounded-full bg-energy-green/20 flex items-center justify-center mb-4 relative z-10">
                    <Sparkles className="h-8 w-8 text-energy-green" />
                  </div>
                  <div className="text-4xl font-bold absolute -top-4 -left-4 text-gray-100">02</div>
                </div>
                <h3 className="text-xl font-medium mb-3">Learn & Engage</h3>
                <p className="text-muted-foreground">
                  Explore educational resources and join community activities to deepen your understanding of energy conservation.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center section-animate" style={{ animationDelay: '200ms' }}>
                <div className="relative mb-8">
                  <div className="w-16 h-16 rounded-full bg-energy-purple/20 flex items-center justify-center mb-4 relative z-10">
                    <Leaf className="h-8 w-8 text-energy-purple" />
                  </div>
                  <div className="text-4xl font-bold absolute -top-4 -left-4 text-gray-100">03</div>
                </div>
                <h3 className="text-xl font-medium mb-3">Reduce & Transform</h3>
                <p className="text-muted-foreground">
                  Implement personalized recommendations, track your progress, and celebrate milestones with the community.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Community Section */}
        <section className="py-24 bg-secondary/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="w-full lg:w-1/2 section-animate">
                <Badge className="mb-4" variant="outline">Community</Badge>
                <h2 className="text-3xl font-semibold mb-6">Join a Growing Movement of Energy-Conscious Individuals</h2>
                <p className="text-muted-foreground mb-6">
                  Connect with like-minded people who share your passion for sustainability and energy conservation. Share tips, celebrate victories, and support each other's journey.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-energy-blue/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Users className="h-3 w-3 text-energy-blue" />
                    </div>
                    <div>
                      <h4 className="font-medium">Active Discussion Forums</h4>
                      <p className="text-sm text-muted-foreground">
                        Participate in vibrant discussions about energy saving techniques, sustainable living, and environmental impact.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-energy-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Award className="h-3 w-3 text-energy-green" />
                    </div>
                    <div>
                      <h4 className="font-medium">Community Challenges</h4>
                      <p className="text-sm text-muted-foreground">
                        Join group challenges designed to reduce energy consumption and build sustainable habits as a community.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-energy-purple/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Sparkles className="h-3 w-3 text-energy-purple" />
                    </div>
                    <div>
                      <h4 className="font-medium">Success Stories</h4>
                      <p className="text-sm text-muted-foreground">
                        Share your achievements and learn from others who have successfully reduced their energy footprint.
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button className="mt-8" asChild>
                  <Link to="/community">
                    Join Our Community
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className="w-full lg:w-1/2 section-animate" style={{ animationDelay: '200ms' }}>
                <div className="relative">
                  <div className="aspect-video rounded-xl overflow-hidden glassmorphism">
                    <img 
                      src="https://images.unsplash.com/photo-1525026198548-4baa812f1183?q=80&w=2968&auto=format&fit=crop" 
                      alt="Community of people discussing energy savings" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="absolute -bottom-6 -left-6 p-4 rounded-xl glassmorphism-dark w-60 animate-float">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar className="h-10 w-10 border-2 border-white/10">
                        <AvatarImage src="https://i.pravatar.cc/150?img=3" />
                        <AvatarFallback>ER</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">Emma R.</div>
                        <div className="text-xs text-muted-foreground">Community Leader</div>
                      </div>
                    </div>
                    <p className="text-xs">
                      "Joining this community helped me reduce my energy bill by 35% in just two months!"
                    </p>
                  </div>
                  
                  <div className="absolute -top-4 -right-4 p-4 rounded-xl glassmorphism w-48 backdrop-blur-xl animate-float" style={{ animationDelay: '1s' }}>
                    <div className="text-sm font-medium mb-1">Weekly Challenge</div>
                    <div className="text-xs mb-2">No-Standby Power Week</div>
                    <div className="w-full h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                      <div className="h-full w-[65%] bg-energy-green rounded-full" />
                    </div>
                    <div className="text-xs text-right mt-1 text-muted-foreground">128 participants</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 z-0 bg-gradient-to-t from-energy-blue/5 to-transparent" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center section-animate">
              <Badge className="mb-6" variant="outline">Take Action Today</Badge>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6">Ready to Transform Your Energy Impact?</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of individuals who are making a difference by monitoring, reducing, and transforming their energy consumption habits.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Get Started Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/calculator">Calculate Your Footprint</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
