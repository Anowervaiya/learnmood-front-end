export const VideoPlayer = () => {
  return (
    <div className="relative aspect-video bg-muted overflow-hidden rounded-lg">
      <img
        src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&auto=format&fit=crop"
        alt="Course preview"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-background/90 flex items-center justify-center cursor-pointer hover:bg-background transition-colors">
          <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-foreground border-b-[12px] border-b-transparent ml-1"></div>
        </div>
      </div>
    </div>
  );
};
