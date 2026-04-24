"use client";

import { useState } from "react";

export default function Home() {
  const [tab, setTab] = useState("drops");

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <h1 style={styles.logo}>Drops Lite</h1>
        <p style={styles.sub}>Rede social por proximidade</p>
      </header>

      {tab === "drops" && (
        <>
          <section style={styles.profile}>
            <div style={styles.avatar}>JQ</div>

            <div>
              <h2 style={styles.username}>@jqmarques</h2>
              <p style={styles.bio}>Curto música, parques e novas conexões.</p>

              <div style={styles.metrics}>
                <span>👁️ 12</span>
                <span>👥 4</span>
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
      )}

      {tab === "nearby" && (
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

          <div style={styles.card}>
            <div>
              <strong>@mike</strong>
              <p>7.2km • ⚪ Offline</p>
            </div>
            <button style={styles.nex}>NEX</button>
          </div>
        </>
      )}

      <nav style={styles.nav}>
        <button
          onClick={() => setTab("drops")}
          style={tab === "drops" ? styles.active : styles.tab}
        >
          My Drops
        </button>

        <button style={styles.plusNav}>＋</button>

        <button
          onClick={() => setTab("nearby")}
          style={tab === "nearby" ? styles.active : styles.tab}
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
    background: "#06142e",
    color: "white",
    padding: "20px",
    fontFamily: "Arial",
    paddingBottom: "95px",
  },

  header: {
    marginBottom: "18px",
  },

  logo: {
    fontSize: "42px",
    color: "#3b82f6",
    margin: 0,
  },

  sub: {
    opacity: 0.8,
    marginTop: "6px",
  },

  profile: {
    display: "flex",
    gap: "14px",
    background: "#102344",
    padding: "16px",
    borderRadius: "18px",
    marginBottom: "18px",
  },

  avatar: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    background: "#3b82f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "24px",
  },

  username: {
    margin: 0,
  },

  bio: {
    margin: "6px 0",
    opacity: 0.85,
  },

  metrics: {
    display: "flex",
    gap: "18px",
    fontSize: "14px",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "10px",
  },

  plus: {
    background: "#3b82f6",
    minHeight: "110px",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "48px",
    fontWeight: "bold",
  },

  drop: {
    background: "#102344",
    minHeight: "110px",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: "34px",
    marginBottom: "14px",
  },

  card: {
    background: "#102344",
    padding: "16px",
    borderRadius: "18px",
    marginBottom: "12px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  nex: {
    border: "none",
    background: "#3b82f6",
    color: "white",
    padding: "10px 14px",
    borderRadius: "12px",
    fontWeight: "bold",
  },

  nav: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    background: "#081327",
    padding: "12px",
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    gap: "10px",
  },

  tab: {
    border: "none",
    borderRadius: "14px",
    padding: "14px",
    background: "#102344",
    color: "white",
  },

  active: {
    border: "none",
    borderRadius: "14px",
    padding: "14px",
    background: "#3b82f6",
    color: "white",
    fontWeight: "bold",
  },

  plusNav: {
    border: "none",
    borderRadius: "50%",
    width: "52px",
    height: "52px",
    background: "#3b82f6",
    color: "white",
    fontSize: "30px",
    fontWeight: "bold",
  },
};
