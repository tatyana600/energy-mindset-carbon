
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Zap, Leaf, Award, Trophy, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock badge data
const badges = [
  {
    id: 1,
    name: 'Early Adopter',
    description: 'Joined the energy mindset community',
    icon: Award,
    earned: true,
    color: 'bg-energy-purple',
    date: '2023-11-10'
  },
  {
    id: 2,
    name: 'Energy Saver',
    description: 'Reduced energy usage by 10%',
    icon: Zap,
    earned: true,
    color: 'bg-energy-blue',
    date: '2023-12-15'
  },
  {
    id: 3,
    name: 'Green Thumb',
    description: 'Completed 5 sustainability challenges',
    icon: Leaf,
    earned: true,
    color: 'bg-energy-green',
    date: '2024-01-05'
  },
  {
    id: 4,
    name: 'Community Leader',
    description: 'Shared 10 tips with the community',
    icon: Trophy,
    earned: false,
    color: 'bg-energy-yellow',
    progress: 60
  },
  {
    id: 5,
    name: 'Efficiency Expert',
    description: 'Maintained low energy usage for 30 days',
    icon: TrendingUp,
    earned: false,
    color: 'bg-energy-red',
    progress: 40
  }
];

// Mock challenges data
const challenges = [
  {
    id: 1,
    name: 'No Standby Week',
    description: 'Turn off all devices completely for one week',
    progress: 70,
    daysLeft: 2,
    points: 100
  },
  {
    id: 2,
    name: 'LED Switch',
    description: 'Replace all household bulbs with LED alternatives',
    progress: 100,
    completed: true,
    points: 150
  },
  {
    id: 3,
    name: 'Peak Hour Reduction',
    description: 'Reduce energy usage during peak hours by 20%',
    progress: 45,
    daysLeft: 5,
    points: 200
  }
];

const BadgeDisplay = () => {
  const earnedBadges = badges.filter(badge => badge.earned);
  const inProgressBadges = badges.filter(badge => !badge.earned);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in">
      {/* Earned Badges Card */}
      <Card className="md:col-span-2 h-full glassmorphism">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Your Achievements</CardTitle>
          <CardDescription>Badges and rewards you've earned</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {earnedBadges.map((badge) => (
              <div 
                key={badge.id} 
                className="flex flex-col items-center text-center p-4 rounded-xl bg-secondary/50 border border-border animate-scale-in"
              >
                <div className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center text-white mb-3",
                  badge.color
                )}>
                  <badge.icon className="w-7 h-7" />
                </div>
                <h4 className="font-medium">{badge.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <CheckCircle className="w-3 h-3 text-energy-green" />
                  <span>Earned on {new Date(badge.date).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-4">Badges in progress</h4>
            <div className="space-y-4">
              {inProgressBadges.map((badge) => (
                <div key={badge.id} className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 opacity-70",
                    badge.color
                  )}>
                    <badge.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <h5 className="text-sm font-medium">{badge.name}</h5>
                      <span className="text-xs text-muted-foreground">{badge.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out animate-progress-fill"
                        style={{ 
                          width: `${badge.progress}%`, 
                          backgroundColor: badge.color.replace('bg-', 'var(--'),
                          '--progress-value': `${badge.progress}%`,
                        } as React.CSSProperties}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Active Challenges Card */}
      <Card className="glassmorphism">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Active Challenges</CardTitle>
          <CardDescription>Complete challenges to earn rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div 
                key={challenge.id} 
                className={cn(
                  "p-4 rounded-xl border transition-all",
                  challenge.completed 
                    ? "border-energy-green/30 bg-energy-green/5" 
                    : "border-border bg-secondary/30"
                )}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{challenge.name}</h4>
                  <Badge variant="outline" className="font-medium">
                    {challenge.points} pts
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{challenge.description}</p>
                
                {challenge.completed ? (
                  <div className="flex items-center gap-1 text-xs text-energy-green">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Challenge completed!</span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-1 text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-energy-blue rounded-full transition-all duration-1000 ease-out animate-progress-fill"
                        style={{ 
                          '--progress-value': `${challenge.progress}%`,
                        } as React.CSSProperties}
                      />
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {challenge.daysLeft} days remaining
                    </div>
                  </>
                )}
              </div>
            ))}
            
            <button className="w-full py-2.5 px-4 mt-2 rounded-lg border border-dashed border-border text-muted-foreground text-sm hover:bg-secondary/50 transition-colors">
              Browse more challenges
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BadgeDisplay;
