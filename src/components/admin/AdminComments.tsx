import { useState, useEffect } from 'react';
import { MessageCircle, Trash2, Search, AlertCircle, MapPin } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  location?: string;
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
  replies?: Comment[];
  parentId?: string;
  postSlug?: string;
  postTitle?: string;
}

interface CommentWithPost extends Comment {
  postSlug: string;
  postTitle: string;
}

export function AdminComments() {
  const [allComments, setAllComments] = useState<CommentWithPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'comments' | 'replies'>('all');

  useEffect(() => {
    loadAllComments();
  }, []);

  const loadAllComments = () => {
    const comments: CommentWithPost[] = [];
    
    // Get all localStorage keys that start with 'comments_'
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('comments_')) {
        const postSlug = key.replace('comments_', '');
        const data = localStorage.getItem(key);
        
        if (data) {
          try {
            const postComments = JSON.parse(data) as Comment[];
            
            // Get post title from blog posts
            const blogPosts = localStorage.getItem('iqrapay_blog_posts');
            let postTitle = postSlug;
            if (blogPosts) {
              const posts = JSON.parse(blogPosts);
              const post = posts.find((p: any) => p.slug === postSlug);
              if (post) {
                postTitle = post.title;
              }
            }
            
            // Add main comments
            postComments.forEach(comment => {
              comments.push({
                ...comment,
                postSlug,
                postTitle,
              });
              
              // Add replies as separate entries
              if (comment.replies && comment.replies.length > 0) {
                comment.replies.forEach(reply => {
                  comments.push({
                    ...reply,
                    postSlug,
                    postTitle,
                    parentId: comment.id,
                  });
                });
              }
            });
          } catch (error) {
            console.error('Error parsing comments:', error);
          }
        }
      }
    }
    
    // Sort by timestamp (newest first)
    comments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    setAllComments(comments);
  };

  const handleDeleteComment = (comment: CommentWithPost) => {
    if (!confirm(`Are you sure you want to delete this ${comment.parentId ? 'reply' : 'comment'}?`)) {
      return;
    }

    // Move to recycle bin instead of permanent delete
    const recycleBin = localStorage.getItem('iqrapay_recycle_bin');
    const deletedItems = recycleBin ? JSON.parse(recycleBin) : [];
    
    // Add to recycle bin with metadata
    deletedItems.push({
      ...comment,
      deletedAt: new Date().toISOString(),
      deletedBy: 'admin',
    });
    
    localStorage.setItem('iqrapay_recycle_bin', JSON.stringify(deletedItems));

    const key = `comments_${comment.postSlug}`;
    const data = localStorage.getItem(key);
    
    if (data) {
      try {
        let comments = JSON.parse(data) as Comment[];
        
        if (comment.parentId) {
          // Delete a reply
          comments = comments.map(c => {
            if (c.id === comment.parentId) {
              return {
                ...c,
                replies: c.replies?.filter(r => r.id !== comment.id) || [],
              };
            }
            return c;
          });
        } else {
          // Delete a main comment (and all its replies)
          comments = comments.filter(c => c.id !== comment.id);
        }
        
        localStorage.setItem(key, JSON.stringify(comments));
        loadAllComments();
        toast.success('Comment moved to recycle bin!');
      } catch (error) {
        console.error('Error deleting comment:', error);
        toast.error('Failed to delete comment');
      }
    }
  };

  const handleBulkDelete = () => {
    if (!confirm('Are you sure you want to delete ALL comments from all posts? This action will move them to recycle bin.')) {
      return;
    }

    // Move all comments to recycle bin
    const recycleBin = localStorage.getItem('iqrapay_recycle_bin');
    const deletedItems = recycleBin ? JSON.parse(recycleBin) : [];
    
    // Add all comments to recycle bin
    allComments.forEach(comment => {
      deletedItems.push({
        ...comment,
        deletedAt: new Date().toISOString(),
        deletedBy: 'admin',
      });
    });
    
    localStorage.setItem('iqrapay_recycle_bin', JSON.stringify(deletedItems));

    // Delete all comment keys
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith('comments_')) {
        localStorage.removeItem(key);
      }
    }

    loadAllComments();
    toast.success('All comments moved to recycle bin!');
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  const filteredComments = allComments.filter(comment => {
    // Filter by type
    if (filter === 'comments' && comment.parentId) return false;
    if (filter === 'replies' && !comment.parentId) return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        comment.content.toLowerCase().includes(query) ||
        comment.author.toLowerCase().includes(query) ||
        comment.postTitle.toLowerCase().includes(query)
      );
    }

    return true;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl mb-1 sm:mb-2">Comments Management</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage all comments and replies across your blog posts
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Comments</p>
              <p className="text-2xl">
                {allComments.filter(c => !c.parentId).length}
              </p>
            </div>
            <MessageCircle className="h-8 w-8 text-primary opacity-20" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Replies</p>
              <p className="text-2xl">
                {allComments.filter(c => c.parentId).length}
              </p>
            </div>
            <MessageCircle className="h-8 w-8 text-secondary opacity-20" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Interactions</p>
              <p className="text-2xl">{allComments.length}</p>
            </div>
            <MessageCircle className="h-8 w-8 text-accent opacity-20" />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search comments, authors, or posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'comments' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('comments')}
            >
              Comments
            </Button>
            <Button
              variant={filter === 'replies' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('replies')}
            >
              Replies
            </Button>
          </div>
        </div>
      </Card>

      {/* Bulk Actions */}
      {allComments.length > 0 && (
        <div className="mb-4">
          <Button
            variant="destructive"
            size="sm"
            onClick={handleBulkDelete}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete All Comments
          </Button>
        </div>
      )}

      {/* Comments List */}
      <Card className="overflow-hidden">
        {filteredComments.length > 0 ? (
          <div className="divide-y">
            {filteredComments.map((comment) => (
              <div
                key={`${comment.postSlug}-${comment.id}`}
                className="p-4 hover:bg-muted/30 transition-colors"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm">{comment.avatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-sm">{comment.author}</span>
                          {comment.location && (
                            <>
                              <span className="text-xs text-muted-foreground">·</span>
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {comment.location}
                              </span>
                            </>
                          )}
                          {comment.parentId && (
                            <Badge variant="secondary" className="text-xs">
                              Reply
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            {formatTimestamp(comment.timestamp)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2 truncate">
                          On: {comment.postTitle}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteComment(comment)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {comment.content}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{comment.likes} likes</span>
                      {!comment.parentId && comment.replies && comment.replies.length > 0 && (
                        <span>{comment.replies.length} replies</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            {searchQuery || filter !== 'all' ? (
              <>
                <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No comments found matching your filters</p>
              </>
            ) : (
              <>
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No comments yet</p>
              </>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}