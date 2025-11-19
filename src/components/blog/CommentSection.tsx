import { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Link2,
  Send,
  Trash2,
  MoreHorizontal,
  MapPin,
} from "lucide-react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import { copyToClipboard } from "../../types/clipboard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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
}

interface CommentSectionProps {
  postSlug: string;
  postTitle: string;
}

export function CommentSection({ postSlug, postTitle }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [commenterName, setCommenterName] = useState("");
  const [commenterLocation, setCommenterLocation] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyName, setReplyName] = useState("");
  const [replyLocation, setReplyLocation] = useState("");
  const [shareMenuOpen, setShareMenuOpen] = useState<string | null>(null);

  // Check if user is admin
  const isAdmin = localStorage.getItem("iqrapay_admin_session") === "active";

  // Load saved name and location from localStorage
  useEffect(() => {
    const savedName = localStorage.getItem("commenter_name");
    const savedLocation = localStorage.getItem("commenter_location");
    if (savedName) setCommenterName(savedName);
    if (savedLocation) setCommenterLocation(savedLocation);
    // Also pre-populate reply form
    if (savedName) setReplyName(savedName);
    if (savedLocation) setReplyLocation(savedLocation);
  }, []);

  useEffect(() => {
    // Load comments from localStorage
    const savedComments = localStorage.getItem(`comments_${postSlug}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    } else {
      // Add some initial demo comments
      setComments([
        {
          id: "1",
          author: "Aisha Rahman",
          avatar: "AR",
          location: "Riyadh, Saudi Arabia",
          content:
            "MashaAllah! This is very beneficial knowledge. JazakAllahu Khayran for sharing.",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          likes: 5,
          liked: false,
          replies: [],
        },
        {
          id: "2",
          author: "Muhammad Ali",
          avatar: "MA",
          location: "London, UK",
          content:
            "Alhamdulillah, this platform is making it easier to learn our Deen. May Allah reward the team!",
          timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
          likes: 3,
          liked: false,
          replies: [],
        },
      ]);
    }
  }, [postSlug]);

  const saveComments = (updatedComments: Comment[]) => {
    localStorage.setItem(
      `comments_${postSlug}`,
      JSON.stringify(updatedComments)
    );
    setComments(updatedComments);
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    // Save name and location to localStorage for future use
    if (commenterName) {
      localStorage.setItem("commenter_name", commenterName);
    }
    if (commenterLocation) {
      localStorage.setItem("commenter_location", commenterLocation);
    }

    const comment: Comment = {
      id: Date.now().toString(),
      author: commenterName || "Anonymous User",
      avatar: "AU",
      location: commenterLocation,
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0,
      liked: false,
      replies: [],
    };

    const updatedComments = [comment, ...comments];
    saveComments(updatedComments);
    setNewComment("");
    toast.success("Comment posted successfully!");
  };

  const handleSubmitReply = (parentId: string) => {
    if (!replyContent.trim()) return;

    // Save name and location to localStorage for future use
    if (replyName) {
      localStorage.setItem("commenter_name", replyName);
    }
    if (replyLocation) {
      localStorage.setItem("commenter_location", replyLocation);
    }

    const reply: Comment = {
      id: Date.now().toString(),
      author: replyName || "Anonymous User",
      avatar: "AU",
      location: replyLocation,
      content: replyContent,
      timestamp: new Date().toISOString(),
      likes: 0,
      liked: false,
      parentId,
    };

    const updatedComments = comments.map((comment) => {
      if (comment.id === parentId) {
        return {
          ...comment,
          replies: [...(comment.replies || []), reply],
        };
      }
      return comment;
    });

    saveComments(updatedComments);
    setReplyContent("");
    setReplyingTo(null);
    toast.success("Reply posted successfully!");
  };

  const handleLike = (commentId: string, parentId?: string) => {
    const updatedComments = comments.map((comment) => {
      // Like a main comment
      if (comment.id === commentId && !parentId) {
        return {
          ...comment,
          liked: !comment.liked,
          likes: comment.liked ? comment.likes - 1 : comment.likes + 1,
        };
      }
      // Like a reply
      if (parentId && comment.id === parentId) {
        return {
          ...comment,
          replies: comment.replies?.map((reply) => {
            if (reply.id === commentId) {
              return {
                ...reply,
                liked: !reply.liked,
                likes: reply.liked ? reply.likes - 1 : reply.likes + 1,
              };
            }
            return reply;
          }),
        };
      }
      return comment;
    });
    saveComments(updatedComments);
  };

  const handleDeleteComment = (commentId: string, parentId?: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;

    let updatedComments: Comment[];
    let deletedComment: Comment | undefined;

    if (parentId) {
      // Delete a reply
      updatedComments = comments.map((comment) => {
        if (comment.id === parentId) {
          // Find the reply being deleted
          const replyToDelete = comment.replies?.find(
            (r) => r.id === commentId
          );
          if (replyToDelete) {
            deletedComment = { ...replyToDelete, parentId };
          }
          return {
            ...comment,
            replies:
              comment.replies?.filter((reply) => reply.id !== commentId) || [],
          };
        }
        return comment;
      });
    } else {
      // Delete a main comment
      deletedComment = comments.find((comment) => comment.id === commentId);
      updatedComments = comments.filter((comment) => comment.id !== commentId);
    }

    // Move to recycle bin
    if (deletedComment) {
      const recycleBin = localStorage.getItem("iqrapay_recycle_bin");
      const deletedItems = recycleBin ? JSON.parse(recycleBin) : [];

      deletedItems.push({
        ...deletedComment,
        postSlug,
        postTitle,
        deletedAt: new Date().toISOString(),
        deletedBy: "admin",
      });

      localStorage.setItem("iqrapay_recycle_bin", JSON.stringify(deletedItems));
    }

    saveComments(updatedComments);
    toast.success("Comment moved to recycle bin!");
  };

  const handleShare = (platform: string) => {
    // Get the actual post URL - remove any figma preview paths
    let url = window.location.href;

    // Clean up any Figma preview URLs
    if (url.includes("figma.site") || url.includes("figmaiframepreview")) {
      // Extract just the hash/path part if it exists
      const hashIndex = url.indexOf("#");
      if (hashIndex !== -1) {
        const path = url.substring(hashIndex + 1);
        url = `https://iqrapay.com/${path}`;
      } else {
        url = "https://iqrapay.com";
      }
    }

    const text = postTitle;

    const shareUrls: { [key: string]: string } = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
      facebook: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`,
      linkedin: `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
      setShareMenuOpen(null);
    }
  };

  const handleCopyLink = async (commentId?: string) => {
    // Get the actual post URL - remove any figma preview paths
    let url = window.location.href;

    // Clean up any Figma preview URLs
    if (url.includes("figma.site") || url.includes("figmaiframepreview")) {
      // Extract just the hash/path part if it exists
      const hashIndex = url.indexOf("#");
      if (hashIndex !== -1) {
        const path = url.substring(hashIndex + 1);
        url = `https://iqrapay.com/${path}`;
      } else {
        url = "https://iqrapay.com";
      }
    }

    // Add comment ID if sharing a specific comment
    if (commentId) {
      url += `#comment-${commentId}`;
    }

    const success = await copyToClipboard(url);
    if (success) {
      toast.success("Link copied to clipboard!");
    } else {
      toast.error("Failed to copy link. Please copy manually.");
    }
    setShareMenuOpen(null);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const getTotalCommentCount = () => {
    return comments.reduce((total, comment) => {
      return total + 1 + (comment.replies?.length || 0);
    }, 0);
  };

  const renderComment = (comment: Comment, parentId?: string) => (
    <motion.div
      key={comment.id}
      id={`comment-${comment.id}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`${
        parentId ? "ml-12" : ""
      } border-b border-border last:border-0`}
    >
      <div className="flex gap-3 py-4 hover:bg-muted/20 transition-colors px-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <span className="text-primary text-sm">{comment.avatar}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm hover:underline cursor-pointer">
              {comment.author}
            </span>
            {comment.location && (
              <span className="text-xs text-muted-foreground">
                · {comment.location}
              </span>
            )}
            <span className="text-xs text-muted-foreground">
              · {formatTimestamp(comment.timestamp)}
            </span>
            {isAdmin && (
              <button
                onClick={() => handleDeleteComment(comment.id, parentId)}
                className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                title="Delete comment (Admin only)"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <p className="text-sm mb-3 whitespace-pre-wrap break-words">
            {comment.content}
          </p>
          <div className="flex items-center gap-6 text-muted-foreground">
            <button
              onClick={() => handleLike(comment.id, parentId)}
              className="flex items-center gap-1.5 hover:text-red-500 transition-colors group"
            >
              <Heart
                className={`h-4 w-4 transition-all ${
                  comment.liked
                    ? "fill-red-500 text-red-500 scale-110"
                    : "group-hover:scale-110"
                }`}
              />
              {comment.likes > 0 && (
                <span className="text-xs">{comment.likes}</span>
              )}
            </button>
            {!parentId && (
              <button
                onClick={() => {
                  setReplyingTo(comment.id);
                  setReplyContent("");
                }}
                className="flex items-center gap-1.5 hover:text-primary transition-colors group"
              >
                <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
                {comment.replies && comment.replies.length > 0 && (
                  <span className="text-xs">{comment.replies.length}</span>
                )}
              </button>
            )}
            <DropdownMenu
              open={shareMenuOpen === comment.id}
              onOpenChange={(open: boolean) =>
                setShareMenuOpen(open ? comment.id : null)
              }
            >
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 hover:text-primary transition-colors group">
                  <Share2 className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => handleShare("twitter")}>
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Share on Twitter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("facebook")}>
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Share on Facebook
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleShare("whatsapp")}>
                  <svg
                    className="h-4 w-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Share on WhatsApp
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCopyLink(comment.id)}>
                  <Link2 className="h-4 w-4 mr-2" />
                  Copy link to comment
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Reply Form */}
          {replyingTo === comment.id && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 border border-border rounded-lg p-3 bg-muted/30"
            >
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary text-xs">AU</span>
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Your name"
                    value={replyName}
                    onChange={(e) => setReplyName(e.target.value)}
                    className="mb-2"
                  />
                  <Input
                    placeholder="Your location"
                    value={replyLocation}
                    onChange={(e) => setReplyLocation(e.target.value)}
                    className="mb-2"
                  />
                  <Textarea
                    placeholder={`Reply to ${comment.author}...`}
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="min-h-[80px] resize-none text-sm"
                    autoFocus
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyContent("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleSubmitReply(comment.id)}
                      disabled={!replyContent.trim()}
                      className="bg-primary hover:bg-primary/90"
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Render Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="border-l-2 border-border ml-6">
          {comment.replies.map((reply) => renderComment(reply, comment.id))}
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="max-w-4xl mx-auto mt-12">
      {/* Share Section - Twitter Style */}
      <div className="mb-8 p-6 bg-card rounded-xl border border-border">
        <h3 className="mb-4 flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Share this article
        </h3>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("twitter")}
            className="gap-2"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            Twitter
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("facebook")}
            className="gap-2"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("linkedin")}
            className="gap-2"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleShare("whatsapp")}
            className="gap-2"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            WhatsApp
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCopyLink()}
            className="gap-2"
          >
            <Link2 className="h-4 w-4" />
            Copy Link
          </Button>
        </div>
      </div>

      {/* Comments Section - Twitter Style */}
      <div className="border border-border rounded-xl bg-card overflow-hidden">
        {/* Comments Header */}
        <div className="px-6 py-4 border-b border-border">
          <h3 className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            Comments ({getTotalCommentCount()})
          </h3>
        </div>

        {/* New Comment Form */}
        <div className="border-b border-border p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <span className="text-primary text-sm">AU</span>
            </div>
            <div className="flex-1">
              <Input
                placeholder="Your name"
                value={commenterName}
                onChange={(e) => setCommenterName(e.target.value)}
                className="mb-2"
              />
              <Input
                placeholder="Your location"
                value={commenterLocation}
                onChange={(e) => setCommenterLocation(e.target.value)}
                className="mb-2"
              />
              <Textarea
                placeholder="What are your thoughts?"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px] resize-none border-0 focus-visible:ring-0 p-0 bg-transparent"
              />
              <div className="flex justify-end mt-3">
                <Button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim()}
                  className="bg-primary hover:bg-primary/90 rounded-full"
                  size="sm"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <AnimatePresence>
          {comments.length > 0 ? (
            <div>{comments.map((comment) => renderComment(comment))}</div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No comments yet. Be the first to share your thoughts!</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
