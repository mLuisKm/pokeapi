const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://imjutjbqyrjxlklfsnie.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImltanV0amJxeXJqeGxrbGZzbmllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM1NjY0NjcsImV4cCI6MjA2OTE0MjQ2N30.1y7ewVhETHBLS8Z6C4dYdXOCnlMGlrfRA6Tam7S3KdA'
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };