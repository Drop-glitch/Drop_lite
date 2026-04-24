"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("drops");

  useEffect(() => {
    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function getSession() {
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

  if (loading) {
    return <main style={styles.page}>Carregando...</main>;
  }

  if (!user) {
    return (
      <main style={styles.page}>
        <h1 style={styles.logo}>Drops Lite</h1>
        <p style={styles.sub}>Conecte-se com quem está por perto</p>

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

  return (
    <main style={styles.page}>
      <header style={styles.top}>
        <div>
          <h1 style={styles.logoSmall}>Drops Lite</h1>
          <p style={styles.userMail}>{user.email}</p>
        </div>

        <button style={styles.logoutMini} onClick={logout}>
          Sair
        </button>
      </header>

      {tab === "drops" ? (
        <>
          <section style={styles.profile}>
            <div style={styles.avatar}>JQ</div>

            <div>
              <h2 style={styles.username}>@username</h2>
              <p style={styles.bio}>Seu perfil público</p>

              <div style={styles.metrics}>
                <span>👁️ 0</span>
                <span>👥 0</span>
              </div>
            </div>
          </section>

          <section style={styles.grid}>
            <div style={styles.plus}>＋</div>
            <div style={styles.drop}>Drop</div>
            <div style={styles.drop}>Drop</div>
            <div style={styles.drop}>Drop</div>
            <div style={styles.drop}>Drop</div>
            <div style={styles.drop}>Drop</div>
          </section>
        </>
      ) : (
        <>
          <h2 style={styles.title}>Nearby</h2>

          <div style={styles.card}>
            <div>
              <strong>@lucas</strong>
              <p>120m • 🟢 Online</p>
            </div>
            <button style={styles.nex}>NEX</button>
          </div>

          <div style={styles.card}>
            <div>
              <strong>@ana</strong>
              <p>340m • ⚪ Offline</p>
            </div>
            <button style={styles.nex}>NEX</button>
          </div>

          <div style={styles.card}>
            <div>
              <strong>@rafa</strong>
              <p>1.2km • 🟢 Online</p>
            </div>
            <button style={styles.nex}>NEX</button>
          </div>
        </>
      )}

      <nav style={styles.nav}>
        <button
          style={tab === "drops" ? styles.activeTab : styles.tab}
          onClick={() => setTab("drops")}
        >
          My Drops
        </button>

        <button
          style={tab === "nearby" ? styles.activeTab : styles.tab}
          onClick={() => setTab("nearby")}
        >
          Nearby
        </button>
      </nav>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#00163a",
    color: "white",
    padding: "22px",
    fontFamily: "Arial",
    paddingBottom: "90px",
  },

  logo: {
    fontSize: "52px",
    color: "#3b82f6",
    marginTop: "30px",
    marginBottom: "10px",
  },

  logoSmall: {
    fontSize: "28px",
    color: "#3b82f6",
    margin: 0,
  },

  sub: {
    opacity: 0.8,
    fontSize: "22px",
    marginBottom: "24px",
  },

  input: {
    width: "100%",
    padding: "18px",
    fontSize: "24px",
    borderRadius: "18px",
    border: "none",
    marginBottom: "18px",
  },

  button: {
    width: "100%",
    padding: "18px",
    fontSize: "26px",
    fontWeight: "bold",
    borderRadius: "18px",
    border: "none",
    background: "#3b82f6",
    color: "white",
  },

  top: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  userMail: {
    margin: 0,
    opacity: 0.7,
    fontSize: "13px",
  },

  logoutMini: {
    background: "#102a5f",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "10px 14px",
  },

  profile: {
    display: "flex",
    gap: "14px",
    background: "#0f275a",
    padding: "16px",
    borderRadius: "18px",
    marginBottom: "20px",
  },

  avatar: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "#3b82f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "22px",
  },

  username: {
    margin: 0,
  },

  bio: {
    margin: "6px 0",
    opacity: 0.8,
  },

  metrics: {
    display: "flex",
    gap: "16px",
    fontSize: "14px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "10px",
  },

  plus: {
    background: "#3b82f6",
    borderRadius: "18px",
    minHeight: "110px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "50px",
    fontWeight: "bold",
  },

  drop: {
    background: "#0f275a",
    borderRadius: "18px",
    minHeight: "110px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: "34px",
    marginBottom: "18px",
  },

  card: {
    background: "#0f275a",
    padding: "16px",
    borderRadius: "18px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nex: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "10px 16px",
    fontWeight: "bold",
  },

  nav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#071833",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    padding: "12px",
    gap: "10px",
  },

  tab: {
    background: "#102a5f",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "14px",
  },

  activeTab: {
    background: "#3b82f6",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "14px",
    fontWeight: "bold",
  },
};
