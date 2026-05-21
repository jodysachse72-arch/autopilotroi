-- Migration: 20260521_puck_media_bucket.sql
-- Creates Supabase Storage bucket for AutoPuck image uploads.
--
-- Bucket: puck-media
-- Public: yes (images are served on the public site)
-- File size limit: 5 MB
-- Allowed types: image/jpeg, image/png, image/webp, image/gif, image/svg+xml

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'puck-media',
  'puck-media',
  true,
  5242880,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to all files in the bucket
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects'
      AND schemaname = 'storage'
      AND policyname = 'puck-media public read'
  ) THEN
    CREATE POLICY "puck-media public read"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'puck-media');
  END IF;
END $$;

-- Allow authenticated uploads (service role handles this via API)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects'
      AND schemaname = 'storage'
      AND policyname = 'puck-media service insert'
  ) THEN
    CREATE POLICY "puck-media service insert"
      ON storage.objects FOR INSERT
      WITH CHECK (bucket_id = 'puck-media');
  END IF;
END $$;

COMMENT ON COLUMN storage.buckets.id IS
  'puck-media: AutoPuck editor image uploads. Max 5 MB. Public access for site rendering.';
