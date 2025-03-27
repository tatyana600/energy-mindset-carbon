
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EnergyStats from '@/components/dashboard/EnergyStats';
import BadgeDisplay from '@/components/dashboard/BadgeDisplay';
import { Button } from "@/components/ui/button";
import { PlusCircle, Settings } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Dashboard Header */}
          <div className="mb-10 mt-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-semibold">Energy Dashboard</h1>
                <p className="text-muted-foreground mt-1">Monitor your energy usage and achievements</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
                <Button size="sm">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Connect Device
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="devices">Devices</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <EnergyStats />
              </TabsContent>
              
              <TabsContent value="achievements" className="mt-6">
                <BadgeDisplay />
              </TabsContent>
              
              <TabsContent value="devices" className="mt-6">
                <div className="flex items-center justify-center h-64 bg-secondary/50 rounded-lg border border-dashed border-border">
                  <div className="text-center p-6">
                    <h3 className="text-lg font-medium mb-2">No Devices Connected</h3>
                    <p className="text-muted-foreground text-sm mb-4">Connect your smart devices to start monitoring detailed energy usage.</p>
                    <Button>
                      <PlusCircle className="w-4 h-4 mr-2" />
                      Connect Device
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="insights" className="mt-6">
                <div className="flex items-center justify-center h-64 bg-secondary/50 rounded-lg border border-dashed border-border">
                  <div className="text-center p-6">
                    <h3 className="text-lg font-medium mb-2">Insights Coming Soon</h3>
                    <p className="text-muted-foreground text-sm mb-4">We're analyzing your usage patterns to provide personalized insights.</p>
                    <Button variant="outline">Learn More</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
