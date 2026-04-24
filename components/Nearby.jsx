export default function Nearby() {
  const users = [
    { nome: "@ana", dist: "120m" },
    { nome: "@rafa", dist: "1.2km" },
    { nome: "@mike", dist: "Portugal • 7.200km" }
  ]

  return (
    <section>
      {users.map((u, i) => (
        <div className="card" key={i}>
          <strong>{u.nome}</strong>
          <p>{u.dist}</p>
        </div>
      ))}
    </section>
  )
}
