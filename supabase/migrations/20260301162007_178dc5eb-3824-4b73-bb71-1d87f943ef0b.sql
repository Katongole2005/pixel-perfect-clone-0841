ALTER TABLE public.trip_requests 
  ADD COLUMN special_occasion TEXT,
  ADD COLUMN dietary_requirements TEXT[] DEFAULT '{}'::text[],
  ADD COLUMN accommodation_preference TEXT;