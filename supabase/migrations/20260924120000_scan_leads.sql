CREATE TABLE public.scan_leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  answers JSONB NOT NULL,
  score JSONB NOT NULL,
  richting TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.scan_leads TO anon, authenticated;
GRANT ALL ON public.scan_leads TO service_role;

ALTER TABLE public.scan_leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a scan lead"
  ON public.scan_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
