import { useState, useEffect } from "react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { AboutPage } from "./components/AboutPage";
import { HowItWorksPage } from "./components/HowItWorksPage";
import { AmbassadorsPage } from "./components/AmbassadorsPage";
import { BlogPage } from "./components/BlogPage";
import { ContactPage } from "./components/ContactPage";
import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
import { TermsOfServicePage } from "./components/TermsOfServicePage";
import { ScrollToTop } from "./components/ScrollToTop";
import { LoaderDemoPage } from "./components/LoaderDemoPage";
import { BlogListPage } from "./components/blog/BlogListPage";
import { BlogPostPage } from "./components/blog/BlogPostPage";
import { AdminLoginPage } from "./components/admin/AdminLoginPage";
import { AdminSidebar } from "./components/admin/AdminSidebar";
import { AdminDashboard } from "./components/admin/AdminDashboard";
import { AdminBlogList } from "./components/admin/AdminBlogList";
import { AdminNewPost } from "./components/admin/AdminNewPost";
import { AdminSettings } from "./components/admin/AdminSettings";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { BlogProvider, useBlog } from "./contexts/BlogContext";
import { Toaster } from "./components/ui/sonner";
import { IqraPayLoader } from "./components/IqraPayLoader";

function AppContent() {
  const [currentPage, setCurrentPage] = useState("home");
  const [darkMode, setDarkMode] = useState(false);
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { isAuthenticated, logout } = useAuth();
  const { posts } = useBlog();

  // Show loader on initial app load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 2000); // Show loader for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Hidden keyboard shortcut to access admin: Ctrl+Shift+A
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setCurrentPage('admin-login');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    setCurrentBlogSlug(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToBlogPost = (slug: string) => {
    setCurrentBlogSlug(slug);
    setCurrentPage('blog-post');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToBlog = () => {
    setCurrentBlogSlug(null);
    setCurrentPage('blog-list');
  };

  const handleLogout = () => {
    logout();
    setCurrentPage('home');
  };

  const handleLoginSuccess = () => {
    setCurrentPage('admin-dashboard');
  };

  const handleEditPost = (slug: string) => {
    setCurrentBlogSlug(slug);
    setCurrentPage('admin-edit-post');
  };

  // Check if current page is an admin page
  const isAdminPage = currentPage.startsWith('admin');
  const isLoginPage = currentPage === 'admin-login';

  const renderPage = () => {
    // Admin routes - require authentication
    if (isAdminPage) {
      if (!isAuthenticated) {
        return <AdminLoginPage onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate} />;
      }

      return (
        <div className="flex min-h-screen">
          <AdminSidebar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
          />
          <div className="flex-1 overflow-auto">
            {(() => {
              switch (currentPage) {
                case 'admin-dashboard':
                  return <AdminDashboard onNavigate={handleNavigate} />;
                case 'admin-blog':
                  return <AdminBlogList onNavigate={handleNavigate} onEditPost={handleEditPost} />;
                case 'admin-new-post':
                  return <AdminNewPost onNavigate={handleNavigate} />;
                case 'admin-edit-post':
                  const postToEdit = posts.find(p => p.slug === currentBlogSlug);
                  return postToEdit ? (
                    <AdminNewPost 
                      onNavigate={handleNavigate}
                      existingPost={postToEdit}
                    />
                  ) : (
                    <AdminNewPost onNavigate={handleNavigate} />
                  );
                case 'admin-settings':
                  return <AdminSettings />;
                default:
                  return <AdminDashboard onNavigate={handleNavigate} />;
              }
            })()}
          </div>
        </div>
      );
    }

    // Login page
    if (isLoginPage) {
      return <AdminLoginPage onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate} />;
    }

    // Public routes
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "about":
        return <AboutPage onNavigate={handleNavigate} />;
      case "how-it-works":
        return <HowItWorksPage onNavigate={handleNavigate} />;
      case "ambassadors":
        return <AmbassadorsPage onNavigate={handleNavigate} />;
      case "blog":
        return <BlogPage onNavigate={handleNavigate} />;
      case "blog-list":
        return <BlogListPage onNavigate={handleNavigate} onNavigateToPost={handleNavigateToBlogPost} />;
      case "blog-post":
        const currentPost = posts.find(p => p.slug === currentBlogSlug);
        return currentPost ? (
          <BlogPostPage post={currentPost} onNavigate={handleNavigate} onBack={handleBackToBlog} />
        ) : (
          <BlogListPage onNavigate={handleNavigate} onNavigateToPost={handleNavigateToBlogPost} />
        );
      case "contact":
        return <ContactPage darkMode={darkMode} onNavigate={handleNavigate} />;
      case "privacy-policy":
        return <PrivacyPolicyPage onNavigate={handleNavigate} />;
      case "terms-of-service":
        return <TermsOfServicePage onNavigate={handleNavigate} />;
      case "loader-demo":
        return <LoaderDemoPage darkMode={darkMode} onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  // Show loader on initial app load
  if (isInitialLoading) {
    return <IqraPayLoader darkMode={darkMode} message="Loading IqraPay" />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {!isAdminPage && !isLoginPage && (
        <Navigation
          currentPage={currentPage}
          onNavigate={handleNavigate}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
      <main>{renderPage()}</main>
      {!isAdminPage && !isLoginPage && <ScrollToTop />}
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <AppContent />
      </BlogProvider>
    </AuthProvider>
  );
}
