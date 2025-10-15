import { useState } from 'react';
import { IqraPayLoader, MiniIqraPayLoader, SpinnerLoader } from './IqraPayLoader';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface LoaderDemoPageProps {
  onNavigate?: (page: string) => void;
  darkMode?: boolean;
}

export function LoaderDemoPage({ onNavigate, darkMode = false }: LoaderDemoPageProps) {
  const [showFullLoader, setShowFullLoader] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  const handleTestFullLoader = () => {
    setShowFullLoader(true);
    setTimeout(() => setShowFullLoader(false), 3000);
  };

  const handleTestButtonLoader = () => {
    setIsButtonLoading(true);
    setTimeout(() => setIsButtonLoading(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {showFullLoader && <IqraPayLoader darkMode={darkMode} message="Testing Full Loader" />}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl mb-4">IqraPay Loader Demo</h1>
          <p className="text-xl text-muted-foreground">
            Test all three loader variants
          </p>
        </div>

        <div className="space-y-8">
          {/* Full Screen Loader Demo */}
          <Card className="p-8">
            <h2 className="text-2xl mb-4">1. Full Screen Loader</h2>
            <p className="text-muted-foreground mb-4">
              Used for initial page loads or major loading states. Covers the entire screen.
            </p>
            <Button onClick={handleTestFullLoader}>
              Show Full Screen Loader (3 seconds)
            </Button>
          </Card>

          {/* Mini Loader Demo */}
          <Card className="p-8">
            <h2 className="text-2xl mb-4">2. Mini Loader</h2>
            <p className="text-muted-foreground mb-4">
              Used for in-component loading states. Compact and non-intrusive.
            </p>
            <div className="flex items-center justify-center p-8 bg-muted/30 rounded-lg">
              <MiniIqraPayLoader darkMode={darkMode} />
            </div>
          </Card>

          {/* Spinner Loader Demo */}
          <Card className="p-8">
            <h2 className="text-2xl mb-4">3. Button Spinner</h2>
            <p className="text-muted-foreground mb-4">
              Used for button loading states. Perfect for form submissions.
            </p>
            <Button onClick={handleTestButtonLoader} disabled={isButtonLoading}>
              {isButtonLoading ? (
                <>
                  <SpinnerLoader className="mr-2" />
                  Loading...
                </>
              ) : (
                'Test Button Loader (2 seconds)'
              )}
            </Button>
          </Card>

          {/* Code Examples */}
          <Card className="p-8 bg-muted/50">
            <h2 className="text-2xl mb-4">Usage Examples</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-bold mb-2">Full Screen Loader:</h3>
                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm">
{`import { IqraPayLoader } from './components/IqraPayLoader';

{isLoading && (
  <IqraPayLoader 
    darkMode={darkMode} 
    message="Loading IqraPay" 
  />
)}`}
                </pre>
              </div>

              <div>
                <h3 className="font-bold mb-2">Mini Loader:</h3>
                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm">
{`import { MiniIqraPayLoader } from './components/IqraPayLoader';

{isLoading ? (
  <MiniIqraPayLoader darkMode={darkMode} />
) : (
  <div>Content here</div>
)}`}
                </pre>
              </div>

              <div>
                <h3 className="font-bold mb-2">Button Spinner:</h3>
                <pre className="bg-background p-4 rounded-lg overflow-x-auto text-sm">
{`import { SpinnerLoader } from './components/IqraPayLoader';

<Button disabled={isSubmitting}>
  {isSubmitting ? (
    <>
      <SpinnerLoader className="mr-2" />
      Submitting...
    </>
  ) : (
    'Submit'
  )}
</Button>`}
                </pre>
              </div>
            </div>
          </Card>

          {/* Back Button */}
          <div className="text-center pt-8">
            <Button 
              variant="outline" 
              onClick={() => onNavigate?.('home')}
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
