import { useState, useEffect } from 'react';
import { Trash2, RotateCcw, Search, AlertCircle, MapPin, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { Badge } from '../ui/badge';

interface DeletedComment {
  id: string;
  author: string;
  avatar: string;
  location?: string;
  content: string;
  timestamp: string;
  likes: number;
  liked: boolean;
  replies?: DeletedComment[];
  parentId?: string;
  postSlug: string;
  postTitle: string;
  deletedAt: string;
  deletedBy: string;
}

export function AdminRecycleBin() {
  const [deletedComments, setDeletedComments] = useState<DeletedComment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'comments' | 'replies'>('all');

  useEffect(() => {
    loadDeletedComments();
  }, []);

  const loadDeletedComments = () => {
    const recycleBin = localStorage.getItem('iqrapay_recycle_bin');
    if (recycleBin) {
      try {
        const items = JSON.parse(recycleBin);
        // Sort by deletion date (newest first)
        items.sort((a: DeletedComment, b: DeletedComment) => 
          new Date(b.deletedAt).getTime() - new Date(a.deletedAt).getTime()
        );
        setDeletedComments(items);
      } catch (error) {
        console.error('Error loading recycle bin:', error);
        setDeletedComments([]);
      }
    } else {
      setDeletedComments([]);
    }
  };

  const handleRestore = (comment: DeletedComment) => {
    if (!confirm('Are you sure you want to restore this comment?')) {
      return;
    }

    try {
      // Get the comments for this post
      const key = `comments_${comment.postSlug}`;
      const data = localStorage.getItem(key);
      let comments = data ? JSON.parse(data) : [];

      if (comment.parentId) {
        // Restore a reply - find parent and add to its replies array
        comments = comments.map((c: any) => {
          if (c.id === comment.parentId) {
            return {
              ...c,
              replies: [...(c.replies || []), {
                id: comment.id,
                author: comment.author,
                avatar: comment.avatar,
                location: comment.location,
                content: comment.content,
                timestamp: comment.timestamp,
                likes: comment.likes,
                liked: comment.liked,
                parentId: comment.parentId,
              }],
            };
          }
          return c;
        });
      } else {
        // Restore a main comment
        const restoredComment = {
          id: comment.id,
          author: comment.author,
          avatar: comment.avatar,
          location: comment.location,
          content: comment.content,
          timestamp: comment.timestamp,
          likes: comment.likes,
          liked: comment.liked,
          replies: comment.replies || [],
        };
        comments.push(restoredComment);
      }

      // Save back to localStorage
      localStorage.setItem(key, JSON.stringify(comments));

      // Remove from recycle bin
      const recycleBin = localStorage.getItem('iqrapay_recycle_bin');
      if (recycleBin) {
        const items = JSON.parse(recycleBin);
        const updatedItems = items.filter((item: DeletedComment) => item.id !== comment.id);
        localStorage.setItem('iqrapay_recycle_bin', JSON.stringify(updatedItems));
      }

      loadDeletedComments();
      toast.success('Comment restored successfully!');
    } catch (error) {
      console.error('Error restoring comment:', error);
      toast.error('Failed to restore comment');
    }
  };

  const handlePermanentDelete = (comment: DeletedComment) => {
    if (!confirm('⚠️ This will permanently delete the comment. This action cannot be undone! Are you sure?')) {
      return;
    }

    try {
      const recycleBin = localStorage.getItem('iqrapay_recycle_bin');
      if (recycleBin) {
        const items = JSON.parse(recycleBin);
        const updatedItems = items.filter((item: DeletedComment) => item.id !== comment.id);
        localStorage.setItem('iqrapay_recycle_bin', JSON.stringify(updatedItems));
        loadDeletedComments();
        toast.success('Comment permanently deleted!');
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    }
  };

  const handleEmptyRecycleBin = () => {
    if (!confirm('⚠️ This will permanently delete ALL items in the recycle bin. This action cannot be undone! Are you sure?')) {
      return;
    }

    localStorage.removeItem('iqrapay_recycle_bin');
    loadDeletedComments();
    toast.success('Recycle bin emptied successfully!');
  };

  const handleRestoreAll = () => {
    if (!confirm('Are you sure you want to restore ALL comments from the recycle bin?')) {
      return;
    }

    try {
      deletedComments.forEach(comment => {
        // Get the comments for this post
        const key = `comments_${comment.postSlug}`;
        const data = localStorage.getItem(key);
        let comments = data ? JSON.parse(data) : [];

        if (comment.parentId) {
          // Restore a reply
          comments = comments.map((c: any) => {
            if (c.id === comment.parentId) {
              return {
                ...c,
                replies: [...(c.replies || []), {
                  id: comment.id,
                  author: comment.author,
                  avatar: comment.avatar,
                  location: comment.location,
                  content: comment.content,
                  timestamp: comment.timestamp,
                  likes: comment.likes,
                  liked: comment.liked,
                  parentId: comment.parentId,
                }],
              };
            }
            return c;
          });
        } else {
          // Restore a main comment
          const restoredComment = {
            id: comment.id,
            author: comment.author,
            avatar: comment.avatar,
            location: comment.location,
            content: comment.content,
            timestamp: comment.timestamp,
            likes: comment.likes,
            liked: comment.liked,
            replies: comment.replies || [],
          };
          comments.push(restoredComment);
        }

        localStorage.setItem(key, JSON.stringify(comments));
      });

      // Clear recycle bin
      localStorage.removeItem('iqrapay_recycle_bin');
      loadDeletedComments();
      toast.success('All comments restored successfully!');
    } catch (error) {
      console.error('Error restoring comments:', error);
      toast.error('Failed to restore all comments');
    }
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

  const filteredComments = deletedComments.filter(comment => {
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
        <h1 className="text-2xl sm:text-3xl mb-1 sm:mb-2">Recycle Bin</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Deleted comments are stored here temporarily. Restore or permanently delete them.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Deleted Comments</p>
              <p className="text-2xl">
                {deletedComments.filter(c => !c.parentId).length}
              </p>
            </div>
            <Trash2 className="h-8 w-8 text-destructive opacity-20" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Deleted Replies</p>
              <p className="text-2xl">
                {deletedComments.filter(c => c.parentId).length}
              </p>
            </div>
            <Trash2 className="h-8 w-8 text-orange-500 opacity-20" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="text-2xl">{deletedComments.length}</p>
            </div>
            <Trash2 className="h-8 w-8 text-yellow-500 opacity-20" />
          </div>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search deleted comments..."
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
      {deletedComments.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-4">
          <Button
            variant="default"
            size="sm"
            onClick={handleRestoreAll}
            className="gap-2 bg-green-600 hover:bg-green-700"
          >
            <RotateCcw className="h-4 w-4" />
            Restore All
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleEmptyRecycleBin}
            className="gap-2"
          >
            <AlertTriangle className="h-4 w-4" />
            Empty Recycle Bin
          </Button>
        </div>
      )}

      {/* Deleted Comments List */}
      <Card className="overflow-hidden">
        {filteredComments.length > 0 ? (
          <div className="divide-y">
            {filteredComments.map((comment) => (
              <div
                key={`deleted-${comment.id}`}
                className="p-4 hover:bg-muted/30 transition-colors bg-destructive/5"
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-destructive text-sm">{comment.avatar}</span>
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
                          <Badge variant="destructive" className="text-xs">
                            Deleted
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1 truncate">
                          On: {comment.postTitle}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Posted: {formatTimestamp(comment.timestamp)}
                        </p>
                        <p className="text-xs text-destructive">
                          Deleted: {formatTimestamp(comment.deletedAt)} by {comment.deletedBy}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRestore(comment)}
                          className="text-green-600 hover:text-green-700 hover:bg-green-600/10"
                          title="Restore comment"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePermanentDelete(comment)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          title="Permanently delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm whitespace-pre-wrap break-words opacity-70">
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
                <p>No deleted comments found matching your filters</p>
              </>
            ) : (
              <>
                <Trash2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Recycle bin is empty</p>
                <p className="text-sm mt-2">Deleted comments will appear here</p>
              </>
            )}
          </div>
        )}
      </Card>

      {/* Info Box */}
      {deletedComments.length > 0 && (
        <Card className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900 dark:text-blue-100">
              <p className="font-medium mb-1">About the Recycle Bin</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Deleted comments are stored here as evidence/reference</li>
                <li>You can restore comments back to their original posts</li>
                <li>Permanently delete to remove completely</li>
                <li>Items in recycle bin don't appear on live blog posts</li>
              </ul>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
