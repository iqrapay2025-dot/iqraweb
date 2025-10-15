import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Award, Users } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Ambassador } from '../data/mockAmbassadors';
import { IslamicAvatar } from './IslamicAvatar';

interface AmbassadorCarouselProps {
  ambassadors: Ambassador[];
}

export function AmbassadorCarousel({ ambassadors }: AmbassadorCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, ambassadors.length - itemsPerView);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const visibleAmbassadors = ambassadors.slice(
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
          {visibleAmbassadors.map((ambassador) => (
            <div
              key={ambassador.id}
              className="flex-shrink-0"
              style={{ width: `calc((100% - ${(itemsPerView - 1) * 1.5}rem) / ${itemsPerView})` }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {/* Avatar Section */}
                <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                  {/* Islamic Avatar fills entire container */}
                  <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105">
                    <IslamicAvatar 
                      name={ambassador.name} 
                      size="xl"
                    />
                  </div>
                  
                  {/* Badge Overlay */}
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-primary text-primary-foreground">
                      {ambassador.title}
                    </Badge>
                  </div>

                  {/* Stats Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="flex items-center gap-2 text-foreground text-sm bg-background/80 backdrop-blur-sm px-3 py-2 rounded-lg">
                      <Users className="h-4 w-4 text-primary" />
                      <span>{ambassador.referrals} referrals</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl mb-2">{ambassador.name}</h3>
                  
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{ambassador.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Award className="h-4 w-4 text-primary" />
                    <span>Member since {new Date(ambassador.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      {ambassadors.length > itemsPerView && (
        <>
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-background shadow-lg hover:bg-primary hover:text-primary-foreground z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-12 w-12 rounded-full bg-background shadow-lg hover:bg-primary hover:text-primary-foreground z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Dots Indicator */}
      {ambassadors.length > itemsPerView && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-primary'
                  : 'w-2 bg-border hover:bg-primary/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
