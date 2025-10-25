import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import '../index.css'

export const metadata: Metadata = {
  title: 'Cinematic Theme Switcher - 21st.dev',
  description: 'An animated theme switcher with particle effects',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

