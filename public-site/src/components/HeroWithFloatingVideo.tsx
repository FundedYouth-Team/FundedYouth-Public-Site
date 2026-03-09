import { useState, ReactNode } from "react";
import { Hero } from "./Hero";
import { VideoCard } from "./VideoCard";
import { VideoPlayer } from "./VideoPlayer";
import { Card } from "./ui/card";

interface HeroWithFloatingVideoProps {
  youtubeVideoId?: string;
  mp4VideoFallback?: string;
  floatingVideoUrl?: string;
  floatingImageUrl?: string;
  floatingImageAlt?: string;
  videoThumbnailUrl?: string;
  playButtonColor?: string;
  children?: ReactNode;
}

export function HeroWithFloatingVideo({
  youtubeVideoId,
  mp4VideoFallback,
  floatingVideoUrl,
  floatingImageUrl,
  floatingImageAlt = "Featured image",
  videoThumbnailUrl,
  playButtonColor,
  children,
}: HeroWithFloatingVideoProps) {
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = useState(false);

  const floatingContent = floatingImageUrl ? "image" : floatingVideoUrl ? "video" : null;

  return (
    <>
      {/* Desktop: Relative positioning for overlap */}
      {/* Mobile/Tablet: Normal flex stack */}
      <div className="lg:relative">
        <Hero
          youtubeVideoId={youtubeVideoId}
          mp4VideoFallback={mp4VideoFallback}
        >
          {children}
        </Hero>

        {/* Floating Image */}
        {floatingContent === "image" && (
          <>
            {/* Mobile/Tablet: Full width, stacked */}
            <div className="lg:hidden">
              <Card className="relative overflow-hidden rounded-none shadow-2xl p-0">
                <div className="relative aspect-video">
                  <img
                    src={floatingImageUrl}
                    alt={floatingImageAlt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </Card>
            </div>

            {/* Desktop: Centered, rounded, overlapping */}
            <div className="hidden lg:block absolute left-1/2 bottom-0 z-20 w-full max-w-3xl -translate-x-1/2 translate-y-2/3 px-4">
              <Card className="relative overflow-hidden rounded-lg shadow-2xl p-0 transform transition-transform hover:scale-[1.02]">
                <div className="relative aspect-video">
                  <img
                    src={floatingImageUrl}
                    alt={floatingImageAlt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Floating Video Card */}
        {floatingContent === "video" && (
          <>
            {/* Mobile/Tablet: Full width, no rounded corners, stacked */}
            <div className="lg:hidden">
              <VideoCard
                videoUrl={floatingVideoUrl!}
                thumbnailUrl={videoThumbnailUrl}
                playButtonColor={playButtonColor}
                onPlayClick={() => setIsVideoPlayerOpen(true)}
                className="rounded-none"
              />
            </div>

            {/* Desktop: Centered, rounded, overlapping */}
            <div className="hidden lg:block absolute left-1/2 bottom-0 z-20 w-full max-w-3xl -translate-x-1/2 translate-y-2/3 px-4">
              <VideoCard
                videoUrl={floatingVideoUrl!}
                thumbnailUrl={videoThumbnailUrl}
                playButtonColor={playButtonColor}
                onPlayClick={() => setIsVideoPlayerOpen(true)}
                className="transform transition-transform hover:scale-[1.02]"
              />
            </div>
          </>
        )}
      </div>

      {/* Video Player Modal */}
      {floatingVideoUrl && (
        <VideoPlayer
          videoUrl={floatingVideoUrl}
          isOpen={isVideoPlayerOpen}
          onClose={() => setIsVideoPlayerOpen(false)}
        />
      )}
    </>
  );
}
