import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, 
  Users, 
  Eye, 
  Clock, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash,
  Globe,
  Calendar,
  MapPin,
  FileText,
  Mail
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Blog {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  published_at: string;
  created_at: string;
}

interface Analytics {
  page_views: number;
  unique_views: number;
  top_countries: { country: string; count: number }[];
  recent_visitors: { country: string; city: string; created_at: string }[];
}

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      setUser(session.user);
      fetchDashboardData();
    };

    checkAuth();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch blogs
      const { data: blogsData, error: blogsError } = await supabase
        .from('blogs')
        .select('id, title, slug, published, published_at, created_at')
        .order('created_at', { ascending: false });

      if (blogsError) throw blogsError;
      setBlogs(blogsData || []);

      // Fetch analytics
      const { data: analyticsData, error: analyticsError } = await supabase
        .from('analytics')
        .select('page_path, country, city, created_at')
        .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

      if (analyticsError) throw analyticsError;

      if (analyticsData) {
        const pageViews = analyticsData.length;
        const uniqueViews = new Set(analyticsData.map(a => a.page_path)).size;
        const countryCount = analyticsData.reduce((acc, curr) => {
          if (curr.country) {
            acc[curr.country] = (acc[curr.country] || 0) + 1;
          }
          return acc;
        }, {} as Record<string, number>);
        
        const topCountries = Object.entries(countryCount)
          .map(([country, count]) => ({ country, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        const recentVisitors = analyticsData
          .filter(a => a.country && a.city)
          .slice(0, 10)
          .map(a => ({ country: a.country, city: a.city, created_at: a.created_at }));

        setAnalytics({
          page_views: pageViews,
          unique_views: uniqueViews,
          top_countries: topCountries,
          recent_visitors: recentVisitors
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id: string) => {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete blog",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Blog deleted successfully",
      });
      fetchDashboardData();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.email}</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => navigate("/blog/new")}>
              <Plus className="w-4 h-4 mr-2" />
              New Blog Post
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              <Globe className="w-4 h-4 mr-2" />
              View Site
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="blogs">Blog Posts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="newsletters">Newsletters</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Blogs</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{blogs.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {blogs.filter(b => b.published).length} published
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics?.page_views || 0}</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{analytics?.unique_views || 0}</div>
                  <p className="text-xs text-muted-foreground">Last 30 days</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Growth</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12%</div>
                  <p className="text-xs text-muted-foreground">From last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Blog Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blogs.slice(0, 5).map((blog) => (
                      <div key={blog.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium truncate">{blog.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(blog.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={blog.published ? "default" : "secondary"}>
                          {blog.published ? "Published" : "Draft"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Countries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics?.top_countries.map((country, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{country.country}</span>
                        </div>
                        <Badge variant="outline">{country.count} visits</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="blogs">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Blog Posts</CardTitle>
                  <Button onClick={() => navigate("/blog/new")}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{blog.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(blog.created_at).toLocaleDateString()}
                          </span>
                          {blog.published && blog.published_at && (
                            <span>Published: {new Date(blog.published_at).toLocaleDateString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={blog.published ? "default" : "secondary"}>
                          {blog.published ? "Published" : "Draft"}
                        </Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate(`/blog/edit/${blog.id}`)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => deleteBlog(blog.id)}
                          className="text-destructive"
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Visitors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analytics?.recent_visitors.map((visitor, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{visitor.city}, {visitor.country}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {new Date(visitor.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Traffic Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Total Page Views</span>
                      <span className="font-bold">{analytics?.page_views || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Unique Visitors</span>
                      <span className="font-bold">{analytics?.unique_views || 0}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Bounce Rate</span>
                      <span className="font-bold">45%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Avg. Session Duration</span>
                      <span className="font-bold">2m 34s</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="newsletters">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Newsletters</CardTitle>
                  <Button onClick={() => navigate("/newsletter/new")}>
                    <Mail className="w-4 h-4 mr-2" />
                    New Newsletter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Newsletter management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;