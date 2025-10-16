import { useState } from 'react';
import { ArrowLeft, Save, Eye, ImageIcon } from 'lucide-react';
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

interface AdminNewPostProps {
  onNavigate: (page: string) => void;
  existingPost?: {
    id?: string; // 👈 add this
    title: string;
    slug: string;
    publishedAt: string;
    category: string;
    excerpt: string;
    content: string;
    image?: string;
    readTime: string;
  };
}


export function AdminNewPost({ onNavigate, existingPost }: AdminNewPostProps) {
  const { addPost, updatePost } = useBlog();
  const [title, setTitle] = useState(existingPost?.title || '');
  const [category, setCategory] = useState(existingPost?.category || '');
  const [excerpt, setExcerpt] = useState(existingPost?.excerpt || '');
  const [content, setContent] = useState(existingPost?.content || '');
  const [imageUrl, setImageUrl] = useState(existingPost?.image || '');
  const [readTime, setReadTime] = useState(existingPost?.readTime || '5 min read');
  const [isPreview, setIsPreview] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const createSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

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

  const handleSaveDraft = () => {
    if (!title || !category || !excerpt || !content) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newPost: BlogPost = {
      id: existingPost?.id || Date.now().toString(),
      slug: existingPost?.slug || createSlug(title),
      title,
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

    if (existingPost) {
      updatePost(newPost.id, newPost);
      toast.success('Draft updated successfully');
    } else {
      addPost(newPost);
      toast.success('Post saved as draft');
    }
    onNavigate('admin-blog');
  };

  const handlePublish = () => {
    if (!title || !category || !excerpt || !content) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newPost: BlogPost = {
      id: existingPost?.id || Date.now().toString(),
      slug: existingPost?.slug || createSlug(title),
      title,
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

    if (existingPost) {
      updatePost(newPost.id, newPost);
      toast.success('Post updated and published successfully!');
    } else {
      addPost(newPost);
      toast.success('Post published successfully!');
    }
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
            <p className="text-muted-foreground">
              {existingPost ? 'Update your blog post' : 'Write and publish a new article'}
            </p>
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
            <div className="prose prose-lg max-w-none">
              {renderPreview(content)}
            </div>
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
                  <Label htmlFor="imageUrl">Featured Image URL</Label>
                  <div className="flex gap-2">
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
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
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
                  <p><strong>Recommended image sources:</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li><strong>Unsplash:</strong> Visit <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">unsplash.com</a>, search for images, right-click → "Copy image address"</li>
                    <li><strong>Your server:</strong> Upload images to your hosting and use direct URLs (.jpg, .png, .webp)</li>
                    <li><strong>Quick tip:</strong> Click "Use Islamic Image" above for a default Shariah-compliant image</li>
                  </ul>
                  <p className="mt-2 text-amber-600">
                    ⚠️ <strong>Why images might not load:</strong> Some websites block embedding (CORS). Unsplash images always work!
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

              {/* Content */}
              <div className="space-y-2">
                <Label htmlFor="content">Content * (Markdown supported)</Label>
                <Textarea
                  id="content"
                  placeholder="# Your Post Title&#10;&#10;Start writing your content here...&#10;&#10;## Section Heading&#10;&#10;Your text here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={20}
                  className="font-mono text-sm"
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Supports: # Headers, **Bold**, &gt; Blockquotes, - Lists
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {content.split(' ').filter(w => w).length} words
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
