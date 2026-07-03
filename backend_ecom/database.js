import { createClient } from '@supabase/supabase-js'

const supabaseUrl ='https://dgpsijfptzkjkfiflvpr.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRncHNpamZwdHpramtmaWZsdnByIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTU4Mjg3MSwiZXhwIjoyMDk3MTU4ODcxfQ.Cjy9H2YTCmWDTme5jUOe8D_KUni0yRTsBRgUrQGCJJ4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
