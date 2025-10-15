import { Calendar, Clock, ArrowRight, Filter } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Footer } from "./Footer";
import { motion } from "motion/react";

interface BlogPageProps {
  onNavigate?: (page: string) => void;
}

export function BlogPage({ onNavigate }: BlogPageProps) {
  const articles = [
    {
      id: 1,
      title: "The Virtues of Seeking Knowledge in Islam",
      excerpt: "Discover why the pursuit of knowledge is considered one of the highest forms of worship in our beautiful faith.",
      category: "Articles",
      date: "Oct 10, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdXJhbiUyMHJlYWRpbmclMjBiZWF1dGlmdWx8ZW58MXx8fHwxNzYwMzMzNTI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      featured: true,
    },
    {
      id: 2,
      title: "Understanding Halal Finance in the Digital Age",
      excerpt: "How modern technology is making halal earning more accessible to Muslims worldwide.",
      category: "Articles",
      date: "Oct 8, 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwY2FsbGlncmFwaHklMjBhcnR8ZW58MXx8fHwxNzYwMzMzNTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false,
    },
    {
      id: 3,
      title: "IqraPay Reaches 10,000 Users Milestone",
      excerpt: "Celebrating our growing community of learners and the impact we're making together.",
      category: "Highlights",
      date: "Oct 5, 2025",
      readTime: "3 min read",
      image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjBjb21tdW5pdHklMjBtb3NxdWV8ZW58MXx8fHwxNzYwMzMzNTI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false,
    },
    {
      id: 4,
      title: "New Tafsir Course Released: Surah Al-Kahf",
      excerpt: "Dive deep into the meanings and lessons of this profound chapter with Sheikh Abdullah.",
      category: "Announcements",
      date: "Oct 1, 2025",
      readTime: "2 min read",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwZWR1Y2F0aW9uJTIwYm9va3N8ZW58MXx8fHwxNzYwMzMzNTMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false,
    },
    {
      id: 5,
      title: "5 Tips for Consistent Qur'an Reading",
      excerpt: "Practical advice to help you build and maintain a strong connection with the Qur'an.",
      category: "Articles",
      date: "Sep 28, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjBzdHVkZW50cyUyMGxlYXJuaW5nfGVufDF8fHx8MTc2MDMzMzUyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false,
    },
    {
      id: 6,
      title: "Ambassador Program Launch",
      excerpt: "We're excited to announce the launch of our Ambassador Program. Apply now to join!",
      category: "Announcements",
      date: "Sep 25, 2025",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1583391733981-5978aaf40f3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG11c2xpbSUyMHdvbWFufGVufDF8fHx8MTc2MDMzMzUzMXww&ixlib=rb-4.1.0&q=80&w=1080",
      featured: false,
    },
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Articles":
        return "bg-primary/10 text-primary hover:bg-primary/20";
      case "Highlights":
        return "bg-secondary/10 text-secondary hover:bg-secondary/20";
      case "Announcements":
        return "bg-accent/50 text-accent-foreground hover:bg-accent/70";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filterArticles = (category: string) => {
    if (category === "all") return articles;
    return articles.filter((article) => article.category === category);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl mb-4">Blog & Updates</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay informed with the latest insights, announcements, and stories from the IqraPay community
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tabs Filter */}
      <section className="px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-center mb-8">
              <TabsList className="inline-flex">
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="Articles">Articles</TabsTrigger>
                <TabsTrigger value="Highlights">Highlights</TabsTrigger>
                <TabsTrigger value="Announcements">Announcements</TabsTrigger>
              </TabsList>
            </div>

            {["all", "Articles", "Highlights", "Announcements"].map((category) => (
              <TabsContent key={category} value={category}>
                {/* Featured Post (only for "all" tab) */}
                {category === "all" && articles.find((a) => a.featured) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                  >
                    {articles
                      .filter((a) => a.featured)
                      .map((article) => (
                        <Card key={article.id} className="overflow-hidden hover:shadow-xl transition-shadow">
                          <div className="grid lg:grid-cols-2 gap-0">
                            <div className="relative h-[300px] lg:h-auto">
                              <ImageWithFallback
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover"
                              />
                              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">
                                Featured
                              </Badge>
                            </div>
                            <div className="p-8 flex flex-col justify-center">
                              <Badge className={`${getCategoryColor(article.category)} w-fit mb-4`}>
                                {article.category}
                              </Badge>
                              <h2 className="text-3xl mb-4">{article.title}</h2>
                              <p className="text-muted-foreground mb-6">{article.excerpt}</p>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {article.date}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {article.readTime}
                                </div>
                              </div>
                              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-fit">
                                Read Article <ArrowRight className="h-4 w-4 ml-2" />
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))}
                  </motion.div>
                )}

                {/* Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterArticles(category)
                    .filter((a) => !a.featured || category !== "all")
                    .map((article, index) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
                          <div className="relative h-48">
                            <ImageWithFallback
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-6 flex flex-col flex-1">
                            <Badge className={`${getCategoryColor(article.category)} w-fit mb-3`}>
                              {article.category}
                            </Badge>
                            <h3 className="text-xl mb-3">{article.title}</h3>
                            <p className="text-muted-foreground text-sm mb-4 flex-1">{article.excerpt}</p>
                            <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {article.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {article.readTime}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl mb-4">Stay Updated</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Subscribe to our newsletter for the latest articles, announcements, and insights
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No spam, just valuable content. Unsubscribe anytime.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
