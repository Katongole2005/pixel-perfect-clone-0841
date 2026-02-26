
CREATE TABLE public.trip_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  earliest_arrival DATE NOT NULL,
  latest_arrival DATE NOT NULL,
  duration_days INTEGER NOT NULL,
  budget_per_person NUMERIC NOT NULL,
  guide_language TEXT NOT NULL DEFAULT 'English',
  num_adults INTEGER NOT NULL DEFAULT 1,
  num_children INTEGER NOT NULL DEFAULT 0,
  travel_types TEXT[] DEFAULT '{}',
  animals TEXT[] DEFAULT '{}',
  travel_experience TEXT[] DEFAULT '{}',
  other_destinations TEXT[] DEFAULT '{}',
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  message TEXT,
  privacy_accepted BOOLEAN NOT NULL DEFAULT false,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.trip_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert trip requests"
  ON public.trip_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can read trip requests"
  ON public.trip_requests FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update trip requests"
  ON public.trip_requests FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete trip requests"
  ON public.trip_requests FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));
