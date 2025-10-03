import { createClient } from '@supabase/supabase-js';

// This file configures the Supabase client.
// It's essential for connecting the app to your Supabase backend.

// IMPORTANT: Replace the placeholder values below with your actual Supabase project URL and Anon Key.
// You can find these in your Supabase project's settings under "API".
// For production applications, it's highly recommended to use environment variables
// (e.g., process.env.REACT_APP_SUPABASE_URL) instead of hardcoding these values.
const supabaseUrl = 'https://zurncyszhzuesiifbfmu.supabase.co'; // e.g., 'https://your-project-id.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cm5jeXN6aHp1ZXNpaWZiZm11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1MDQ5NzEsImV4cCI6MjA3NTA4MDk3MX0.nli22s4mc1rRFILKfhr9suohWRXgeoxH4yKvyffbjvI'; // e.g., 'ey...'

export const supabase = createClient(supabaseUrl, supabaseKey);