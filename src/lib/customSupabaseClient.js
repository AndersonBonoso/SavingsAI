import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kzejlxypxyuocfqabkot.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt6ZWpseHlweHl1b2NmcWFia290Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0MDg0NzIsImV4cCI6MjA2OTk4NDQ3Mn0.3oJCAtCW9PBuvGlfXnq0FVLMg4xH5miJ-pgpWi2sHSk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);