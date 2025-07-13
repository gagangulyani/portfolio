import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Save, 
  Eye, 
  ArrowLeft, 
  Upload, 
  Bold, 
  Italic, 
  Link,
  List,
  Quote,
  Code,
  Image as ImageIcon,
  Globe
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string[];
  tags: string[];
  published: boolean;
}

const BlogEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const [blog, setBlog] = useState<BlogPost>({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featured_image: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: [],
    tags: [],
    published: false
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      
      if (id) {
        fetchBlog();
      }
    };

    checkAuth();
  }, [id, navigate]);

  const fetchBlog = async () => {
    if (!id) return;
    
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load blog post",
        variant: "destructive",
      });
      navigate("/dashboard");
    } else if (data) {
      setBlog(data);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (title: string) => {
    setBlog(prev => ({
      ...prev,
      title,
      slug: generateSlug(title),
      meta_title: title
    }));
  };

  const autoFillMeta = () => {
    const excerpt = blog.content.substring(0, 160).replace(/[#*]/g, '');
    const keywords = blog.title.toLowerCase().split(' ').filter(word => word.length > 3);
    
    setBlog(prev => ({
      ...prev,
      excerpt,
      meta_description: excerpt,
      meta_keywords: keywords
    }));

    toast({
      title: "Meta information auto-filled",
      description: "Meta title, description, and keywords have been generated based on your content.",
    });
  };

  const insertMarkdown = (syntax: string) => {
    const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let newText = '';
    switch (syntax) {
      case 'bold':
        newText = `**${selectedText || 'bold text'}**`;
        break;
      case 'italic':
        newText = `*${selectedText || 'italic text'}*`;
        break;
      case 'link':
        newText = `[${selectedText || 'link text'}](url)`;
        break;
      case 'list':
        newText = `\n- ${selectedText || 'list item'}`;
        break;
      case 'quote':
        newText = `\n> ${selectedText || 'quote'}`;
        break;
      case 'code':
        newText = `\`${selectedText || 'code'}\``;
        break;
      case 'image':
        newText = `![alt text](image-url)`;
        break;
    }

    const newContent = 
      textarea.value.substring(0, start) + 
      newText + 
      textarea.value.substring(end);

    setBlog(prev => ({ ...prev, content: newContent }));
  };

  const saveBlog = async (publish = false) => {
    setSaving(true);
    
    const blogData = {
      ...blog,
      published: publish,
      published_at: publish ? new Date().toISOString() : null,
      user_id: user?.id
    };

    try {
      if (id) {
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([blogData]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Blog ${publish ? 'published' : 'saved'} successfully!`,
      });

      if (!id) {
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save blog",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const renderMarkdownPreview = (content: string) => {
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                {id ? 'Edit Blog Post' : 'New Blog Post'}
              </h1>
            </div>
          </div>
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              onClick={() => saveBlog(false)}
              disabled={saving}
            >
              <Save className="w-4 h-4 mr-2" />
              {saving ? 'Saving...' : 'Save Draft'}
            </Button>
            <Button 
              onClick={() => saveBlog(true)}
              disabled={saving}
            >
              <Globe className="w-4 h-4 mr-2" />
              {saving ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={blog.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter blog title..."
                    className="text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={blog.slug}
                    onChange={(e) => setBlog(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="blog-post-url"
                  />
                </div>

                <div>
                  <Label htmlFor="featured_image">Featured Image URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="featured_image"
                      value={blog.featured_image}
                      onChange={(e) => setBlog(prev => ({ ...prev, featured_image: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                    <Button variant="outline" size="icon">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Content</Label>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown('bold')}
                      >
                        <Bold className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown('italic')}
                      >
                        <Italic className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown('link')}
                      >
                        <Link className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown('list')}
                      >
                        <List className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown('quote')}
                      >
                        <Quote className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown('code')}
                      >
                        <Code className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => insertMarkdown('image')}
                      >
                        <ImageIcon className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <Tabs defaultValue="write">
                    <TabsList>
                      <TabsTrigger value="write">Write</TabsTrigger>
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="write">
                      <Textarea
                        name="content"
                        value={blog.content}
                        onChange={(e) => setBlog(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Write your blog content using Markdown..."
                        className="min-h-[400px] font-mono"
                      />
                    </TabsContent>
                    
                    <TabsContent value="preview">
                      <div 
                        className="min-h-[400px] p-4 border rounded-md prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{ 
                          __html: renderMarkdownPreview(blog.content) 
                        }}
                      />
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="published">Published</Label>
                  <Switch
                    id="published"
                    checked={blog.published}
                    onCheckedChange={(checked) => setBlog(prev => ({ ...prev, published: checked }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>SEO & Meta</CardTitle>
                  <Button variant="outline" size="sm" onClick={autoFillMeta}>
                    Auto-fill
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={blog.excerpt}
                    onChange={(e) => setBlog(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Short description..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    value={blog.meta_title}
                    onChange={(e) => setBlog(prev => ({ ...prev, meta_title: e.target.value }))}
                    placeholder="SEO title..."
                  />
                </div>

                <div>
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    value={blog.meta_description}
                    onChange={(e) => setBlog(prev => ({ ...prev, meta_description: e.target.value }))}
                    placeholder="SEO description..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={blog.tags.join(', ')}
                    onChange={(e) => setBlog(prev => ({ 
                      ...prev, 
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                    }))}
                    placeholder="tag1, tag2, tag3..."
                  />
                </div>

                <div>
                  <Label>Current Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {blog.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;