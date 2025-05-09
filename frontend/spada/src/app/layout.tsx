import { Provider } from "@/components/ui/provider"
import "../styles/global.css";

console.log(">> layout.tsx de settings está cargando");

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  return (
    <html suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}