
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, Heart, Eye, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock forum discussion data
const discussions = [
  {
    id: 1,
    title: "How I reduced my electricity bill by 40% in 3 months",
    preview: "I've been using some simple techniques to monitor and control my energy usage, and I've seen incredible results. I want to share my experience with...",
    author: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      level: "Energy Expert"
    },
    category: "Success Stories",
    replies: 24,
    likes: 47,
    views: 152,
    timeAgo: "3 hours ago",
    isHot: true
  },
  {
    id: 2,
    title: "Best smart home devices for energy monitoring?",
    preview: "I'm looking to invest in some smart home devices specifically focused on energy monitoring. Any recommendations for which brands/products have worked well for you?",
    author: {
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=2",
      level: "Active Member"
    },
    category: "Questions",
    replies: 16,
    likes: 8,
    views: 73,
    timeAgo: "12 hours ago",
    isHot: false
  },
  {
    id: 3,
    title: "Weekly Energy Challenge: Phantom Power Hunt",
    preview: "This week's community challenge is to identify and eliminate phantom power in your home. Share your findings and how much energy you're saving...",
    author: {
      name: "Emma Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=3",
      level: "Community Leader"
    },
    category: "Challenges",
    replies: 31,
    likes: 42,
    views: 128,
    timeAgo: "1 day ago",
    isHot: true
  }
];

const ForumPreview = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Community Discussions</h2>
          <p className="text-muted-foreground">Join conversations with energy-conscious people from around the world</p>
        </div>
        <Button className="self-start">
          Start New Discussion
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {discussions.map((discussion) => (
          <Card key={discussion.id} className="glassmorphism overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <Avatar className="h-9 w-9 border-2 border-background">
                    <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                    <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">{discussion.author.name}</div>
                    <div className="text-xs text-muted-foreground">{discussion.author.level}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs font-normal">
                    {discussion.category}
                  </Badge>
                  {discussion.isHot && (
                    <Badge className="bg-energy-red text-white text-xs font-normal">
                      Hot
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <h3 className="text-lg font-medium leading-tight">
                  {discussion.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {discussion.preview}
                </p>
                
                <div className="flex items-center justify-between pt-3 text-sm">
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1.5" />
                      <span>{discussion.replies}</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 mr-1.5" />
                      <span>{discussion.likes}</span>
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1.5" />
                      <span>{discussion.views}</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {discussion.timeAgo}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button variant="outline">
          View More Discussions
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ForumPreview;
