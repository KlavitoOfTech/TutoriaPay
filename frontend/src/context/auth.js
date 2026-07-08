import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const handleSignUp = async (studentData) => {
    const { data, error } = await supabase.auth.signUp({
        email: studentData.email,
        password: studentData.password,
        options: {
            data: {
                full_name: studentData.full_name,
                email: studentData.email,
                phone: studentData.phone,
                role: 'student'
            }
        }
    })
    return { data, error }
}
const handleSignIn = async (studentData) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: studentData.email,
        password: studentData.password
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

export { supabase, handleSignUp, handleSignIn, handleSignOut, getCurrentUser }
