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
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your blog
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Recent Posts */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Recent Posts</h2>
          <button
            onClick={() => onNavigate('admin-blog')}
            className="text-primary hover:underline"
          >
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted cursor-pointer transition-colors"
              onClick={() => onNavigate('admin-blog')}
            >
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-16 w-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="mb-1 line-clamp-1">{post.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    post.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
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
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          className="p-6 cursor-pointer hover:border-primary transition-colors"
          onClick={() => onNavigate('admin-new-post')}
        >
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 text-primary p-4 rounded-lg">
              <FileText className="h-8 w-8" />
            </div>
            <div>
              <h3 className="mb-1">Create New Post</h3>
              <p className="text-sm text-muted-foreground">
                Start writing a new article
              </p>
            </div>
          </div>
        </Card>

        <Card
          className="p-6 cursor-pointer hover:border-primary transition-colors"
          onClick={() => onNavigate('admin-blog')}
        >
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 text-primary p-4 rounded-lg">
              <Eye className="h-8 w-8" />
            </div>
            <div>
              <h3 className="mb-1">Manage Posts</h3>
              <p className="text-sm text-muted-foreground">
                View and edit all posts
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Debug Panel - LocalStorage Status */}
      <Card className="mt-8 p-6 bg-muted/30">
        <div className="flex items-center gap-3 mb-4">
          <Database className="h-5 w-5 text-primary" />
          <h3 className="text-lg">Storage Debug Panel</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Use these tools to check if blog posts are being saved correctly to your browser's localStorage.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button onClick={checkLocalStorage} variant="outline" size="sm">
            <Database className="h-4 w-4 mr-2" />
            Check localStorage
          </Button>
          <Button onClick={clearLocalStorage} variant="destructive" size="sm">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear localStorage
          </Button>
        </div>
        <div className="mt-4 p-3 bg-background rounded-lg border border-border">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Note:</strong> In some preview environments, localStorage may be sandboxed or cleared on refresh. 
            For production hosting, this will work reliably. Open your browser's DevTools Console to see localStorage logs.
          </p>
        </div>
      </Card>
    </div>
  );
}
