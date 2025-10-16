import { useState } from 'react';
import { Search } from 'lucide-react';
import { BlogCard } from './BlogCard';
import { Footer } from '../Footer';
import { IslamicPattern } from '../IslamicPattern';
import { NewsletterSubscribe } from '../NewsletterSubscribe';
import { blogCategories } from '../../data/mockBlogPosts';
import { useBlog } from '../../contexts/BlogContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

interface BlogListPageProps {
  onNavigate: (page: string) => void;
  onNavigateToPost: (slug: string) => void;
}

export function BlogListPage({ onNavigate, onNavigateToPost }: BlogListPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { posts } = useBlog();
  const { t } = useLanguage();

  // Filter only published posts
  const publishedPosts = posts.filter(post => post.status === 'published');

  const filteredPosts = publishedPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || 
      post.category.toLowerCase() === blogCategories.find(c => c.slug === selectedCategory)?.name.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="relative overflow-hidden">
        <IslamicPattern opacity={0.03} />
        
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl mb-6">
              {t('blog.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t('blog.subtitle')}
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={t('blog.searchPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 rounded-xl border-2 focus:border-primary"
              />
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="relative px-4 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 justify-center">
              {blogCategories.map((category) => (
                <Badge
                  key={category.id}
                  variant={selectedCategory === category.slug ? 'default' : 'outline'}
                  className={`cursor-pointer px-6 py-2 transition-all ${
                    selectedCategory === category.slug
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  {category.name}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="relative px-4 pb-20">
          <div className="max-w-7xl mx-auto">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} onNavigate={onNavigateToPost} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground">
                  {t('blog.noResults')}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Newsletter Subscription */}
      <NewsletterSubscribe />

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
