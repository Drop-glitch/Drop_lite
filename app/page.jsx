"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

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
    if (!email) {
      alert("Digite seu email");
      return;
    }

    setSending(true);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "https://drop-lite-delta.vercel.app",
      },
    });

    setSending(false);

    if (error) {
      alert(error.message);
    } else {
      alert("Código/link enviado para seu email.");
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  if (loading) {
    return (
      <main style={styles.page}>
        <p style={styles.text}>Carregando...</p>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <h1 style={styles.title}>Drops Lite</h1>

      {!user ? (
        <>
          <p style={styles.subtitle}>Conecte-se com quem está por perto</p>

          <input
            type="email"
            placeholder="Seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <button
            onClick={login}
            disabled={sending}
            style={styles.button}
          >
            {sending ? "Enviando..." : "Entrar por Email"}
          </button>
        </>
      ) : (
        <>
          <div style={styles.card}>
            <p style={styles.label}>Logado como:</p>
            <strong>{user.email}</strong>
          </div>

          <div style={styles.card}>
            <h2 style={styles.section}>Nearby</h2>
            <p style={styles.text}>Pack 2 em construção...</p>
          </div>

          <button onClick={logout} style={styles.button}>
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
    padding: "30px",
    color: "white",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "56px",
    fontWeight: "bold",
    color: "#3b82f6",
    marginBottom: "20px",
  },
  subtitle: {
    fontSize: "22px",
    opacity: 0.9,
    marginBottom: "25px",
  },
  input: {
    width: "100%",
    padding: "20px",
    fontSize: "28px",
    borderRadius: "20px",
    border: "none",
    marginBottom: "22px",
    boxSizing: "border-box",
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
    marginBottom: "20px",
  },
  card: {
    background: "#0f275a",
    padding: "24px",
    borderRadius: "22px",
    marginBottom: "20px",
  },
  label: {
    opacity: 0.8,
    marginBottom: "10px",
    fontSize: "20px",
  },
  section: {
    fontSize: "32px",
    marginBottom: "10px",
  },
  text: {
    fontSize: "22px",
    margin: 0,
  },
};
