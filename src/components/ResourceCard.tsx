
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, Eye, BookOpen, Film, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
  title: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
  type: 'article' | 'video' | 'webinar';
  categories: string[];
  className?: string;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  image,
  date,
  readTime,
  type,
  categories,
  className
}) => {
  const TypeIcon = type === 'article' 
    ? BookOpen 
    : type === 'video' 
      ? Film 
      : Headphones;
  
  const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
  
  return (
    <Card className={cn("overflow-hidden card-hover glassmorphism", className)}>
      <div className="relative aspect-video w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <Badge 
          className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground" 
          variant="outline"
        >
          <TypeIcon className="w-3 h-3 mr-1" />
          {typeLabel}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex flex-wrap gap-1 mb-2">
          {categories.map((category, index) => (
            <Badge key={index} variant="secondary" className="text-xs font-normal">
              {category}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-lg font-medium leading-tight">{title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center border-t pt-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-1" />
            <span>{date}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1" />
            <span>{readTime}</span>
          </div>
        </div>
        
        <Button variant="ghost" size="sm" className="p-0 h-auto">
          <Eye className="w-3.5 h-3.5 mr-1" />
          Read more
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;
