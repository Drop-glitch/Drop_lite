export default function Page() {
  const users = [
    { nome: "Lucas", km: "0,4 km" },
    { nome: "Marina", km: "0,8 km" },
    { nome: "Rafa", km: "1,2 km" },
    { nome: "Bianca", km: "1,9 km" },
  ]

  return (
    <main className="container">
      <h1>Drops Lite</h1>
      <p className="sub">Pessoas perto de você</p>

      {users.map((user, i) => (
        <div className="card" key={i}>
          <div>
            <strong>{user.nome}</strong>
            <p>{user.km}</p>
          </div>
          <button>Ver perfil</button>
        </div>
      ))}
    </main>
  )
}
