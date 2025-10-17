import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, Save, Eye, ImageIcon, Upload, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Card } from '../ui/card';
import { blogCategories } from '../../data/mockBlogPosts';
import { useBlog } from '../../contexts/BlogContext';
import { BlogPost } from '../../types/blog';
import { toast } from 'sonner';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { UnsplashImagePicker } from './UnsplashImagePicker';
import { RichTextEditor } from './RichTextEditor';

interface AdminNewPostProps {
  onNavigate: (page: string) => void;
  existingPost?: {
    id?: string;
    slug?: string;
    title: string;
    category: string;
    excerpt: string;
    content: string;
    image?: string;
    readTime: string;
    publishedAt?: string;
    status?: "draft" | "published";
  };
}

const AUTO_SAVE_KEY = 'iqrapay_blog_autosave_id';
const AUTO_SAVE_INTERVAL = 10000; // Auto-save every 10 seconds

export function AdminNewPost({ onNavigate, existingPost }: AdminNewPostProps) {
  const { addPost, updatePost, posts } = useBlog();
  
  // Check for auto-saved draft on mount
  const [initialLoad, setInitialLoad] = useState(true);
  const [autoSaveDraftId, setAutoSaveDraftId] = useState<string | null>(existingPost?.id || null);
  
  const [title, setTitle] = useState(existingPost?.title || '');
  const [category, setCategory] = useState(existingPost?.category || '');
  const [excerpt, setExcerpt] = useState(existingPost?.excerpt || '');
  const [content, setContent] = useState(existingPost?.content || '');
  const [imageUrl, setImageUrl] = useState(existingPost?.image || '');
  const [readTime, setReadTime] = useState(existingPost?.readTime || '5 min read');
  const [isPreview, setIsPreview] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState<Date | null>(null);
  const [shouldAutoSave, setShouldAutoSave] = useState(true); // Control whether auto-save should run
  const featuredImageInputRef = useRef<HTMLInputElement>(null);
  const autoSaveTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastAutoSaveTimeRef = useRef<number>(0); // Track timestamp of last auto-save

  // Load auto-saved draft on mount
  useEffect(() => {
    if (initialLoad && !existingPost) {
      const savedDraftId = localStorage.getItem(AUTO_SAVE_KEY);
      if (savedDraftId) {
        // Check if auto-save draft exists in posts
        const autoSavedPost = posts.find(p => p.id === savedDraftId && p.status === 'draft');
        if (autoSavedPost && autoSavedPost.title.startsWith('[Auto-Save]')) {
          // Found an auto-saved draft - it's already in the All Posts list
          setAutoSaveDraftId(savedDraftId);
          toast.info('Auto-saved draft is in "All Posts". You can edit it from there or continue here.');
        }
      }
      setInitialLoad(false);
    }
  }, [initialLoad, existingPost, posts]);

  const createSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // Auto-save function - creates/updates actual draft post
  const autoSave = useCallback(() => {
    // Don't auto-save if disabled (after publish or manual save)
    if (!shouldAutoSave) {
      return;
    }
    
    // Only auto-save if there's meaningful content
    if (title || content || excerpt) {
      // Create auto-save draft post
      const draftTitle = title || '[Auto-Save] Untitled Post';
      const finalTitle = title.startsWith('[Auto-Save]') ? title : `[Auto-Save] ${draftTitle}`;
      
      // Preserve the original status if editing an existing published post
      // Otherwise, default to 'draft' for new posts
      const autoSaveStatus = existingPost?.status === 'published' ? 'published' : 'draft';
      
      const autoSavePost: BlogPost = {
        id: autoSaveDraftId || existingPost?.id || `autosave_${Date.now()}`,
        slug: createSlug(title || 'autosave-draft'),
        title: finalTitle,
        excerpt: excerpt || 'Auto-saved draft - click to continue editing...',
        content: content || '<p>Start writing your content...</p>',
        category: category || 'General',
        image: imageUrl || 'https://images.unsplash.com/photo-1623458696277-a6f4bcd06c2f?w=1080',
        author: {
          name: 'Muhammad Jumah',
          role: 'Founder & CEO',
        },
        publishedAt: new Date().toISOString().split('T')[0],
        readTime,
        status: autoSaveStatus,
      };

      if (autoSaveDraftId || existingPost?.id) {
        // Update existing auto-save draft
        updatePost(autoSavePost.id, autoSavePost);
        toast.success('Draft auto-saved', { duration: 2000 });
      } else {
        // Create new auto-save draft
        addPost(autoSavePost);
        setAutoSaveDraftId(autoSavePost.id);
        localStorage.setItem(AUTO_SAVE_KEY, autoSavePost.id);
        toast.success('Draft auto-saved', { duration: 2000 });
      }
      
      setLastAutoSave(new Date());
      lastAutoSaveTimeRef.current = Date.now(); // Record timestamp of this save
    }
  }, [title, content, excerpt, category, imageUrl, readTime, autoSaveDraftId, existingPost, addPost, updatePost, shouldAutoSave]);

  // Auto-save effect with interval
  useEffect(() => {
    // Only set up auto-save if it should be active
    if (!shouldAutoSave) {
      return;
    }

    // Set up auto-save interval
    const intervalId = setInterval(() => {
      autoSave();
    }, AUTO_SAVE_INTERVAL);
    
    autoSaveTimerRef.current = intervalId;

    // Cleanup on unmount
    return () => {
      // Clear the interval
      if (intervalId) {
        clearInterval(intervalId);
      }
      
      // Only auto-save on unmount if shouldAutoSave is still true
      // Save draft when component unmounts ONLY if we haven't auto-saved in the last 5 seconds
      // This prevents duplicate saves when navigating away right after an auto-save
      if (shouldAutoSave) {
        const timeSinceLastSave = Date.now() - lastAutoSaveTimeRef.current;
        const shouldSaveOnUnmount = timeSinceLastSave > 5000; // 5 seconds threshold
        
        if (shouldSaveOnUnmount) {
          autoSave();
        }
      }
    };
  }, [autoSave, shouldAutoSave]); // Depend on autoSave and shouldAutoSave

  const handleImageUrlChange = (url: string) => {
    setImageUrl(url);
    setImageError(false);
    
    // Basic URL validation
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      toast.error('Image URL must start with http:// or https://');
      setImageError(true);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
    toast.success('Image loaded successfully!');
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
    toast.error('Failed to load image. Please check the URL or try a different image source.');
  };

  const testImageUrl = () => {
    if (!imageUrl) {
      toast.error('Please enter an image URL first');
      return;
    }
    setImageLoading(true);
    setImageError(false);
    toast.info('Testing image URL...');
  };

  const suggestIslamicImage = (searchTerm: string) => {
    const unsplashQuery = searchTerm.toLowerCase().replace(/\s+/g, '%20');
    const suggestedUrl = `https://images.unsplash.com/photo-1623458696277-a6f4bcd06c2f?w=1080`; // Default Islamic pattern
    setImageUrl(suggestedUrl);
    setImageError(false);
    toast.info(`Suggested Islamic-themed image applied. You can also search Unsplash for: "${searchTerm}"`);
  };

  const handleFeaturedImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    setImageLoading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const imageDataUrl = event.target?.result as string;
      setImageUrl(imageDataUrl);
      setImageError(false);
      setImageLoading(false);
      toast.success('Featured image uploaded successfully!');
    };
    reader.onerror = () => {
      setImageLoading(false);
      toast.error('Failed to upload image');
    };
    reader.readAsDataURL(file);

    // Reset input
    e.target.value = '';
  };

  const handleSaveDraft = () => {
    if (!title || !category || !excerpt || !content) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Stop auto-save FIRST to prevent interference
    setShouldAutoSave(false);
    if (autoSaveTimerRef.current) {
      clearInterval(autoSaveTimerRef.current);
      autoSaveTimerRef.current = null;
    }

    // Remove [Auto-Save] prefix if present
    const cleanTitle = title.startsWith('[Auto-Save]') ? title.replace('[Auto-Save] ', '') : title;

    const newPost: BlogPost = {
      id: autoSaveDraftId || existingPost?.id || Date.now().toString(),
      slug: existingPost?.slug || createSlug(cleanTitle),
      title: cleanTitle,
      excerpt,
      content,
      category,
      image: imageUrl || 'https://images.unsplash.com/photo-1623458696277-a6f4bcd06c2f?w=1080',
      author: {
        name: 'Muhammad Jumah',
        role: 'Founder & CEO',
      },
      publishedAt: existingPost?.publishedAt || new Date().toISOString().split('T')[0],
      readTime,
      status: 'draft',
    };

    if (existingPost || autoSaveDraftId) {
      updatePost(newPost.id, newPost);
      toast.success('Draft updated successfully');
    } else {
      addPost(newPost);
      toast.success('Post saved as draft');
    }
    
    // Clear auto-save localStorage
    localStorage.removeItem(AUTO_SAVE_KEY);
    setAutoSaveDraftId(null);
    
    onNavigate('admin-blog');
  };

  const handlePublish = () => {
    if (!title || !category || !excerpt || !content) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Stop auto-save FIRST to prevent any interference
    setShouldAutoSave(false);
    if (autoSaveTimerRef.current) {
      clearInterval(autoSaveTimerRef.current);
      autoSaveTimerRef.current = null;
    }

    // Remove [Auto-Save] prefix if present
    const cleanTitle = title.startsWith('[Auto-Save]') ? title.replace('[Auto-Save] ', '') : title;

    const newPost: BlogPost = {
      id: autoSaveDraftId || existingPost?.id || Date.now().toString(),
      slug: existingPost?.slug || createSlug(cleanTitle),
      title: cleanTitle,
      excerpt,
      content,
      category,
      image: imageUrl || 'https://images.unsplash.com/photo-1623458696277-a6f4bcd06c2f?w=1080',
      author: {
        name: 'Muhammad Jumah',
        role: 'Founder & CEO',
      },
      publishedAt: existingPost?.publishedAt || new Date().toISOString().split('T')[0],
      readTime,
      status: 'published',
    };

    if (existingPost || autoSaveDraftId) {
      updatePost(newPost.id, newPost);
      toast.success('Post updated and published successfully!');
    } else {
      addPost(newPost);
      toast.success('Post published successfully!');
    }
    
    // Clear auto-save localStorage
    localStorage.removeItem(AUTO_SAVE_KEY);
    setAutoSaveDraftId(null);
    
    onNavigate('admin-blog');
  };

  const renderPreview = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl md:text-4xl mb-6 mt-8">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl md:text-3xl mb-4 mt-6">{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl md:text-2xl mb-3 mt-5">{line.substring(4)}</h3>;
      }
      if (line.startsWith('> ')) {
        return (
          <blockquote key={index} className="border-l-4 border-primary pl-4 py-2 my-4 italic text-muted-foreground">
            <p>{line.substring(2)}</p>
          </blockquote>
        );
      }
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-6 mb-2">{line.substring(2)}</li>;
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      const boldRegex = /\*\*(.*?)\*\*/g;
      const processedLine = line.replace(boldRegex, '<strong>$1</strong>');
      return <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: processedLine }} />;
    });
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onNavigate('admin-blog')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl mb-1">
              {existingPost ? 'Edit Post' : 'Create New Post'}
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-muted-foreground">
                {existingPost ? 'Update your blog post' : 'Write and publish a new article'}
              </p>
              {lastAutoSave && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Auto-saved {new Date(lastAutoSave).toLocaleTimeString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsPreview(!isPreview)}
          >
            <Eye className="h-4 w-4 mr-2" />
            {isPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button
            variant="outline"
            onClick={handleSaveDraft}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button
            onClick={handlePublish}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Publish
          </Button>
        </div>
      </div>

      {isPreview ? (
        /* Preview Mode */
        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            {imageUrl && (
              <div className="mb-8">
                <ImageWithFallback
                  src={imageUrl}
                  alt={title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}
            <h1 className="text-4xl mb-4">{title || 'Untitled Post'}</h1>
            <p className="text-muted-foreground mb-8">{excerpt}</p>
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content || '<p class="text-muted-foreground">No content yet...</p>' }}></div>
          </Card>
        </div>
      ) : (
        /* Edit Mode */
        <div className="max-w-4xl mx-auto">
          <Card className="p-8">
            <form className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="Enter post title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-2xl"
                />
              </div>

              {/* Category and Read Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {blogCategories.filter(c => c.slug !== 'all').map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="readTime">Read Time</Label>
                  <Input
                    id="readTime"
                    type="text"
                    placeholder="e.g., 5 min read"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Featured Image URL */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="imageUrl">Featured Image</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="default"
                      onClick={() => featuredImageInputRef.current?.click()}
                      className="text-xs h-7"
                    >
                      <Upload className="h-3 w-3 mr-1" />
                      Upload Image
                    </Button>
                    <UnsplashImagePicker
                      onSelectImage={(url) => {
                        setImageUrl(url);
                        setImageError(false);
                        toast.success('Image selected successfully!');
                      }}
                      currentImage={imageUrl}
                    />
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={() => suggestIslamicImage('quran book islamic')}
                      className="text-xs h-7"
                    >
                      <ImageIcon className="h-3 w-3 mr-1" />
                      Quick Default
                    </Button>
                  </div>
                </div>
                
                {/* Hidden file input */}
                <input
                  ref={featuredImageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFeaturedImageUpload}
                  className="hidden"
                />

                {/* URL Input */}
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="Or paste image URL: https://images.unsplash.com/photo-..."
                    value={imageUrl}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    className={imageError ? 'border-destructive' : ''}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={testImageUrl}
                    disabled={!imageUrl || imageLoading}
                  >
                    {imageLoading ? 'Testing...' : 'Test'}
                  </Button>
                </div>
                
                {/* Image Guidelines */}
                <div className="text-xs text-muted-foreground space-y-1 bg-muted/50 p-3 rounded-md">
                  <p><strong>✨ 3 Ways to Add Featured Image:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>Upload Image:</strong> Click "Upload Image" button → Choose image from computer (max 2MB)</li>
                    <li><strong>Unsplash Picker:</strong> Click "Use Unsplash" → Search and select from thousands of free images</li>
                    <li><strong>Paste URL:</strong> Enter image URL directly (from any website, though some may block embedding)</li>
                  </ul>
                  <p className="mt-2 text-primary">
                    💡 <strong>Recommended:</strong> Upload your own images or use Unsplash for best results!
                  </p>
                </div>

                {imageError && (
                  <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                    ❌ Image failed to load. Common issues:
                    <ul className="list-disc list-inside mt-1 ml-2">
                      <li>Invalid URL format</li>
                      <li>CORS/security restrictions</li>
                      <li>Image no longer available</li>
                    </ul>
                    Try using an Unsplash image or upload to your own server.
                  </div>
                )}
                
                {imageUrl && (
                  <div className="mt-2 relative">
                    <p className="text-xs text-muted-foreground mb-1">Preview:</p>
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="h-40 w-full object-cover rounded-lg border-2 border-border"
                      onLoad={handleImageLoad}
                      onError={handleImageError}
                    />
                    {imageLoading && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                        <div className="text-sm text-muted-foreground">Loading...</div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief description of the post..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  {excerpt.length}/200 characters
                </p>
              </div>

              {/* Content - Rich Text Editor */}
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <RichTextEditor
                  value={content}
                  onChange={setContent}
                  placeholder="Start writing your blog post content here..."
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Use the toolbar to format your text with bold, italic, headings, lists, and more
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {content.replace(/<[^>]*>/g, '').split(' ').filter(w => w).length} words
                  </p>
                </div>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
}
