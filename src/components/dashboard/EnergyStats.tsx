import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Cell, LineChart, Line } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Plus, Zap, ZapOff, Lightbulb, Refrigerator, Tv, Fan, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for the charts
const dailyData = [
  { time: '12 AM', value: 30 },
  { time: '4 AM', value: 20 },
  { time: '8 AM', value: 95 },
  { time: '12 PM', value: 75 },
  { time: '4 PM', value: 110 },
  { time: '8 PM', value: 85 },
];

const weeklyData = [
  { day: 'Mon', value: 420 },
  { day: 'Tue', value: 380 },
  { day: 'Wed', value: 450 },
  { day: 'Thu', value: 410 },
  { day: 'Fri', value: 500 },
  { day: 'Sat', value: 350 },
  { day: 'Sun', value: 300 },
];

const monthlyData = [
  { week: 'Week 1', value: 1800 },
  { week: 'Week 2', value: 1950 },
  { week: 'Week 3', value: 1700 },
  { week: 'Week 4', value: 1500 },
];

const deviceData = [
  { name: 'Heating/AC', value: 45, color: '#2E9E5B' },
  { name: 'Refrigerator', value: 15, color: '#4ADE80' },
  { name: 'Oven/Range', value: 10, color: '#86EFAC' },
  { name: 'Lighting', value: 8, color: '#BAF098' },
  { name: 'Electronics', value: 12, color: '#22C55E' },
  { name: 'Other', value: 10, color: '#16A34A' },
];

const EnergyStats = () => {
  const [timeframe, setTimeframe] = useState('daily');
  
  const currentData = timeframe === 'daily' 
    ? dailyData 
    : timeframe === 'weekly' 
      ? weeklyData 
      : monthlyData;
  
  const xDataKey = timeframe === 'daily' 
    ? 'time' 
    : timeframe === 'weekly' 
      ? 'day' 
      : 'week';

  // Calculate the percentage change compared to previous period (mock data)
  const percentageChange = timeframe === 'daily' 
    ? -5.2 
    : timeframe === 'weekly' 
      ? 2.8 
      : -3.1;
  
  const totalUsage = timeframe === 'daily' 
    ? '4.2 kWh' 
    : timeframe === 'weekly' 
      ? '29.8 kWh' 
      : '118 kWh';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Energy usage summary */}
        <Card className="col-span-1 glassmorphism">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Energy Usage</CardTitle>
            <CardDescription>Total for current period</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-3xl font-semibold">{totalUsage}</div>
              <div className={cn(
                "flex items-center text-sm",
                percentageChange < 0 ? "text-energy-green" : "text-energy-red"
              )}>
                <span className="mr-1">{percentageChange > 0 ? '↑' : '↓'}</span>
                <span>{Math.abs(percentageChange)}% compared to previous</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Device breakdown */}
        <Card className="col-span-1 lg:col-span-3 glassmorphism">
          <CardHeader>
            <CardTitle className="text-lg font-medium">Device Breakdown</CardTitle>
            <CardDescription>Energy consumption by device</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-full md:w-1/3 space-y-4">
                {deviceData.map((device) => (
                  <div key={device.name} className="space-y-1">
                    <div className="flex justify-between items-center text-sm">
                      <span>{device.name}</span>
                      <span className="font-medium">{device.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ 
                          width: `${device.value}%`, 
                          backgroundColor: device.color,
                          '--progress-value': `${device.value}%`,
                        } as React.CSSProperties}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-full md:w-2/3 h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={deviceData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ 
                        borderRadius: '0.5rem', 
                        border: '1px solid rgba(229, 231, 235, 0.5)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                      }} 
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {deviceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Energy usage over time */}
      <Card className="glassmorphism">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <CardTitle className="text-lg font-medium">Energy Usage Over Time</CardTitle>
              <CardDescription>Monitor your consumption patterns</CardDescription>
            </div>
            <Tabs value={timeframe} onValueChange={setTimeframe} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-3 w-full sm:w-auto">
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={currentData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey={xDataKey} 
                  axisLine={false} 
                  tickLine={false}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  unit={timeframe === 'daily' ? 'W' : 'kWh'} 
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '0.5rem', 
                    border: '1px solid rgba(229, 231, 235, 0.5)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#60A5FA" 
                  strokeWidth={3}
                  dot={{ stroke: '#60A5FA', strokeWidth: 2, r: 4, fill: '#fff' }}
                  activeDot={{ stroke: '#60A5FA', strokeWidth: 2, r: 6, fill: '#fff' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnergyStats;
