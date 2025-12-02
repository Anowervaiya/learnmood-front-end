import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Share2, Clock, Trophy, Smartphone, Tv } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const PricingCard = () => {
  return (
    <Card >
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold">£16.99</span>
            <span className="text-lg text-muted-foreground line-through">£84.99</span>
          </div>
     
        </div>

        <div className="space-y-2 mb-4">
        
          <Button variant="secondary" className="w-full hover:cursor-pointer" size="lg">
            Buy now
          </Button>
        </div>

        

        <div className="space-y-3 text-sm">
          <h3 className="font-semibold">This course includes:</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Tv className="h-4 w-4" />
              <span>20 Days Total Duration</span>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span>Certificate of completion</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4" />
              <span>Access on mobile and TV</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Full lifetime access</span>
            </div>
          </div>
        </div>

        
      </CardContent>
    </Card>
  );
};
