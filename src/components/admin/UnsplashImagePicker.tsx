import { useState } from 'react';
import { Search, ImageIcon, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface UnsplashImagePickerProps {
  onSelectImage: (url: string) => void;
  currentImage?: string;
}

export function UnsplashImagePicker({ onSelectImage, currentImage }: UnsplashImagePickerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const presetSearches = [
    { label: 'Quran & Islamic Book', query: 'quran book islamic' },
    { label: 'Islamic Mosque', query: 'mosque islamic architecture' },
    { label: 'Islamic Pattern', query: 'islamic geometric pattern' },
    { label: 'Islamic Calligraphy', query: 'arabic calligraphy islamic' },
    { label: 'Prayer & Worship', query: 'muslim prayer worship' },
    { label: 'Islamic Architecture', query: 'islamic architecture design' },
  ];

  const handlePresetClick = async (preset: { label: string; query: string }) => {
    setSelectedPreset(preset.query);
    // In a real implementation, you would call the Unsplash API here
    // For now, we'll provide instructions on how to get the image URL
  };

  const handleCustomSearch = () => {
    if (!searchQuery.trim()) return;
    setSelectedPreset(searchQuery);
  };

  const getUnsplashInstructions = () => {
    const query = selectedPreset || 'islamic quran';
    return `https://unsplash.com/s/photos/${encodeURIComponent(query)}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button type="button" variant="outline" size="sm" className="flex-1 sm:flex-initial">
          <ImageIcon className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
          <span className="hidden sm:inline">Browse Unsplash Images</span>
          <span className="sm:hidden">Unsplash</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95vw] sm:max-w-2xl lg:max-w-3xl max-h-[85vh] sm:max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Find Islamic-Themed Images</DialogTitle>
          <DialogDescription className="text-sm">
            Browse and select Shariah-compliant images from Unsplash for your blog post.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6">
          {/* Quick Presets */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-sm sm:text-base">Quick Islamic Image Presets:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {presetSearches.map((preset) => (
                <Button
                  key={preset.query}
                  type="button"
                  variant={selectedPreset === preset.query ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handlePresetClick(preset)}
                  className="justify-start text-xs sm:text-sm h-9 sm:h-10"
                >
                  {selectedPreset === preset.query && (
                    <CheckCircle2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 shrink-0" />
                  )}
                  <span className="truncate">{preset.label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Search */}
          <div className="space-y-2">
            <h3 className="text-sm sm:text-base">Or Search Custom Term:</h3>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="e.g., islamic art, ramadan, hajj..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleCustomSearch()}
                className="text-sm sm:text-base"
              />
              <Button type="button" onClick={handleCustomSearch} className="sm:shrink-0">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Instructions */}
          {selectedPreset && (
            <Card className="p-3 sm:p-4 space-y-2 sm:space-y-3 bg-primary/5">
              <h3 className="flex items-center gap-2 text-sm sm:text-base">
                <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
                How to Get Your Image URL:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm">
                <li>
                  Click the button below to open Unsplash with your search:
                  <div className="mt-2">
                    <Button
                      type="button"
                      variant="default"
                      asChild
                      className="w-full bg-primary text-sm sm:text-base"
                    >
                      <a
                        href={getUnsplashInstructions()}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Unsplash Search
                      </a>
                    </Button>
                  </div>
                </li>
                <li className="mt-3">
                  Find an image you like and click on it to open
                </li>
                <li>
                  Right-click on the image and select <strong>"Copy Image Address"</strong> or <strong>"Copy Image Link"</strong>
                </li>
                <li>
                  Paste the copied URL into the Featured Image URL field
                </li>
                <li>
                  Click the <strong>"Test"</strong> button to verify the image loads correctly
                </li>
              </ol>

              <div className="bg-background p-2 sm:p-3 rounded border mt-3 sm:mt-4">
                <p className="text-xs text-muted-foreground">
                  <strong>💡 Pro Tip:</strong> Unsplash URLs look like this:<br />
                  <code className="text-xs bg-muted px-1.5 sm:px-2 py-0.5 sm:py-1 rounded mt-1 inline-block break-all">
                    https://images.unsplash.com/photo-xxxxx...
                  </code>
                </p>
              </div>
            </Card>
          )}

          {/* Alternative Method */}
          <Card className="p-3 sm:p-4 bg-muted/50">
            <h3 className="mb-2 flex items-center gap-2 text-sm sm:text-base">
              <ImageIcon className="h-4 w-4 shrink-0" />
              Alternative: Use Default Islamic Image
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-3">
              If you prefer a quick option, use this Shariah-compliant default image:
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                onSelectImage('https://images.unsplash.com/photo-1623458696277-a6f4bcd06c2f?w=1080');
                setIsOpen(false);
              }}
              className="w-full text-sm"
            >
              Use Default Islamic Image
            </Button>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
