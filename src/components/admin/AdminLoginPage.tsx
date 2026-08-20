import { useState, useRef } from 'react';
import { Lock, Mail } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { IslamicPattern } from '../IslamicPattern';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';
import logoLight from "figma:asset/39ba4a0dd03e9a935003109f9573af3b0b10ff85.png";

// Client-side brute-force guard. This app has no backend, so the login check
// runs in the browser; we still slow down automated guessers by locking the
// form for a short window after repeated failures.
const MAX_ATTEMPTS = 5;
const LOCK_DURATION_MS = 60_000;

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onNavigate: (page: string) => void;
}

export function AdminLoginPage({ onLoginSuccess, onNavigate }: AdminLoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const failedAttempts = useRef(0);
  const [lockUntil, setLockUntil] = useState(0);
  const locked = Date.now() < lockUntil;
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (locked) return;

    setIsLoading(true);

    try {
      // Constant small delay: slows automated guessing and evens out response
      // timing between valid and invalid attempts.
      await new Promise((resolve) => setTimeout(resolve, 350));
      const success = await login(email, password);
      if (success) {
        failedAttempts.current = 0;
        toast.success('Welcome back!');
        onLoginSuccess();
      } else {
        failedAttempts.current += 1;
        if (failedAttempts.current >= MAX_ATTEMPTS) {
          failedAttempts.current = 0;
          setLockUntil(Date.now() + LOCK_DURATION_MS);
          toast.error(
            `Too many failed attempts. Please wait ${LOCK_DURATION_MS / 1000}s and try again.`
          );
        } else {
          toast.error('Invalid email or password. Please try again.');
        }
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="relative w-full">
        <IslamicPattern opacity={0.03} />
        
        <div className="relative max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <img
              src={logoLight}
              alt="IqraPay"
              className="h-12 w-auto mx-auto mb-4 cursor-pointer"
              onClick={() => onNavigate('home')}
            />
            <h1 className="text-3xl mb-2">Admin Portal</h1>
            <p className="text-muted-foreground">
              Sign in to manage your content
            </p>
          </div>

          {/* Login Card */}
          <Card className="p-8 border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@iqrapay.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading || locked}
              >
                {locked
                  ? `Locked — try again shortly`
                  : isLoading
                  ? 'Signing in...'
                  : 'Sign In'}
              </Button>
            </form>
          </Card>

          {/* Back to Home */}
          <div className="text-center mt-6">
            <Button
              variant="ghost"
              onClick={() => onNavigate('home')}
              className="text-muted-foreground"
            >
              ← Back to Homepage
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
