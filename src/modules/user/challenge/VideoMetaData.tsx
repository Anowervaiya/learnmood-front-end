import { ThumbsUp, Heart, Share2, Bookmark, Download, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const VideoMetadata = () => {
  return (
    <Card className="p-6 space-y-5 bg-card border-border">
      {/* Video Title with Rating */}
      <div className="space-y-3">
        <h1 className="text-2xl font-bold text-foreground leading-tight">
          2023 এ Web Development এর যে Technology শিখলে আপনার ক্যারিয়ার শেষ!
        </h1>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-warning text-warning" />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">4.8</span>
            <span className="text-sm text-muted-foreground">(12,458 ratings)</span>
          </div>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            Bestseller
          </Badge>
        </div>
      </div>

      {/* Instructor Info and Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pt-2 border-t border-border">
        {/* Instructor Info */}
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 ring-2 ring-primary/20">
            <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop" alt="Hablu Programmer" />
            <AvatarFallback>HP</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Hablu Programmer</span>
              <Badge variant="outline" className="text-xs px-2 py-0 border-primary/30 text-primary">
                Verified
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">Expert Instructor • 247K Students</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button variant="default" size="sm" className="gap-2 bg-primary hover:bg-primary/90">
            <ThumbsUp className="h-4 w-4" />
            Like (2K)
          </Button>

          <Button variant="outline" size="sm" className="gap-2 border-border hover:bg-accent">
            <Heart className="h-4 w-4" />
            Save
          </Button>

          <Button variant="outline" size="sm" className="gap-2 border-border hover:bg-accent">
            <Share2 className="h-4 w-4" />
            Share
          </Button>

          <Button variant="outline" size="sm" className="gap-2 border-border hover:bg-accent">
            <Download className="h-4 w-4" />
            Resources
          </Button>

          <Button variant="outline" size="sm" className="gap-2 border-border hover:bg-accent">
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
