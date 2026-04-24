"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // detectar sessão salva
  useEffect(() => {
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setUser(session?.user ?? null);
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

    if (error) {
      alert(error.message);
    } else {
      alert("Confira seu email.");
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (loading) return <div style={styles.loading}>Carregando...</div>;

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>Drops Lite</h1>

      {!user ? (
        <>
          <input
            style={styles.input}
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button style={styles.button} onClick={login}>
            Entrar por Email
          </button>
        </>
      ) : (
        <>
          <div style={styles.card}>
            <p style={styles.label}>Logado como:</p>
            <strong>{user.email}</strong>
          </div>

          <h2 style={styles.subtitle}>Nearby</h2>

          <button style={styles.button} onClick={logout}>
            Sair
          </button>
        </>
      )}
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#00163a",
    padding: "40px",
    color: "white",
    fontFamily: "Arial",
  },
  title: {
    fontSize: "54px",
    fontWeight: "bold",
    color: "#3b82f6",
    marginBottom: "30px",
  },
  subtitle: {
    fontSize: "32px",
    marginTop: "30px",
  },
  input: {
    width: "100%",
    padding: "20px",
    fontSize: "30px",
    borderRadius: "20px",
    border: "none",
    marginBottom: "25px",
  },
  button: {
    width: "100%",
    padding: "22px",
    fontSize: "28px",
    borderRadius: "22px",
    border: "none",
    background: "#3b82f6",
    color: "white",
    fontWeight: "bold",
  },
  card: {
    background: "#0f275a",
    padding: "25px",
    borderRadius: "22px",
    fontSize: "28px",
  },
  label: {
    opacity: 0.8,
    marginBottom: "10px",
  },
  loading: {
    minHeight: "100vh",
    background: "#00163a",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "28px",
  },
};
