-- Create managed_reviews table
CREATE TABLE public.managed_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  author TEXT NOT NULL,
  location TEXT,
  date TEXT,
  rating INTEGER NOT NULL DEFAULT 5,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  trip TEXT,
  trip_type TEXT,
  verified BOOLEAN DEFAULT true,
  helpful_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.managed_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published reviews"
  ON public.managed_reviews FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage reviews"
  ON public.managed_reviews FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Create managed_travel_topics table
CREATE TABLE public.managed_travel_topics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  image_url TEXT,
  trip_count INTEGER DEFAULT 0,
  slug TEXT,
  is_published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.managed_travel_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published topics"
  ON public.managed_travel_topics FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage topics"
  ON public.managed_travel_topics FOR ALL
  USING (public.has_role(auth.uid(), 'admin'::app_role));