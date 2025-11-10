import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    name: "Sarah M.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop",
    rating: 5,
    time: "2 weeks ago",
    comment: "Excellent course! David explains complex legal concepts in a very clear and practical way. The examples are relevant and helpful.",
    helpful: 12
  },
  {
    name: "James K.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop",
    rating: 5,
    time: "1 month ago",
    comment: "As a non-native speaker working in international law, this course has been invaluable. Highly recommended!",
    helpful: 8
  }
];

export const ReviewsSection = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Student feedback</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-warning">4.6</span>
            <div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">Course Rating</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={review.avatar} />
                  <AvatarFallback>{review.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{review.name}</h4>
                    <span className="text-xs text-muted-foreground">{review.time}</span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-sm mb-2">{review.comment}</p>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
