// import { useState, useEffect } from "react";
// import { Navigation } from "./components/Navigation";
// import { HomePage } from "./components/HomePage";
// import { AboutPage } from "./components/AboutPage";
// import { HowItWorksPage } from "./components/HowItWorksPage";
// import { AmbassadorsPage } from "./components/AmbassadorsPage";
// import { BlogPage } from "./components/BlogPage";
// import { ContactPage } from "./components/ContactPage";
// import { PrivacyPolicyPage } from "./components/PrivacyPolicyPage";
// import { TermsOfServicePage } from "./components/TermsOfServicePage";
// import { ScrollToTop } from "./components/ScrollToTop";
// import { LoaderDemoPage } from "./components/LoaderDemoPage";
// import { BlogListPage } from "./components/blog/BlogListPage";
// import { BlogPostPage } from "./components/blog/BlogPostPage";
// import { AdminLoginPage } from "./components/admin/AdminLoginPage";
// import { AdminSidebar } from "./components/admin/AdminSidebar";
// import { AdminDashboard } from "./components/admin/AdminDashboard";
// import { AdminBlogList } from "./components/admin/AdminBlogList";
// import { AdminNewPost } from "./components/admin/AdminNewPost";
// import { AdminSettings } from "./components/admin/AdminSettings";
// import { AuthProvider, useAuth } from "./contexts/AuthContext";
// import { BlogProvider, useBlog } from "./contexts/BlogContext";
// import { LanguageProvider } from "./contexts/LanguageContext";
// import { Toaster } from "./components/ui/sonner";
// import { IqraPayLoader } from "./components/IqraPayLoader";
// import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "./components/ui/sheet";
// import { Button } from "./components/ui/button";
// import { Menu } from "lucide-react";

// function AppContent() {
//   const [currentPage, setCurrentPage] = useState(() => {
//     // Initialize from URL hash or default to home
//     const hash = window.location.hash.slice(1) || 'home';
//     return hash;
//   });
//   const [darkMode, setDarkMode] = useState(false);
//   const [currentBlogSlug, setCurrentBlogSlug] = useState<string | null>(null);
//   const [isInitialLoading, setIsInitialLoading] = useState(true);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { isAuthenticated, logout } = useAuth();
//   const { posts } = useBlog();

//   // Show loader on initial app load
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsInitialLoading(false);
//     }, 2000); // Show loader for 2 seconds

//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   // Handle browser back/forward buttons
//   useEffect(() => {
//     const handlePopState = () => {
//       const hash = window.location.hash.slice(1) || 'home';

//       // Check if it's a blog post URL (format: blog-post/slug)
//       if (hash.startsWith('blog-post/')) {
//         const slug = hash.split('/')[1];
//         setCurrentPage('blog-post');
//         setCurrentBlogSlug(slug);
//       } else {
//         setCurrentPage(hash);
//         setCurrentBlogSlug(null);
//       }
//     };

//     window.addEventListener('popstate', handlePopState);
//     return () => window.removeEventListener('popstate', handlePopState);
//   }, []);

//   // Hidden keyboard shortcut to access admin: Ctrl+Shift+A
//   useEffect(() => {
//     const handleKeyPress = (e: KeyboardEvent) => {
//       if (e.ctrlKey && e.shiftKey && e.key === 'A') {
//         e.preventDefault();
//         handleNavigate('admin-login');
//       }
//     };

//     window.addEventListener('keydown', handleKeyPress);
//     return () => window.removeEventListener('keydown', handleKeyPress);
//   }, []);

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };

