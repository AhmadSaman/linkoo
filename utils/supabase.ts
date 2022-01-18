import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.DB_URL || "";
const supabaseAnonKey = process.env.DB_API_KEY || "";
export default createClient(supabaseUrl, supabaseAnonKey);
