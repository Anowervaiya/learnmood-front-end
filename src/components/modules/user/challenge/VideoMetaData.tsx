

import { ThumbsUp, Heart, Share2, Bookmark, Download, Star, ThumbsDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IPage } from "@/interfaces/page.interface";

export const VideoMetadata = ({ metaData }: { metaData: { createdBy: Partial<IPage>; title: string } }) => {
  return (
    <div className="  bg-card p-0">
      {/* Video Title with Rating */}
      <div className="">
        <h1 className="text-2xl font-bold mb-2 text-foreground leading-tight">
          {metaData?.title}
        </h1>

      </div>

      {/* Instructor Info and Actions */}
      <div className="flex items-center justify-between gap-5 pt-2 ">
        {/* Instructor Info */}
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 ring-2 ring-primary/20">
            <AvatarImage src={metaData?.createdBy?.image?.profile} alt="Hablu Programmer" />
            <AvatarFallback>HP</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">Lardix Agency</span>

            </div>
            <p className="text-sm text-muted-foreground">{metaData.createdBy?.followersCount} Followers</p>
          </div>
          <div>
            <Button variant="outline" size="sm" className="bg-secondary rounded-full hover:bg-secondary/90 text-black">
              <Heart className="h-4 w-4" />
              Follow
            </Button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center  gap-2 flex-wrap">
          <Button variant="outline" size="sm" className="bg-secondary rounded-full hover:bg-secondary/90 text-black ">
            <span className="flex items-center justify-center gap-2 "><ThumbsUp className="h-4 w-4" />
              Like (2K)</span>


          </Button>
          <Button variant="outline" size="sm" className="bg-secondary rounded-full hover:bg-secondary/90 text-black ">
            <span className="flex items-center justify-center gap-2"><ThumbsDown className="h-4 w-4" />
              Dislike </span>

          </Button>
          <Button variant="outline" size="sm" className="bg-secondary rounded-full hover:bg-secondary/90 text-black">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};
