import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Briefcase } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { IslamicAvatar } from './IslamicAvatar';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  location: string;
  description: string;
}

interface TeamCarouselProps {
  teamMembers: TeamMember[];
}

export function TeamCarousel({ teamMembers }: TeamCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(4);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 768) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, teamMembers.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const visibleTeamMembers = teamMembers.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, maxIndex]);

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <div className="flex gap-6 transition-all duration-500">
          {visibleTeamMembers.map((member) => (
            <div
              key={member.id}
              className="flex-shrink-0"
              style={{ width: `calc((100% - ${(itemsPerView - 1) * 1.5}rem) / ${itemsPerView})` }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                {/* Avatar Section */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                  <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105">
                    <IslamicAvatar 
                      name={member.name} 
                      size="xl"
                    />
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl mb-2">{member.name}</h3>
                  
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Briefcase className="h-4 w-4" />
                    <span className="text-sm">{member.role}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{member.location}</span>
                  </div>
                  
                  <p className="text-muted-foreground text-sm flex-1">
                    {member.description}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {teamMembers.length > itemsPerView && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full bg-background shadow-lg hover:shadow-xl transition-all z-10"
            aria-label="Previous team member"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full bg-background shadow-lg hover:shadow-xl transition-all z-10"
            aria-label="Next team member"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {teamMembers.length > itemsPerView && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index
                  ? 'bg-primary w-8'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
