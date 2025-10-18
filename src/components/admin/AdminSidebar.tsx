import { LayoutDashboard, FileText, PlusCircle, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../contexts/AuthContext';
import logoLight from "figma:asset/39ba4a0dd03e9a935003109f9573af3b0b10ff85.png";

interface AdminSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  onClose?: () => void; // Optional callback to close mobile menu
}

export function AdminSidebar({ currentPage, onNavigate, onLogout, onClose }: AdminSidebarProps) {
  const { user } = useAuth();

  const menuItems = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admin-blog', label: 'All Posts', icon: FileText },
    { id: 'admin-new-post', label: 'New Post', icon: PlusCircle },
    { id: 'admin-settings', label: 'Settings', icon: Settings },
  ];

  const handleNavigation = (page: string) => {
    onNavigate(page);
    // Close mobile menu when navigating
    if (onClose) {
      onClose();
    }
  };

  const handleLogoutClick = () => {
    onLogout();
    // Close mobile menu when logging out
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className="w-full lg:w-64 bg-card border-r border-border h-full lg:h-screen lg:sticky lg:top-0 flex flex-col">
      {/* Logo */}
      <div className="p-4 sm:p-6 border-b border-border">
        <img
          src={logoLight}
          alt="IqraPay"
          className="h-7 sm:h-8 w-auto cursor-pointer"
          onClick={() => handleNavigation('home')}
        />
        <p className="text-xs sm:text-sm text-muted-foreground mt-2">Admin Portal</p>
      </div>

      {/* User Info */}
      <div className="p-4 sm:p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shrink-0">
            <span className="text-sm sm:text-base">{user?.name.charAt(0)}</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm truncate">{user?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-3 sm:p-4 overflow-y-auto">
        <ul className="space-y-1 sm:space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all text-sm sm:text-base ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-3 sm:p-4 border-t border-border">
        <Button
          variant="ghost"
          className="w-full justify-start text-destructive hover:bg-destructive/10 text-sm sm:text-base"
          onClick={handleLogoutClick}
        >
          <LogOut className="h-4 w-4 sm:h-5 sm:w-5 mr-3 shrink-0" />
          <span className="truncate">Logout</span>
        </Button>
      </div>
    </aside>
  );
}
