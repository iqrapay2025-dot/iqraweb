import { Save, User, Bell, Lock, Globe } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { toast } from 'sonner';
import { useAuth } from '../../contexts/AuthContext';

export function AdminSettings() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [commentNotifications, setCommentNotifications] = useState(true);

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl mb-1 sm:mb-2">Settings</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your account and preferences
          </p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Profile Settings */}
          <Card className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              <h2 className="text-lg sm:text-xl lg:text-2xl">Profile Settings</h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm sm:text-base">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm sm:text-base">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm sm:text-base"
                />
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              <h2 className="text-lg sm:text-xl lg:text-2xl">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base">Email Notifications</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Receive email updates about new comments and activities
                  </p>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                  className="shrink-0"
                />
              </div>

              <Separator />

              <div className="flex items-start sm:items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base">Comment Notifications</p>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Get notified when someone comments on your posts
                  </p>
                </div>
                <Switch
                  checked={commentNotifications}
                  onCheckedChange={setCommentNotifications}
                  className="shrink-0"
                />
              </div>
            </div>
          </Card>

          {/* Security */}
          <Card className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              <h2 className="text-lg sm:text-xl lg:text-2xl">Security</h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-sm sm:text-base">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  placeholder="••••••••"
                  className="text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm sm:text-base">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  className="text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm sm:text-base">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className="text-sm sm:text-base"
                />
              </div>
            </div>
          </Card>

          {/* Site Settings */}
          <Card className="p-4 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
              <h2 className="text-lg sm:text-xl lg:text-2xl">Site Settings</h2>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName" className="text-sm sm:text-base">Site Name</Label>
                <Input
                  id="siteName"
                  type="text"
                  defaultValue="IqraPay Blog"
                  className="text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription" className="text-sm sm:text-base">Site Description</Label>
                <Input
                  id="siteDescription"
                  type="text"
                  defaultValue="Learn the Deen. Earn for the Dunyā."
                  className="text-sm sm:text-base"
                />
              </div>
            </div>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleSave}
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
