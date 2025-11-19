import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Footer } from '../Footer';
import { IslamicPattern } from '../IslamicPattern';
import { BlogPost } from '../../types/blog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { toast } from 'sonner';
import { CommentSection } from './CommentSection';
import { copyToClipboard } from '../../types/clipboard';

interface BlogPostPageProps {
  post: BlogPost;
  onNavigate: (page: string) => void;
  onBack: () => void;
}

export function BlogPostPage({ post, onNavigate, onBack }: BlogPostPageProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled share or share failed
        console.log('Share cancelled or failed:', err);
      }
    } else {
      const success = await copyToClipboard(window.location.href);
      if (success) {
        toast.success('Link copied to clipboard!');
      } else {
        toast.error('Failed to copy link. Please copy manually.');
      }
    }
  };

  // Convert markdown-style content to HTML (simple version)
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      // Headers
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl md:text-4xl mb-6 mt-8">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl md:text-3xl mb-4 mt-6">{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl md:text-2xl mb-3 mt-5">{line.substring(4)}</h3>;
      }
      
      // Bold text
      const boldRegex = /\*\*(.*?)\*\*/g;
      const processedLine = line.replace(boldRegex, '<strong>$1</strong>');
      
      // Blockquotes
      if (line.startsWith('> ')) {
        return (
          <blockquote key={index} className="border-l-4 border-primary pl-4 py-2 my-4 italic text-muted-foreground">
            <p dangerouslySetInnerHTML={{ __html: processedLine.substring(2) }} />
          </blockquote>
        );
      }
      
      // Lists
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-6 mb-2">{line.substring(2)}</li>;
      }
      if (/^\d+\.\s/.test(line)) {
        return <li key={index} className="ml-6 mb-2 list-decimal">{line.substring(line.indexOf(' ') + 1)}</li>;
      }
      
      // Empty lines
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      // Regular paragraphs
      return <p key={index} className="mb-4" dangerouslySetInnerHTML={{ __html: processedLine }} />;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <IslamicPattern opacity={0.03} />
        
        {/* Back Button */}
        <section className="relative pt-24 px-4">
          <div className="max-w-4xl mx-auto">
            <Button
              variant="ghost"
              onClick={onBack}
              className="mb-6 hover:bg-muted"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </div>
        </section>

        {/* Article Header */}
        <article className="relative px-4 pb-20">
          <div className="max-w-4xl mx-auto">
            {/* Category Badge */}
            <Badge className="mb-4 bg-primary text-primary-foreground">
              {post.category}
            </Badge>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl mb-6">
              {post.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <div>
                  <p>{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-5 w-5" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-12">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 mb-12 pb-8 border-b border-border">
              <span className="text-muted-foreground">Share:</span>
              <Button variant="outline" size="icon" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(`https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`, '_blank')}
              >
                <Twitter className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => window.open(`https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }}></div>

            {/* Call to Action */}
            <div className="mt-12 p-8 bg-muted rounded-xl text-center">
              <h3 className="mb-4">Start Your Learning Journey</h3>
              <p className="text-muted-foreground mb-6">
                Join thousands of Muslims earning while learning the Qur'an
              </p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={() => window.open('https://chat.whatsapp.com/Ej08ZEjAnlyAS7vE6uY7W8', '_blank')}
              >
                Join Waitlist
              </Button>
            </div>

            {/* Comment Section */}
            <CommentSection postSlug={post.slug} postTitle={post.title} />
          </div>
        </article>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
