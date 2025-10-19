import { FileText, Eye, TrendingUp, Users, Database, Trash2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useBlog } from '../../contexts/BlogContext';
import { toast } from 'sonner';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
  const { posts } = useBlog();

  const checkLocalStorage = () => {
    try {
      const stored = localStorage.getItem('iqrapay_blog_posts');
      if (stored) {
        const parsed = JSON.parse(stored);
        toast.success(`✅ localStorage has ${parsed.length} posts stored`);
        console.log('📦 localStorage data:', parsed);
      } else {
        toast.error('❌ No data found in localStorage');
      }
    } catch (error) {
      toast.error('❌ Error reading localStorage');
      console.error(error);
    }
  };

  const clearLocalStorage = () => {
    if (confirm('Are you sure you want to clear all blog data? This will reload the mock posts.')) {
      localStorage.removeItem('iqrapay_blog_posts');
      toast.success('🗑️ localStorage cleared. Please refresh the page.');
    }
  };

  const stats = [
    {
      label: 'Total Posts',
      value: posts.length,
      icon: FileText,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Published',
      value: posts.filter(p => p.status === 'published').length,
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-600/10',
    },
    {
      label: 'Draft',
      value: posts.filter(p => p.status === 'draft').length,
      icon: FileText,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-600/10',
    },
    {
      label: 'Total Views',
      value: '12.5K',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-600/10',
    },
  ];

  const recentPosts = posts.slice(0, 5);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl mb-1 sm:mb-2">Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Welcome back! Here's an overview of your blog
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-4 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                    {stat.label}
                  </p>
                  <p className="text-2xl sm:text-3xl">{stat.value}</p>
                </div>
                <div
                  className={`${stat.bgColor} ${stat.color} p-2 sm:p-3 rounded-lg`}
                >
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Posts */}
      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl">Recent Posts</h2>
          <button
            onClick={() => onNavigate("admin-blog")}
            className="text-sm sm:text-base text-primary hover:underline"
          >
            View All
          </button>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 sm:p-4 rounded-lg border border-border hover:bg-muted cursor-pointer transition-colors"
              onClick={() => onNavigate("admin-blog")}
            >
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-14 w-14 sm:h-16 sm:w-16 rounded-lg object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="mb-1 line-clamp-2 sm:line-clamp-1 text-sm sm:text-base break-words">
                    {post.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                    <span>{post.category}</span>
                    <span className="hidden sm:inline">•</span>
                    <span>
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="self-start sm:self-auto">
                <span
                  className={`flex px-2.5 sm:px-3 py-1 rounded-full text-xs ${
                    post.status === "published"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {post.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <Card
          className="p-4 sm:p-6 cursor-pointer hover:border-primary transition-colors"
          onClick={() => onNavigate("admin-new-post")}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-primary/10 text-primary p-3 sm:p-4 rounded-lg shrink-0">
              <FileText className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div className="min-w-0">
              <h3 className="mb-1 text-sm sm:text-base">Create New Post</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Start writing a new article
              </p>
            </div>
          </div>
        </Card>

        <Card
          className="p-4 sm:p-6 cursor-pointer hover:border-primary transition-colors"
          onClick={() => onNavigate("admin-blog")}
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-primary/10 text-primary p-3 sm:p-4 rounded-lg shrink-0">
              <Eye className="h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div className="min-w-0">
              <h3 className="mb-1 text-sm sm:text-base">Manage Posts</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                View and edit all posts
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Debug Panel - LocalStorage Status */}
      <Card className="mt-6 sm:mt-8 p-4 sm:p-6 bg-muted/30">
        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <Database className="h-4 w-4 sm:h-5 sm:w-5 text-primary shrink-0" />
          <h3 className="text-base sm:text-lg">Storage Debug Panel</h3>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
          Use these tools to check if blog posts are being saved correctly to
          your browser's localStorage.
        </p>
        <div className="flex w-full flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            onClick={checkLocalStorage}
            variant="outline"
            size="sm"
            style={{ width: "50%" }}
            className="w-full sm:w-auto sm:flex-1"
          >
            <Database className="h-4 w-4 mr-2" />
            Check localStorage
          </Button>
          <Button
            onClick={clearLocalStorage}
            variant="destructive"
            size="sm"
            style={{ width: "50%" }}
            className="w-full sm:w-auto sm:flex-1"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear localStorage
          </Button>
        </div>
        <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 bg-background rounded-lg border border-border">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Note:</strong> In some preview environments, localStorage
            may be sandboxed or cleared on refresh. For production hosting, this
            will work reliably. Open your browser's DevTools Console to see
            localStorage logs.
          </p>
        </div>
      </Card>
    </div>
  );
}
