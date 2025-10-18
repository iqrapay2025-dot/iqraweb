import { useState } from 'react';
import { Edit, Trash2, Eye, Search, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { useBlog } from '../../contexts/BlogContext';
import { toast } from 'sonner';

interface AdminBlogListProps {
  onNavigate: (page: string) => void;
  onEditPost: (slug: string) => void;
}

export function AdminBlogList({ onNavigate, onEditPost }: AdminBlogListProps) {
  const { posts, deletePost } = useBlog();
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (postId: string) => {
    setPostToDelete(postId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      deletePost(postToDelete);
      toast.success('Post deleted successfully');
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl mb-1 sm:mb-2">All Posts</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage all your blog posts
          </p>
        </div>
        <Button
          onClick={() => onNavigate('admin-new-post')}
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Search */}
      <div className="mb-4 sm:mb-6">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 sm:pl-10 text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Posts Table - Desktop */}
      <div className="hidden lg:block border border-border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-10 w-10 rounded object-cover"
                    />
                    <div>
                      <p className="line-clamp-1 max-w-md">{post.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {post.readTime}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{post.category}</Badge>
                </TableCell>
                <TableCell>{post.author.name}</TableCell>
                <TableCell>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      post.status === 'published'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100'
                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100'
                    }
                  >
                    {post.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEditPost(post.slug)}
                      title="Edit post"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(post.id)}
                      className="text-destructive hover:text-destructive"
                      title="Delete post"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Posts Cards - Mobile & Tablet */}
      <div className="lg:hidden space-y-4">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="border border-border rounded-lg p-4 bg-card hover:bg-accent/50 transition-colors"
          >
            <div className="flex gap-3">
              {/* Post Image */}
              <img
                src={post.image}
                alt={post.title}
                className="h-20 w-20 sm:h-24 sm:w-24 rounded object-cover shrink-0"
              />
              
              {/* Post Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="line-clamp-2 break-words">{post.title}</h3>
                  <Badge
                    className={
                      post.status === 'published'
                        ? 'bg-green-100 text-green-700 hover:bg-green-100 shrink-0'
                        : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100 shrink-0'
                    }
                  >
                    {post.status}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-muted-foreground mb-3">
                  <Badge variant="outline" className="text-xs">{post.category}</Badge>
                  <span>•</span>
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditPost(post.slug)}
                    className="flex-1 sm:flex-initial"
                  >
                    <Edit className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(post.id)}
                    className="flex-1 sm:flex-initial text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1.5" />
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-8 sm:py-12 border border-border rounded-lg bg-muted/30">
          <p className="text-sm sm:text-base text-muted-foreground">No posts found</p>
          {searchQuery && (
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Try adjusting your search query
            </p>
          )}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
