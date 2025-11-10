import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const courses = [
  {
    title: "Advanced Contract Negotiation",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&auto=format&fit=crop",
    instructor: "Michael Chen",
    rating: 4.7,
    students: "15,234",
    price: "£19.99",
    originalPrice: "£89.99"
  },
  {
    title: "Business English Masterclass",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&auto=format&fit=crop",
    instructor: "Emma Wilson",
    rating: 4.8,
    students: "23,891",
    price: "£14.99",
    originalPrice: "£79.99"
  },
  {
    title: "Legal Writing & Documentation",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop",
    instructor: "James Smith",
    rating: 4.6,
    students: "8,567",
    price: "£18.99",
    originalPrice: "£84.99"
  }
];

export const SimilarChallenge = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Similar Courses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {courses.map((course, index) => (
          <div key={index} className="flex gap-3 pb-4 border-b last:border-0 last:pb-0 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors">
            <img
              src={course.image}
              alt={course.title}
              className="w-32 h-20 object-cover rounded flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm line-clamp-2 mb-1">{course.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">{course.instructor}</p>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-xs font-bold text-warning">{course.rating}</span>
                <Star className="h-3 w-3 fill-warning text-warning" />
                <span className="text-xs text-muted-foreground">({course.students})</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold">{course.price}</span>
                <span className="text-xs text-muted-foreground line-through">{course.originalPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
