import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ojqesbgbrumoezrzdzxt.supabase.co";
const SUPABASE_KEY = "*****";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
