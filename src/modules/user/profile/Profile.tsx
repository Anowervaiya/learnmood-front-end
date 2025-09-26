import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Briefcase,
  GraduationCap,
  Globe,
  Users,
  MessageSquare,
  Heart,
  Share2,
  MoreHorizontal,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Mail,
} from "lucide-react"
import Image from "next/image"
import { ProfileTabs } from "./ProfileTabs"

export function Profile() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <div className="lg:col-span-4">
        <div className="sticky top-20 space-y-6">
          {/* Profile Card */}
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4 ring-2 ring-primary/20">
                  <AvatarImage src="/professional-man.jpg" />
                  <AvatarFallback className="text-lg">AH</AvatarFallback>
                </Avatar>
                <h1 className="text-xl font-bold mb-1">Anower Hossen</h1>
                <p className="text-muted-foreground text-sm mb-3">(Shanto)</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Software Engineer passionate about building accessible, pixel-perfect digital experiences.
                </p>
                <div className="flex justify-center space-x-2 mb-4">
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                    <Github className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>1.2K</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare className="w-4 h-4" />
                    <span>324</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="lg:col-span-8 space-y-8">
        {/* Hero Section */}
        <section id="about" className="relative">
          <div className="relative h-64  rounded-2xl overflow-hidden mb-8">
            <Image src="/banner.jpg" alt="Cover" fill className="object-cover " />
        
          </div>

         
        </section>

        <ProfileTabs/>

        {/* Posts Section */}
       
      </div>
    </div>
  )
}
