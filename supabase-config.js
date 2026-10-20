const SUPABASE_URL = "https://uufvncxqtbrzevfsiasn.supabase.co/rest/v1/";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_0wJvA3i1HGWvN_oqs7Bohw__Sbo-k9l";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
