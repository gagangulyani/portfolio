-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  bio TEXT,
  website TEXT,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blogs table
CREATE TABLE public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT[],
  tags TEXT[],
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create newsletters table
CREATE TABLE public.newsletters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  subject TEXT NOT NULL,
  template_data JSONB DEFAULT '{}',
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create analytics table for tracking page views
CREATE TABLE public.analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path TEXT NOT NULL,
  user_agent TEXT,
  ip_address INET,
  country TEXT,
  city TEXT,
  referrer TEXT,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog analytics table for tracking blog performance
CREATE TABLE public.blog_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_id UUID NOT NULL REFERENCES public.blogs(id) ON DELETE CASCADE,
  page_views INTEGER DEFAULT 0,
  unique_views INTEGER DEFAULT 0,
  time_on_page INTEGER DEFAULT 0,
  bounce_rate DECIMAL(5,2) DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_analytics ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Blogs policies
CREATE POLICY "Published blogs are viewable by everyone" ON public.blogs
  FOR SELECT USING (published = true);

CREATE POLICY "Users can view their own blogs" ON public.blogs
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own blogs" ON public.blogs
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own blogs" ON public.blogs
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own blogs" ON public.blogs
  FOR DELETE USING (auth.uid() = user_id);

-- Newsletters policies
CREATE POLICY "Users can manage their own newsletters" ON public.newsletters
  FOR ALL USING (auth.uid() = user_id);

-- Analytics policies (admin only - for now allow all reads for simplicity)
CREATE POLICY "Analytics are viewable by authenticated users" ON public.analytics
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Analytics can be inserted by anyone" ON public.analytics
  FOR INSERT WITH CHECK (true);

-- Blog analytics policies
CREATE POLICY "Blog analytics are viewable by blog owners" ON public.blog_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.blogs 
      WHERE blogs.id = blog_analytics.blog_id 
      AND blogs.user_id = auth.uid()
    )
  );

CREATE POLICY "Blog analytics can be updated by anyone" ON public.blog_analytics
  FOR ALL WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_blogs_published ON public.blogs(published, published_at DESC);
CREATE INDEX idx_blogs_slug ON public.blogs(slug);
CREATE INDEX idx_blogs_user_id ON public.blogs(user_id);
CREATE INDEX idx_analytics_page_path ON public.analytics(page_path);
CREATE INDEX idx_analytics_created_at ON public.analytics(created_at);
CREATE INDEX idx_blog_analytics_blog_id ON public.blog_analytics(blog_id);

-- Create function to auto-update timestamps
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for auto-updating timestamps
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_blogs_updated_at
  BEFORE UPDATE ON public.blogs
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_newsletters_updated_at
  BEFORE UPDATE ON public.newsletters
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to create or update blog analytics
CREATE OR REPLACE FUNCTION public.upsert_blog_analytics(blog_uuid UUID)
RETURNS void AS $$
BEGIN
  INSERT INTO public.blog_analytics (blog_id, page_views, unique_views)
  VALUES (blog_uuid, 1, 1)
  ON CONFLICT (blog_id) DO UPDATE SET
    page_views = blog_analytics.page_views + 1,
    last_updated = NOW();
END;
$$ LANGUAGE plpgsql;

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();