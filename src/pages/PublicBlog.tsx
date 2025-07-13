import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, Tag, Share2, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  meta_title: string;
  meta_description: string;
  tags: string[];
  published_at: string;
  user_id: string;
}

const PublicBlog = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check auth state
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    
    checkAuth();
    fetchBlog();
    trackPageView();
  }, [slug]);

  const fetchBlog = async () => {
    if (!slug) return;

    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Blog post not found",
        variant: "destructive",
      });
      navigate("/");
    } else if (data) {
      setBlog(data);
      // Update SEO meta tags
      document.title = data.meta_title || data.title;
      
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', data.meta_description || data.excerpt);
      }
    }
    
    setLoading(false);
  };

  const trackPageView = async () => {
    try {
      // Get user's location info (simplified - in production you'd use a proper IP geolocation service)
      const response = await fetch('https://ipapi.co/json/');
      const locationData = await response.json();
      
      await supabase
        .from('analytics')
        .insert([{
          page_path: `/blog/${slug}`,
          user_agent: navigator.userAgent,
          country: locationData.country_name,
          city: locationData.city,
          referrer: document.referrer,
          session_id: sessionStorage.getItem('session_id') || 'anonymous'
        }]);
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  };

  const renderMarkdown = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-primary hover:underline">$1</a>')
      .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-primary pl-4 italic">$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
      .replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm">$1</code>')
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="w-full h-auto rounded-lg my-4" />')
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, '<br>');
  };

  const sharePost = () => {
    if (navigator.share) {
      navigator.share({
        title: blog?.title,
        text: blog?.excerpt,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Blog post link has been copied to clipboard.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog post not found</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <Button variant="outline" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={sharePost}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            {user && user.id === blog.user_id && (
              <Button size="sm" onClick={() => navigate(`/blog/edit/${blog.id}`)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        </div>

        <article>
          {blog.featured_image && (
            <div className="mb-8">
              <img 
                src={blog.featured_image} 
                alt={blog.title}
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
          )}

          <header className="mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 gradient-text">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blog.published_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{Math.ceil(blog.content.length / 1000)} min read</span>
              </div>
            </div>

            {blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </header>

          <Card>
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: `<p class="mb-4">${renderMarkdown(blog.content)}</p>` 
                }}
              />
            </CardContent>
          </Card>

          <div className="mt-8 pt-8 border-t">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-2">Share this article</h3>
                <Button variant="outline" onClick={sharePost}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Article
                </Button>
              </div>
              
              {user && user.id === blog.user_id && (
                <Button onClick={() => navigate(`/blog/edit/${blog.id}`)}>
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Post
                </Button>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PublicBlog;