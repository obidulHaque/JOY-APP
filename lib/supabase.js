import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ojqesbgbrumoezrzdzxt.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9qcWVzYmdicnVtb2V6cnpkenh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0OTMxMzYsImV4cCI6MjA1MTA2OTEzNn0.p3KRL7y8kC5w9ZExQotii9MFgShKnE1qrNMaEx8dOe0";

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
