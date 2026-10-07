import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Home() {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate('/login')
      else setEmail(data.session.user.email ?? null)
    })
  }, [navigate])

  async function signOut() {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-slate-700">Logged in as {email}</p>
      <button onClick={signOut} className="rounded-lg bg-slate-800 text-white px-4 py-2">
        Sign out
      </button>
    </div>
  )
}