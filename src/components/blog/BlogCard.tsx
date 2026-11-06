import { Calendar, Clock, User } from 'lucide-react';
import { BlogPost } from '../../types/blog';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { useLanguage } from '../../contexts/LanguageContext';

interface BlogCardProps {
  post: BlogPost;
  onNavigate: (slug: string) => void;
}

export function BlogCard({ post, onNavigate }: BlogCardProps) {
  const { language, t } = useLanguage();
  const categoryKeys: Record<string, string> = {
    'Quranic Studies': 'blog.categoryQuranicStudies',
    'Islamic Finance': 'blog.categoryIslamicFinance',
    'Platform Updates': 'blog.categoryPlatformUpdates',
    Community: 'blog.categoryCommunity',
  };
  const readTime = post.readTime.replace('min read', t('blog.minRead'));

  return (
    <Card
      className="group cursor-pointer overflow-hidden border border-border hover:border-primary transition-all duration-300 hover:shadow-lg"
      onClick={() => onNavigate(post.slug)}
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary text-primary-foreground">
            {categoryKeys[post.category] ? t(categoryKeys[post.category]) : post.category}
          </Badge>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.publishedAt).toLocaleDateString(language, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div>
        
        <button className="text-primary hover:text-primary/80 transition-colors flex items-center gap-2">
          {t('blog.readMoreButton')} →
        </button>
      </div>
    </Card>
  );
}
