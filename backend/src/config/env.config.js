import 'dotenv/config';

export default {
    PORT: process.env.PORT,
    SUPABASE_CONNECTION_STRING: process.env.SUPABASE_CONNECTION_STRING,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
}