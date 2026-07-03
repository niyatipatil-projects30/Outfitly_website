import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dgpsijfptzkjkfiflvpr.supabase.co";

const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRncHNpamZwdHpramtmaWZsdnByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1ODI4NzEsImV4cCI6MjA5NzE1ODg3MX0.qzAB_02lWupd0LrtGnN3JcumjjatAb-I75hqEXJuTTU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);