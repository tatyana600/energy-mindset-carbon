
import React, { useState } from 'react';
import ResourceCard from '@/components/ResourceCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock resources data
const resourcesData = [
  {
    id: 1,
    title: "Understanding Your Home's Energy Consumption Patterns",
    description: "Learn how to interpret your home energy usage data and identify opportunities for significant energy savings through simple habit changes.",
    image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2940&auto=format&fit=crop",
    date: "Jun 12, 2023",
    readTime: "8 min read",
    type: "article" as const,
    categories: ["Energy Basics", "Home Improvement"]
  },
  {
    id: 2,
    title: "The Future of Renewable Energy Technologies",
    description: "Explore emerging renewable energy technologies that are revolutionizing how we generate and consume power in residential and commercial settings.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2944&auto=format&fit=crop",
    date: "Aug 3, 2023",
    readTime: "12 min read",
    type: "article" as const,
    categories: ["Renewable Energy", "Technology"]
  },
  {
    id: 3,
    title: "DIY Home Energy Audit: Step by Step Guide",
    description: "Follow along as energy expert Sarah Johnson demonstrates how to conduct a comprehensive energy audit of your home to identify inefficiencies.",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2940&auto=format&fit=crop",
    date: "Sep 18, 2023",
    readTime: "22 min",
    type: "video" as const,
    categories: ["DIY", "Energy Savings"]
  },
  {
    id: 4,
    title: "Smart Home Integration for Energy Management",
    description: "Learn how to set up and integrate various smart home devices to create an intelligent energy management system for your entire household.",
    image: "https://images.unsplash.com/photo-1558002038-1055907dc40e?q=80&w=2940&auto=format&fit=crop",
    date: "Oct 7, 2023",
    readTime: "45 min",
    type: "webinar" as const,
    categories: ["Smart Home", "Technology"]
  },
  {
    id: 5,
    title: "Seasonal Energy-Saving Strategies",
    description: "Discover how to adapt your energy usage based on seasonal changes to maximize efficiency while maintaining comfort throughout the year.",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=2940&auto=format&fit=crop",
    date: "Nov 15, 2023",
    readTime: "10 min read",
    type: "article" as const,
    categories: ["Seasonal Tips", "Energy Savings"]
  },
  {
    id: 6,
    title: "Understanding Carbon Footprint Calculations",
    description: "Environmental scientist Dr. Michael Ray explains the science behind carbon footprint calculations and how individual actions impact climate change.",
    image: "https://images.unsplash.com/photo-1534531173927-aeb928d54385?q=80&w=2940&auto=format&fit=crop",
    date: "Dec 2, 2023",
    readTime: "18 min",
    type: "video" as const,
    categories: ["Climate Science", "Carbon Footprint"]
  }
];

// Extract all unique categories
const allCategories = Array.from(
  new Set(resourcesData.flatMap(resource => resource.categories))
).sort();

const Resources = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  
  const filteredResources = resourcesData.filter(resource => {
    // Filter by type
    if (selectedType !== 'all' && resource.type !== selectedType) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && !resource.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !resource.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by selected categories
    if (selectedCategories.length > 0 && 
        !resource.categories.some(category => selectedCategories.includes(category))) {
      return false;
    }
    
    return true;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Resources Header */}
          <div className="text-center mb-12 mt-8 max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-semibold mb-4">Educational Resources</h1>
            <p className="text-muted-foreground mb-8">
              Explore our collection of articles, videos, and webinars on energy consumption, sustainability, and environmental impact.
            </p>
            
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                type="search" 
                placeholder="Search for resources..." 
                className="pl-10 bg-background/70 border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs defaultValue="all" value={selectedType} onValueChange={setSelectedType} className="mx-auto">
              <TabsList className="grid grid-cols-4 w-full max-w-md">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="article">Articles</TabsTrigger>
                <TabsTrigger value="video">Videos</TabsTrigger>
                <TabsTrigger value="webinar">Webinars</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* Category Filters */}
          <div className="mb-8 flex flex-wrap gap-2 items-center justify-center animate-fade-in animate-delay-100">
            <span className="text-sm text-muted-foreground mr-1 flex items-center">
              <Filter className="h-3.5 w-3.5 mr-1" /> Filters:
            </span>
            {allCategories.map(category => (
              <Badge 
                key={category}
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
            {selectedCategories.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                className="text-xs h-7 px-2 text-muted-foreground"
                onClick={() => setSelectedCategories([])}
              >
                Clear filters
              </Button>
            )}
          </div>
          
          {/* Results Count */}
          <div className="text-sm text-muted-foreground mb-6 text-center animate-fade-in animate-delay-200">
            Showing {filteredResources.length} of {resourcesData.length} resources
          </div>
          
          {/* Resources Grid */}
          {filteredResources.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in animate-delay-300">
              {filteredResources.map((resource, index) => (
                <ResourceCard 
                  key={resource.id}
                  {...resource}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 animate-fade-in animate-delay-300">
              <h3 className="text-lg font-medium mb-2">No matching resources found</h3>
              <p className="text-muted-foreground text-sm mb-4">Try adjusting your filters or search query</p>
              <Button variant="outline" onClick={() => {
                setSearchQuery('');
                setSelectedCategories([]);
                setSelectedType('all');
              }}>
                Reset Filters
              </Button>
            </div>
          )}
          
          {/* Load More Button */}
          {filteredResources.length > 0 && (
            <div className="mt-12 text-center animate-fade-in animate-delay-400">
              <Button variant="outline">Load More Resources</Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resources;