//   const handleNavigate = (page: string) => {
//     // Update browser history
//     window.history.pushState({ page }, '', `#${page}`);
//     setCurrentPage(page);
//     setCurrentBlogSlug(null);
//     setMobileMenuOpen(false); // Close mobile menu when navigating
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleNavigateToBlogPost = (slug: string) => {
//     // Update browser history with blog post slug
//     window.history.pushState({ page: 'blog-post', slug }, '', `#blog-post/${slug}`);
//     setCurrentBlogSlug(slug);
//     setCurrentPage('blog-post');
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handleBackToBlog = () => {
//     // Update browser history
//     window.history.pushState({ page: 'blog-list' }, '', '#blog-list');
//     setCurrentBlogSlug(null);
//     setCurrentPage('blog-list');
//   };

//   const handleLogout = () => {
//     logout();
//     // Update browser history
//     window.history.pushState({ page: 'home' }, '', '#home');
//     setCurrentPage('home');
//   };

//   const handleLoginSuccess = () => {
//     setCurrentPage('admin-dashboard');
//   };

//   const handleEditPost = (slug: string) => {
//     setCurrentBlogSlug(slug);
//     setCurrentPage('admin-edit-post');
//   };

//   // Check if current page is an admin page
//   const isAdminPage = currentPage.startsWith('admin');
//   const isLoginPage = currentPage === 'admin-login';

//   const renderPage = () => {
//     // Admin routes - require authentication
//     if (isAdminPage) {
//       if (!isAuthenticated) {
//         return <AdminLoginPage onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate} />;
//       }

//       return (
//         //
//         <div className="flex min-h-screen bg-background">
//           {/* Desktop Sidebar - Hidden on mobile */}
//           {/* hidden lg:block lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-64 lg:z-10 */}
//           <div className="hidden lg:block lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-64 lg:z-10">
//             <AdminSidebar
//               currentPage={currentPage}
//               onNavigate={handleNavigate}
//               onLogout={handleLogout}
//               isMobile={false}
//             />
//           </div>

//           {/* Mobile Header with Menu Button */}
//           <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-card border-b border-border">
//             <div className="flex items-center justify-between p-4">
//               <div className="flex items-center gap-3">
//                 <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
//                   <SheetTrigger asChild>
//                     <Button variant="ghost" size="icon" className="lg:hidden">
//                       <Menu className="h-5 w-5" />
//                     </Button>
//                   </SheetTrigger>
//                   <SheetContent
//                     side="left"
//                     className="p-0 w-[280px] sm:w-[320px] gap-0"
//                   >
//                     <SheetTitle className="sr-only">
//                       Admin Navigation Menu
//                     </SheetTitle>
//                     <SheetDescription className="sr-only">
//                       Navigate through admin panel pages including Dashboard,
//                       Blog Posts, Settings, and more.
//                     </SheetDescription>
//                     <AdminSidebar
//                       currentPage={currentPage}
//                       onNavigate={handleNavigate}
//                       onLogout={handleLogout}
//                       onClose={() => setMobileMenuOpen(false)}
//                     />
//                   </SheetContent>
//                 </Sheet>
//                 <h1 className="text-lg font-medium">Admin Portal</h1>
//               </div>
//             </div>
//           </div>

//           {/* Main Content Area */}
//           <div className="flex-1 overflow-auto lg:overflow-visible lg:ml-64">
//             {/* Add top padding on mobile to account for fixed header */}
//             <div className="lg:pt-0 pt-[57px]">
//               {(() => {
//                 switch (currentPage) {
//                   case "admin-dashboard":
//                     return <AdminDashboard onNavigate={handleNavigate} />;
//                   case "admin-blog":
//                     return (
//                       <AdminBlogList
//                         onNavigate={handleNavigate}
//                         onEditPost={handleEditPost}
//                       />
//                     );
//                   case "admin-new-post":
//                     return <AdminNewPost onNavigate={handleNavigate} />;
//                   case "admin-edit-post":
//                     const postToEdit = posts.find(
//                       (p) => p.slug === currentBlogSlug
//                     );
//                     return postToEdit ? (
//                       <AdminNewPost
//                         onNavigate={handleNavigate}
//                         existingPost={postToEdit}
//                       />
//                     ) : (
//                       <AdminNewPost onNavigate={handleNavigate} />
//                     );
//                   case "admin-settings":
//                     return <AdminSettings />;
//                   default:
//                     return <AdminDashboard onNavigate={handleNavigate} />;
//                 }
//               })()}
//             </div>
//           </div>
//         </div>
//       );
//     }

//     // Login page
//     if (isLoginPage) {
//       return <AdminLoginPage onLoginSuccess={handleLoginSuccess} onNavigate={handleNavigate} />;
//     }

//     // Public routes
//     switch (currentPage) {
//       case "home":
//         return <HomePage onNavigate={handleNavigate} />;
//       case "about":
//         return <AboutPage onNavigate={handleNavigate} />;
//       case "how-it-works":
//         return <HowItWorksPage onNavigate={handleNavigate} />;
//       case "ambassadors":
//         return <AmbassadorsPage onNavigate={handleNavigate} />;
//       case "blog":
//         return <BlogPage onNavigate={handleNavigate} />;
//       case "blog-list":
//         return <BlogListPage onNavigate={handleNavigate} onNavigateToPost={handleNavigateToBlogPost} />;
//       case "blog-post":
//         const currentPost = posts.find(p => p.slug === currentBlogSlug);
//         return currentPost ? (
//           <BlogPostPage post={currentPost} onNavigate={handleNavigate} onBack={handleBackToBlog} />
//         ) : (
//           <BlogListPage onNavigate={handleNavigate} onNavigateToPost={handleNavigateToBlogPost} />
//         );
//       case "contact":
//         return <ContactPage darkMode={darkMode} onNavigate={handleNavigate} />;
//       case "privacy-policy":
//         return <PrivacyPolicyPage onNavigate={handleNavigate} />;
//       case "terms-of-service":
//         return <TermsOfServicePage onNavigate={handleNavigate} />;
//       case "loader-demo":
//         return <LoaderDemoPage darkMode={darkMode} onNavigate={handleNavigate} />;
//       default:
//         return <HomePage onNavigate={handleNavigate} />;
//     }
//   };

//   // Show loader on initial app load
//   if (isInitialLoading) {
//     return <IqraPayLoader darkMode={darkMode} message="Loading IqraPay" />;
//   }

//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       {!isAdminPage && !isLoginPage && (
//         <Navigation
//           currentPage={currentPage}
//           onNavigate={handleNavigate}
//           darkMode={darkMode}
//           toggleDarkMode={toggleDarkMode}
//         />
//       )}
//       <main>{renderPage()}</main>
//       {!isAdminPage && !isLoginPage && <ScrollToTop />}
//       <Toaster />
//     </div>
//   );
// }

// export default function App() {
//   return (
//     <LanguageProvider>
//       <AuthProvider>
//         <BlogProvider>
//           <AppContent />
//         </BlogProvider>
//       </AuthProvider>
//     </LanguageProvider>
//   );
// }
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
import { LanguageProvider } from "./contexts/LanguageContext";
import { Toaster } from "./components/ui/sonner";
import { IqraPayLoader } from "./components/IqraPayLoader";
import { Button } from "./components/ui/button";
import { Menu } from "lucide-react";

function AppContent() {
  const [currentPage, setCurrentPage] = useState(() => {
    // Initialize from URL hash or default to home
    const hash = window.location.hash.slice(1) || "home";
    return hash;
  });
  const [darkMode, setDarkMode] = useState(false);
  const [currentBlogSlug, setCurrentBlogSlug] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.slice(1) || "home";

      // Check if it's a blog post URL (format: blog-post/slug)
      if (hash.startsWith("blog-post/")) {
        const slug = hash.split("/")[1];
        setCurrentPage("blog-post");
        setCurrentBlogSlug(slug);
      } else {
        setCurrentPage(hash);
        setCurrentBlogSlug(null);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Hidden keyboard shortcut to access admin: Ctrl+Shift+A
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        e.preventDefault();
        handleNavigate("admin-login");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleNavigate = (page: string) => {
    // Update browser history
    window.history.pushState({ page }, "", `#${page}`);
    setCurrentPage(page);
    setCurrentBlogSlug(null);
    setMobileMenuOpen(false); // Close mobile menu when navigating
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToBlogPost = (slug: string) => {
    // Update browser history with blog post slug
    window.history.pushState(
      { page: "blog-post", slug },
      "",
      `#blog-post/${slug}`
    );
    setCurrentBlogSlug(slug);
    setCurrentPage("blog-post");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToBlog = () => {
    // Update browser history
    window.history.pushState({ page: "blog-list" }, "", "#blog-list");
    setCurrentBlogSlug(null);
    setCurrentPage("blog-list");
  };

  const handleLogout = () => {
    logout();
    // Update browser history
    window.history.pushState({ page: "home" }, "", "#home");
    setCurrentPage("home");
  };

  const handleLoginSuccess = () => {
    setCurrentPage("admin-dashboard");
  };

  const handleEditPost = (slug: string) => {
    setCurrentBlogSlug(slug);
    setCurrentPage("admin-edit-post");
  };

  // Check if current page is an admin page
  const isAdminPage = currentPage.startsWith("admin");
  const isLoginPage = currentPage === "admin-login";

  const renderPage = () => {
    // Admin routes - require authentication
    if (isAdminPage) {
      if (!isAuthenticated) {
        return (
          <AdminLoginPage
            onLoginSuccess={handleLoginSuccess}
            onNavigate={handleNavigate}
          />
        );
      }

      return (
        <div className="flex min-h-screen bg-background">
          {/* Desktop Sidebar - Fixed and visible on large screens */}
          <div className="hidden lg:block lg:w-64 lg:fixed lg:inset-y-0 lg:left-0 lg:z-30">
            <AdminSidebar
              currentPage={currentPage}
              onNavigate={handleNavigate}
              onLogout={handleLogout}
              isMobile={false}
            />
          </div>

          {/* Mobile Header with Menu Button */}
          <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-card border-b border-border">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="text-lg font-medium">Admin Portal</h1>
              </div>
            </div>
          </div>

          {/* Mobile Sidebar Overlay */}
          {mobileMenuOpen && (
            <>
              {/* Backdrop/Overlay */}
              <div
                className="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                onClick={() => setMobileMenuOpen(false)}
              />

              {/* Sidebar Drawer */}
              <div className="lg:hidden fixed inset-y-0 left-0 z-50 w-[280px] sm:w-[320px]">
                <AdminSidebar
                  currentPage={currentPage}
                  onNavigate={handleNavigate}
                  onLogout={handleLogout}
                  onClose={() => setMobileMenuOpen(false)}
                  isMobile={true}
                />
              </div>
            </>
          )}

          {/* Main Content Area */}
          <div className="flex-1 lg:ml-64">
            {/* Add top padding on mobile to account for fixed header */}
            <div className="lg:pt-0 pt-[57px]">
              {(() => {
                switch (currentPage) {
                  case "admin-dashboard":
                    return <AdminDashboard onNavigate={handleNavigate} />;
                  case "admin-blog":
                    return (
                      <AdminBlogList
                        onNavigate={handleNavigate}
                        onEditPost={handleEditPost}
                      />
                    );
                  case "admin-new-post":
                    return <AdminNewPost onNavigate={handleNavigate} />;
                  case "admin-edit-post":
                    const postToEdit = posts.find(
                      (p) => p.slug === currentBlogSlug
                    );
                    return postToEdit ? (
                      <AdminNewPost
                        onNavigate={handleNavigate}
                        existingPost={postToEdit}
                      />
                    ) : (
                      <AdminNewPost onNavigate={handleNavigate} />
                    );
                  case "admin-settings":
                    return <AdminSettings />;
                  default:
                    return <AdminDashboard onNavigate={handleNavigate} />;
                }
              })()}
            </div>
          </div>
        </div>
      );
    }

    // Login page
    if (isLoginPage) {
      return (
        <AdminLoginPage
          onLoginSuccess={handleLoginSuccess}
          onNavigate={handleNavigate}
        />
      );
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
        return (
          <BlogListPage
            onNavigate={handleNavigate}
            onNavigateToPost={handleNavigateToBlogPost}
          />
        );
      case "blog-post":
        const currentPost = posts.find((p) => p.slug === currentBlogSlug);
        return currentPost ? (
          <BlogPostPage
            post={currentPost}
            onNavigate={handleNavigate}
            onBack={handleBackToBlog}
          />
        ) : (
          <BlogListPage
            onNavigate={handleNavigate}
            onNavigateToPost={handleNavigateToBlogPost}
          />
        );
      case "contact":
        return <ContactPage darkMode={darkMode} onNavigate={handleNavigate} />;
      case "privacy-policy":
        return <PrivacyPolicyPage onNavigate={handleNavigate} />;
      case "terms-of-service":
        return <TermsOfServicePage onNavigate={handleNavigate} />;
      case "loader-demo":
        return (
          <LoaderDemoPage darkMode={darkMode} onNavigate={handleNavigate} />
        );
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
    <LanguageProvider>
      <AuthProvider>
        <BlogProvider>
          <AppContent />
        </BlogProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
