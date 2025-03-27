
import React from 'react';
import ForumPreview from '@/components/community/ForumPreview';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Users, MessageSquare, Trophy, Bell, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

// Mock top contributors data
const topContributors = [
  {
    id: 1,
    name: "Emma Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=3",
    level: "Community Leader",
    points: 12450,
    contributions: 86
  },
  {
    id: 2,
    name: "Sarah Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    level: "Energy Expert",
    points: 9380,
    contributions: 74
  },
  {
    id: 3,
    name: "David Kim",
    avatar: "https://i.pravatar.cc/150?img=4",
    level: "Rising Star",
    points: 6240,
    contributions: 52
  },
  {
    id: 4,
    name: "Alex Morgan",
    avatar: "https://i.pravatar.cc/150?img=5",
    level: "Active Member",
    points: 4180,
    contributions: 38
  }
];

// Mock upcoming events
const upcomingEvents = [
  {
    id: 1,
    title: "Energy Saving Workshop",
    date: "June 15, 2023",
    time: "2:00 PM - 3:30 PM",
    participants: 42,
    type: "Workshop"
  },
  {
    id: 2,
    title: "Q&A with Renewable Energy Expert",
    date: "June 20, 2023",
    time: "1:00 PM - 2:00 PM",
    participants: 67,
    type: "Webinar"
  },
  {
    id: 3,
    title: "Community Challenge: No-AC Week",
    date: "July 1-7, 2023",
    participants: 128,
    type: "Challenge"
  }
];

const Community = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4 md:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Community Header */}
          <div className="mb-12 mt-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-semibold mb-2">Community</h1>
                <p className="text-muted-foreground">Connect with like-minded individuals focused on energy conservation</p>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex items-center text-sm">
                    <Users className="w-4 h-4 mr-1.5 text-muted-foreground" />
                    <span>2,456 members</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MessageSquare className="w-4 h-4 mr-1.5 text-muted-foreground" />
                    <span>143 active discussions</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Button>
                <Button size="sm">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Join Community
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="discussions" className="w-full">
              <TabsList>
                <TabsTrigger value="discussions">Discussions</TabsTrigger>
                <TabsTrigger value="members">Members</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
              </TabsList>
              
              <TabsContent value="discussions" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="col-span-1 lg:col-span-2">
                    <ForumPreview />
                  </div>
                  
                  <div className="space-y-8">
                    {/* Top Contributors */}
                    <Card className="glassmorphism">
                      <CardHeader>
                        <CardTitle className="text-lg font-medium flex items-center">
                          <Trophy className="w-5 h-5 mr-2 text-energy-yellow" />
                          Top Contributors
                        </CardTitle>
                        <CardDescription>Members making an impact</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {topContributors.map((user, index) => (
                            <div key={user.id} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="relative">
                                  <Avatar className="h-10 w-10 border-2 border-background">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  {index < 3 && (
                                    <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium text-white ${
                                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'
                                    }`}>
                                      {index + 1}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <div className="font-medium text-sm">{user.name}</div>
                                  <div className="text-xs text-muted-foreground">{user.level}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium text-sm">{user.points.toLocaleString()} pts</div>
                                <div className="text-xs text-muted-foreground">{user.contributions} contributions</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm" className="w-full mt-4">
                          View All Contributors
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </CardContent>
                    </Card>
                    
                    {/* Upcoming Events */}
                    <Card className="glassmorphism">
                      <CardHeader>
                        <CardTitle className="text-lg font-medium">Upcoming Events</CardTitle>
                        <CardDescription>Join our community activities</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {upcomingEvents.map((event) => (
                            <div key={event.id} className="p-4 rounded-lg border border-border bg-secondary/30">
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{event.title}</h4>
                                <Badge variant="outline" className="font-normal">
                                  {event.type}
                                </Badge>
                              </div>
                              <div className="space-y-2 text-sm">
                                <div className="text-muted-foreground">{event.date}</div>
                                {event.time && <div className="text-muted-foreground">{event.time}</div>}
                                <div className="flex items-center">
                                  <Users className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
                                  <span>{event.participants} participants</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Button variant="ghost" size="sm" className="w-full mt-4">
                          View All Events
                          <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="members" className="mt-6">
                <div className="flex items-center justify-center h-64 bg-secondary/50 rounded-lg border border-dashed border-border">
                  <div className="text-center p-6">
                    <h3 className="text-lg font-medium mb-2">Members Directory</h3>
                    <p className="text-muted-foreground text-sm mb-4">Connect with other energy-conscious individuals in our community.</p>
                    <Button variant="outline">Browse Members</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="events" className="mt-6">
                <div className="flex items-center justify-center h-64 bg-secondary/50 rounded-lg border border-dashed border-border">
                  <div className="text-center p-6">
                    <h3 className="text-lg font-medium mb-2">Upcoming Community Events</h3>
                    <p className="text-muted-foreground text-sm mb-4">Participate in workshops, webinars, and meetups focused on energy conservation.</p>
                    <Button variant="outline">View Calendar</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="challenges" className="mt-6">
                <div className="flex items-center justify-center h-64 bg-secondary/50 rounded-lg border border-dashed border-border">
                  <div className="text-center p-6">
                    <h3 className="text-lg font-medium mb-2">Community Challenges</h3>
                    <p className="text-muted-foreground text-sm mb-4">Join ongoing challenges to reduce energy consumption and earn rewards.</p>
                    <Button variant="outline">View Challenges</Button>
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

export default Community;
