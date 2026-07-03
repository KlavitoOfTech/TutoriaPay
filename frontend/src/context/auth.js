import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const handleSignUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password
    })
    return { data, error }
}
const handleSignIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    })
    return { data, error }
}
const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
}
const getCurrentUser = async () => {
    const { data } = await supabase.auth.onAuthStateChange(event, session)
    if (event === 'SIGNED_IN') {
        console.log('User signed in:', session.user)
    } else if (event === 'SIGNED_OUT') {
        console.log('User signed out')
    }}

export { handleSignUp, handleSignIn, handleSignOut, getCurrentUser }
