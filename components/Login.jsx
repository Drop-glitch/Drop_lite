'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [msg, setMsg] = useState('')

  async function entrar() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha
    })

    if (error) {
      setMsg(error.message)
    } else {
      setMsg('Entrou com sucesso')
      location.reload()
    }
  }

  async function cadastrar() {
    const { error } = await supabase.auth.signUp({
      email,
      password: senha
    })

    if (error) {
      setMsg(error.message)
    } else {
      setMsg('Conta criada. Verifique email.')
    }
  }

  return (
    <div className="login">
      <h1>Drops</h1>

      <input
        type="email"
        placeholder="Seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button onClick={entrar}>Entrar</button>
      <button onClick={cadastrar}>Criar Conta</button>

      <p>{msg}</p>
    </div>
  )
}
