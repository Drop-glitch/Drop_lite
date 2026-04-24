"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    start();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      start();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function start() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const currentUser = session?.user ?? null;

    setUser(currentUser);

    if (currentUser) {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUser.id)
        .single();

      setProfile(data || null);
    }

    setLoading(false);
  }

  async function login() {
    if (!email) return alert("Digite seu email");

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) alert(error.message);
    else alert("Confira seu email.");
  }

  async function createProfile() {
    if (!username || !name) {
      alert("Preencha username e nome");
      return;
    }

    const { error } = await supabase.from("profiles").insert({
      id: user.id,
      username,
      name,
      bio,
    });

    if (error) {
      alert(error.message);
      return;
    }

    start();
  }

  async function logout() {
    await supabase.auth.signOut();
    location.reload();
  }

  if (loading) {
    return <main style={styles.page}>Carregando...</main>;
  }

  if (!user) {
    return (
      <main style={styles.page}>
        <h1 style={styles.logo}>Drops Lite</h1>

        <input
          style={styles.input}
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button style={styles.button} onClick={login}>
          Entrar por Email
        </button>
      </main>
    );
  }

  if (!profile) {
    return (
      <main style={styles.page}>
        <h1 style={styles.logo}>Criar Perfil</h1>

        <input
          style={styles.input}
          placeholder="@username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Nome exibido"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />

        <button style={styles.button} onClick={createProfile}>
          Salvar Perfil
        </button>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <h1 style={styles.logo}>Drops Lite</h1>

      <div style={styles.card}>
        <strong>@{profile.username}</strong>
        <h2>{profile.name}</h2>
        <p>{profile.bio}</p>
      </div>

      <button style={styles.button} onClick={logout}>
        Sair
      </button>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#00163a",
    padding: "24px",
    color: "white",
    fontFamily: "Arial",
  },

  logo: {
    fontSize: "40px",
    color: "#3b82f6",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "16px",
    borderRadius: "16px",
    border: "none",
    marginBottom: "14px",
    fontSize: "18px",
  },

  button: {
    width: "100%",
    padding: "16px",
    borderRadius: "16px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
  },

  card: {
    background: "#0f275a",
    padding: "20px",
    borderRadius: "18px",
    marginBottom: "18px",
  },
};
