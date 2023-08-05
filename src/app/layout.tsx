import clsx from 'clsx'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SuperTask',
  description: 'A Todo app built for Buzzvel code test.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          'text-neutral-900 dark:bg-dark-500 dark:text-neutral-200',
        )}
      >
        {children}
      </body>
    </html>
  )
}
