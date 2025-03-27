
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

interface Result {
  carbon: number;
  electricity: number;
  transportation: number;
  food: number;
  goods: number;
  rating: 'excellent' | 'good' | 'average' | 'poor';
  tips: string[];
}

const CarbonCalculator = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    household: { size: 2, type: 'apartment' },
    energy: { monthly: 250, renewable: 25 },
    transportation: { vehicle: 'hybrid', mileage: 10000, flights: 2 },
    food: { diet: 'omnivore', local: 30 },
    shopping: { frequency: 'moderate' }
  });
  const [result, setResult] = useState<Result | null>(null);
  
  const updateFormData = (category: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }));
  };
  
  const calculateResult = () => {
    // In a real app, this would use a more complex calculation
    // This is just a simple mock for demonstration
    
    const electricityEmissions = formData.energy.monthly * 0.5 * (1 - formData.energy.renewable / 100);
    
    let transportEmissions = 0;
    if (formData.transportation.vehicle === 'electric') {
      transportEmissions = formData.transportation.mileage * 0.1;
    } else if (formData.transportation.vehicle === 'hybrid') {
      transportEmissions = formData.transportation.mileage * 0.2;
    } else {
      transportEmissions = formData.transportation.mileage * 0.3;
    }
    transportEmissions += formData.transportation.flights * 500;
    
    let foodEmissions = 0;
    if (formData.food.diet === 'vegan') {
      foodEmissions = 1000;
    } else if (formData.food.diet === 'vegetarian') {
      foodEmissions = 1500;
    } else {
      foodEmissions = 2500;
    }
    foodEmissions = foodEmissions * (1 - formData.food.local / 100);
    
    let goodsEmissions = 0;
    if (formData.shopping.frequency === 'minimal') {
      goodsEmissions = 500;
    } else if (formData.shopping.frequency === 'moderate') {
      goodsEmissions = 1000;
    } else {
      goodsEmissions = 2000;
    }
    
    const totalEmissions = electricityEmissions + transportEmissions + foodEmissions + goodsEmissions;
    
    let rating: 'excellent' | 'good' | 'average' | 'poor' = 'average';
    if (totalEmissions < 5000) {
      rating = 'excellent';
    } else if (totalEmissions < 10000) {
      rating = 'good';
    } else if (totalEmissions < 15000) {
      rating = 'average';
    } else {
      rating = 'poor';
    }
    
    const tips = [
      'Consider switching to a renewable energy provider',
      'Reduce meat consumption to lower your carbon footprint',
      'Use public transportation or carpooling when possible',
      'Buy local produce to reduce transportation emissions',
      'Invest in energy-efficient appliances for your home'
    ];
    
    setResult({
      carbon: Math.round(totalEmissions / 1000),
      electricity: Math.round(electricityEmissions / totalEmissions * 100),
      transportation: Math.round(transportEmissions / totalEmissions * 100),
      food: Math.round(foodEmissions / totalEmissions * 100),
      goods: Math.round(goodsEmissions / totalEmissions * 100),
      rating,
      tips: tips.sort(() => 0.5 - Math.random()).slice(0, 3)
    });
    
    setStep(6);
  };
  
  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="household-size">Household Size</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="household-size" 
                    type="number" 
                    min={1} 
                    max={10}
                    value={formData.household.size}
                    onChange={(e) => updateFormData('household', 'size', parseInt(e.target.value))}
                  />
                  <span className="text-sm text-muted-foreground">people</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="household-type">Dwelling Type</Label>
                <Select 
                  value={formData.household.type}
                  onValueChange={(value) => updateFormData('household', 'type', value)}
                >
                  <SelectTrigger id="household-type">
                    <SelectValue placeholder="Select your dwelling type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                    <SelectItem value="condo">Condominium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Label htmlFor="energy-monthly">Monthly Electricity Usage</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                          <HelpCircle className="h-3 w-3 text-muted-foreground" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        You can find this information on your electricity bill or by checking your energy provider's website.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex items-center gap-2">
                  <Input 
                    id="energy-monthly" 
                    type="number"

                    min={0}
                    max={1000}
                    value={formData.energy.monthly}
                    onChange={(e) => updateFormData('energy', 'monthly', parseInt(e.target.value))}
                  />
                  <span className="text-sm text-muted-foreground">kWh</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="renewable-percentage">
                  Percentage of Renewable Energy
                </Label>
                <div className="space-y-4">
                  <Slider 
                    id="renewable-percentage"
                    min={0}
                    max={100}
                    step={5}
                    value={[formData.energy.renewable]}
                    onValueChange={(value) => updateFormData('energy', 'renewable', value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                  <div className="text-center font-medium">{formData.energy.renewable}%</div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="vehicle-type">Primary Vehicle Type</Label>
                <Select 
                  value={formData.transportation.vehicle}
                  onValueChange={(value) => updateFormData('transportation', 'vehicle', value)}
                >
                  <SelectTrigger id="vehicle-type">
                    <SelectValue placeholder="Select your vehicle type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electric">Electric Vehicle</SelectItem>
                    <SelectItem value="hybrid">Hybrid Vehicle</SelectItem>
                    <SelectItem value="gasoline">Gasoline/Diesel Vehicle</SelectItem>
                    <SelectItem value="none">No Vehicle / Public Transit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {formData.transportation.vehicle !== 'none' && (
                <div className="space-y-2">
                  <Label htmlFor="annual-mileage">Annual Mileage</Label>
                  <div className="flex items-center gap-2">
                    <Input 
                      id="annual-mileage" 
                      type="number"
                      min={0}
                      max={50000}
                      value={formData.transportation.mileage}
                      onChange={(e) => updateFormData('transportation', 'mileage', parseInt(e.target.value))}
                    />
                    <span className="text-sm text-muted-foreground">miles/year</span>
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="flights-per-year">Flights Per Year</Label>
                <Input 
                  id="flights-per-year" 
                  type="number"
                  min={0}
                  max={100}
                  value={formData.transportation.flights}
                  onChange={(e) => updateFormData('transportation', 'flights', parseInt(e.target.value))}
                />
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="diet-type">Diet Type</Label>
                <Select 
                  value={formData.food.diet}
                  onValueChange={(value) => updateFormData('food', 'diet', value)}
                >
                  <SelectTrigger id="diet-type">
                    <SelectValue placeholder="Select your diet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegan">Vegan</SelectItem>
                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="pescatarian">Pescatarian</SelectItem>
                    <SelectItem value="omnivore">Omnivore</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="local-food">Percentage of Locally Sourced Food</Label>
                <div className="space-y-4">
                  <Slider 
                    id="local-food"
                    min={0}
                    max={100}
                    step={10}
                    value={[formData.food.local]}
                    onValueChange={(value) => updateFormData('food', 'local', value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                  <div className="text-center font-medium">{formData.food.local}%</div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shopping-frequency">Shopping Frequency</Label>
                <Select 
                  value={formData.shopping.frequency}
                  onValueChange={(value) => updateFormData('shopping', 'frequency', value)}
                >
                  <SelectTrigger id="shopping-frequency">
                    <SelectValue placeholder="Select your shopping habits" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimal">Minimal (Rarely buy new items)</SelectItem>
                    <SelectItem value="moderate">Moderate (Occasionally buy new items)</SelectItem>
                    <SelectItem value="frequent">Frequent (Regularly buy new items)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="pt-4 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Ready to calculate your carbon footprint? This will provide an estimate based on the information you've provided.
              </p>
              <Button onClick={calculateResult} className="w-full">
                Calculate My Footprint
              </Button>
            </div>
          </div>
        );
        
      case 6:
        return result && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-semibold">Your Carbon Footprint</h3>
              <div className="text-4xl font-bold text-primary">
                {result.carbon} <span className="text-lg font-normal text-muted-foreground">tonnes CO₂e/year</span>
              </div>
              
              <div className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-sm mt-2",
                result.rating === 'excellent' ? "bg-energy-green/20 text-energy-green" :
                result.rating === 'good' ? "bg-energy-blue/20 text-energy-blue" :
                result.rating === 'average' ? "bg-energy-yellow/20 text-energy-yellow" :
                "bg-energy-red/20 text-energy-red"
              )}>
                <span className="capitalize">{result.rating}</span>
                {result.rating === 'excellent' && <CheckCircle className="ml-1 h-4 w-4" />}
                {result.rating === 'poor' && <AlertCircle className="ml-1 h-4 w-4" />}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Breakdown by Category</h4>
              
              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Electricity</span>
                    <span className="font-medium">{result.electricity}%</span>
                  </div>
                  <Progress value={result.electricity} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Transportation</span>
                    <span className="font-medium">{result.transportation}%</span>
                  </div>
                  <Progress value={result.transportation} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Food</span>
                    <span className="font-medium">{result.food}%</span>
                  </div>
                  <Progress value={result.food} className="h-2" />
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Goods & Services</span>
                    <span className="font-medium">{result.goods}%</span>
                  </div>
                  <Progress value={result.goods} className="h-2" />
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium">Personalized Recommendations</h4>
              <div className="space-y-2">
                {result.tips.map((tip, index) => (
                  <div key={index} className="flex gap-2 items-start p-3 rounded-lg bg-secondary/50">
                    <CheckCircle className="w-5 h-5 text-energy-green flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-2">
              <Button 
                onClick={() => {
                  setStep(1);
                  setResult(null);
                }} 
                variant="outline" 
                className="w-full"
              >
                Start Over
              </Button>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-xl mx-auto">
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle>Carbon Footprint Calculator</CardTitle>
          <CardDescription>
            Calculate your carbon footprint based on your lifestyle and get personalized recommendations
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {step < 6 && (
            <div className="mb-6">
              <div className="flex justify-between mb-2 text-sm">
                <span>Step {step} of 5</span>
                <span>{step === 1 ? 'Household' : step === 2 ? 'Energy' : step === 3 ? 'Transportation' : step === 4 ? 'Food' : 'Shopping'}</span>
              </div>
              <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-300"
                  style={{ width: `${(step / 5) * 100}%` }}
                />
              </div>
            </div>
          )}
          
          {renderStepContent()}
        </CardContent>
        
        {step < 5 && (
          <div className="px-6 pb-6 flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              Previous
            </Button>
            <Button onClick={() => setStep(Math.min(5, step + 1))}>
              Next
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default CarbonCalculator;
