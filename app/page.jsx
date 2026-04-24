"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)

  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    checkUser()

    supabase.auth.onAuthStateChange(() => {
      checkUser()
    })
  }, [])

  async function checkUser() {
    const { data } = await supabase.auth.getUser()

    if (data.user) {
      setUser(data.user)
      loadProfile(data.user.id)
    }

    setLoading(false)
  }

  async function loadProfile(uid) {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", uid)
      .single()

    if (data) setProfile(data)
  }

  async function login() {
    await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin
      }
    })

    alert("Confira seu email.")
  }

  async function saveProfile() {
    if (!avatar) {
      alert("Escolha foto")
      return
    }

    const fileName = Date.now() + avatar.name

    await supabase.storage
      .from("avatars")
      .upload(fileName, avatar)

    const { data } = supabase
      .storage
      .from("avatars")
      .getPublicUrl(fileName)

    const avatar_url = data.publicUrl

    const { error } = await supabase.from("profiles").insert({
      id: user.id,
      username,
      name,
      bio,
      avatar_url
    })

    if (error) {
      alert(error.message)
      return
    }

    loadProfile(user.id)
  }

  async function logout() {
    await supabase.auth.signOut()
    location.reload()
  }

  if (loading) return <div className="center">Carregando...</div>

  if (!user) {
    return (
      <div className="box">
        <h1>Drops Lite</h1>

        <input
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={login}>Entrar por Email</button>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="box">
        <h1>Criar Perfil</h1>

        <input
          placeholder="@username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          placeholder="Nome exibido"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setAvatar(e.target.files[0])}
        />

        <button onClick={saveProfile}>Salvar Perfil</button>
      </div>
    )
  }

  return (
    <div className="box">
      <img src={profile.avatar_url} className="avatar" />

      <h2>@{profile.username}</h2>
      <h3>{profile.name}</h3>
      <p>{profile.bio}</p>

      <button onClick={logout}>Sair</button>
    </div>
  )
}
