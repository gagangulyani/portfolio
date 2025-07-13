import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, ArrowRight, Search, Tag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [publishedBlogs, setPublishedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPublishedBlogs();
  }, []);

  const fetchPublishedBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) throw error;
      setPublishedBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const dummyBlogPosts = [
    {
      title: "Automating Your Workflow with Python: File Organizer",
      excerpt: "Learn how I built a Python script to automatically organize my downloads folder, saving hours of manual work every week.",
      category: "Python",
      date: "2024-01-15",
      readTime: "5 min read",
      tags: ["Python", "Automation", "Productivity"],
      slug: "automating-workflow-python-file-organizer",
      featured: true
    },
    {
      title: "Building Scalable React Applications with TypeScript",
      excerpt: "Best practices for structuring large React applications with TypeScript, including component architecture and state management.",
      category: "React",
      date: "2024-01-10",
      readTime: "8 min read",
      tags: ["React", "TypeScript", "Architecture"],
      slug: "scalable-react-typescript-applications"
    },
    {
      title: "From Code to Community: Building Tech Communities",
      excerpt: "My journey in community building and the lessons learned while growing tech communities from scratch.",
      category: "Community",
      date: "2024-01-05",
      readTime: "6 min read",
      tags: ["Community", "Leadership", "Tech"],
      slug: "building-tech-communities"
    },
    {
      title: "The Intersection of Music and Technology",
      excerpt: "How my background in music production has influenced my approach to software development and creative problem-solving.",
      category: "Personal",
      date: "2023-12-28",
      readTime: "4 min read",
      tags: ["Music", "Technology", "Creativity"],
      slug: "music-technology-intersection"
    },
    {
      title: "Google Workspace Automation: Patronum Deep Dive",
      excerpt: "Technical insights into building enterprise automation tools for Google Workspace and the challenges we solved.",
      category: "Enterprise",
      date: "2023-12-20",
      readTime: "10 min read",
      tags: ["Google APIs", "Automation", "Enterprise"],
      slug: "google-workspace-automation-patronum"
    },
    {
      title: "Modern Web Development Stack: My 2024 Recommendations",
      excerpt: "A comprehensive guide to the technologies and tools I recommend for modern web development projects.",
      category: "Web Dev",
      date: "2023-12-15",
      readTime: "7 min read",
      tags: ["Web Development", "Tools", "Stack"],
      slug: "modern-web-development-stack-2024"
    }
  ];

  // Combine published blogs from database with dummy data for demo
  const allBlogPosts = [...publishedBlogs.map(blog => ({
    title: blog.title,
    excerpt: blog.excerpt || blog.content.substring(0, 150) + '...',
    category: blog.tags?.[0] || "General",
    date: blog.published_at || blog.created_at,
    readTime: Math.ceil(blog.content.length / 1000) + " min read",
    tags: blog.tags || [],
    slug: blog.slug,
    featured: false
  })), ...dummyBlogPosts];

  const categories = ["All", ...new Set(allBlogPosts.map(post => post.category))];

  const filteredPosts = allBlogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Blog & Insights
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Latest <span className="gradient-text">Articles</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Sharing insights about technology, development, and the intersection of code and creativity
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search articles, tags, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/20 transition-colors px-3 py-1"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && filteredPosts[0].featured && (
          <Card className="card-hover clean-border mb-12">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                <Badge variant="outline">{filteredPosts[0].category}</Badge>
              </div>
              <CardTitle className="text-3xl gradient-text hover:text-primary transition-colors cursor-pointer">
                {filteredPosts[0].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {filteredPosts[0].excerpt}
              </p>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(filteredPosts[0].date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{filteredPosts[0].readTime}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {filteredPosts[0].tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <Button 
                className="mt-4"
                onClick={() => filteredPosts[0].slug ? navigate(`/blog/${filteredPosts[0].slug}`) : window.open('#', '_blank')}
              >
                Read Full Article
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.slice(filteredPosts[0]?.featured ? 1 : 0).map((post, index) => (
            <Card key={index} className="card-hover clean-border group">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {post.category}
                  </Badge>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-xl gradient-text group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
                  {post.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(post.date)}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {post.tags.length > 2 && (
                    <Badge variant="secondary" className="text-xs">
                      +{post.tags.length - 2}
                    </Badge>
                  )}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full justify-between p-0 h-auto text-primary hover:text-primary-foreground"
                  onClick={() => post.slug ? navigate(`/blog/${post.slug}`) : window.open('#', '_blank')}
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No articles found matching your search criteria.
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Articles
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Blog;