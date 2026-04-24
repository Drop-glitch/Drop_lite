// app/page.jsx

"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Page() {
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(true)
  const [profiles, setProfiles] = useState([])

  useEffect(() => {
    checkUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkUser()
    })

    return () => subscription.unsubscribe()
  }, [])

  async function checkUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    setUser(user)

    if (user) loadNearby()

    setLoading(false)
  }

  async function sendLogin() {
    if (!email) return

    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    })

    alert("Código/link enviado para seu email.")
  }

  async function loadNearby() {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .order("last_active", { ascending: false })

    setProfiles(data || [])
  }

  async function logout() {
    await supabase.auth.signOut()
    setUser(null)
  }

  if (loading) return <main className="box">Carregando...</main>

  if (!user)
    return (
      <main className="box">
        <h1>Drops Lite</h1>
        <p>Conecte-se com quem está por perto</p>

        <input
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={sendLogin}>Entrar por Email</button>
      </main>
    )

  return (
    <main className="box">
      <h1>Drops Lite</h1>

      <div className="card">
        <p>Logado como:</p>
        <strong>{user.email}</strong>
      </div>

      <h2>Nearby</h2>

      {profiles.map((item) => (
        <div className="card" key={item.id}>
          <strong>@{item.username}</strong>
          <p>{item.bio}</p>
        </div>
      ))}

      <button onClick={logout}>Sair</button>
    </main>
  )
}
