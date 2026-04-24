export default function Login({ onLogin }) {
  return (
    <main className="container">
      <h1>Drops Lite</h1>
      <p>Conecte-se com quem está por perto</p>

      <input placeholder="Seu email" />
      <button onClick={onLogin}>Enviar código</button>
    </main>
  )
}
