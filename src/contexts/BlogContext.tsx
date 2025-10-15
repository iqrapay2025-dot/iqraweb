import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BlogPost } from '../types/blog';
import { mockBlogPosts } from '../data/mockBlogPosts';

interface BlogContextType {
  posts: BlogPost[];
  addPost: (post: BlogPost) => void;
  updatePost: (id: string, post: BlogPost) => void;
  deletePost: (id: string) => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const STORAGE_KEY = 'iqrapay_blog_posts';

export function BlogProvider({ children }: { children: ReactNode }) {
  // Initialize posts from localStorage or use mock data
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const storedPosts = localStorage.getItem(STORAGE_KEY);
      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts);
        console.log('✅ Loaded posts from localStorage:', parsedPosts.length, 'posts');
        return parsedPosts;
      } else {
        console.log('ℹ️ No stored posts found, using mock data');
      }
    } catch (error) {
      console.error('❌ Error loading posts from localStorage:', error);
    }
    return mockBlogPosts;
  });

  // Save posts to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
      console.log('💾 Saved', posts.length, 'posts to localStorage');
    } catch (error) {
      console.error('❌ Error saving posts to localStorage:', error);
    }
  }, [posts]);

  const addPost = (post: BlogPost) => {
    setPosts((prevPosts) => [post, ...prevPosts]);
  };

  const updatePost = (id: string, updatedPost: BlogPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === id ? updatedPost : post))
    );
  };

  const deletePost = (id: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  return (
    <BlogContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}
