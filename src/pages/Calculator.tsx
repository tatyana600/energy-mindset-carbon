
import React from 'react';
import CarbonCalculator from '@/components/calculator/CarbonCalculator';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const Calculator = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Calculator Header */}
          <div className="text-center mb-12 mt-8 max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-3xl font-semibold mb-4">Carbon Footprint Calculator</h1>
            <p className="text-muted-foreground">
              Estimate your personal carbon footprint based on your lifestyle and energy consumption habits. 
              Get personalized recommendations to reduce your environmental impact.
            </p>
          </div>
          
          <CarbonCalculator />
          
          <div className="mt-16 max-w-3xl mx-auto text-center animate-fade-in animate-delay-300">
            <h2 className="text-xl font-medium mb-4">Why Calculate Your Carbon Footprint?</h2>
            <p className="text-muted-foreground mb-8">
              Understanding your carbon footprint is the first step toward making meaningful changes 
              to reduce your environmental impact. Our calculator helps you identify the areas where 
              your lifestyle contributes most to greenhouse gas emissions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                <div className="w-12 h-12 rounded-full bg-energy-blue/20 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-energy-blue"><path d="M2 22h20"></path><path d="M3 9c0-1 .6-3 2-3s2.4 3 4 3 2.4-3 4-3 2.4 3 4 3 2-2 2-3"></path><path d="M3 18c0-1 .6-3 2-3s2.4 3 4 3 2.4-3 4-3 2.4 3 4 3 2-2 2-3"></path></svg>
                </div>
                <h3 className="font-medium mb-2">Awareness</h3>
                <p className="text-sm text-muted-foreground">
                  Gain insight into how your daily activities contribute to your overall carbon footprint.
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                <div className="w-12 h-12 rounded-full bg-energy-green/20 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-energy-green"><path d="M6 3v12"></path><path d="M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path><path d="M15 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"></path><path d="M18 9a9 9 0 0 1-9 9"></path><path d="M15 12a9 9 0 0 1-9-9"></path></svg>
                </div>
                <h3 className="font-medium mb-2">Action Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Receive personalized recommendations on how to reduce your environmental impact.
                </p>
              </div>
              
              <div className="p-6 rounded-xl bg-secondary/50 border border-border">
                <div className="w-12 h-12 rounded-full bg-energy-purple/20 flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-energy-purple"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
                </div>
                <h3 className="font-medium mb-2">Track Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor changes in your carbon footprint over time as you implement sustainable habits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Calculator;
