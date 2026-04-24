
import { useState } from "react"
import Login from "../components/Login"
import Perfil from "../components/Perfil"
import Nearby from "../components/Nearby"

export default function Page() {
  const [logado, setLogado] = useState(false)
  const [aba, setAba] = useState("perfil")

  if (!logado) {
    return <Login onLogin={() => setLogado(true)} />
  }

  return (
    <main className="container">
      <h1>Drops Lite</h1>

      <div className="tabs">
        <button onClick={() => setAba("perfil")}>Perfil</button>
        <button onClick={() => setAba("nearby")}>Nearby</button>
      </div>

      {aba === "perfil" && <Perfil />}
      {aba === "nearby" && <Nearby />}
    </main>
  )
}
