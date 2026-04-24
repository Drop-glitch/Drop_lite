export const metadata = {
  title: "Drops Lite",
  description: "Rede social local",
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
