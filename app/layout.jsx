// app/layout.jsx

import "./globals.css"

export const metadata = {
  title: "Drops Lite",
  description: "Drops Lite REAL"
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
