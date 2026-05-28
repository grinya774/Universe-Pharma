import type { ReactNode } from 'react'
import Nav from './Nav'
import BottomNav from './BottomNav'

interface Props {
  children: ReactNode
  className?: string
  noPadding?: boolean
}

/** Обёртка с safe-area и нижней навигацией для iPhone */
export default function PageShell({ children, className = '', noPadding }: Props) {
  return (
    <>
      <Nav />
      <main
        className={`min-h-[100dvh] ${noPadding ? '' : 'pt-[calc(3.5rem+env(safe-area-inset-top))] pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:pb-0'} ${className}`}
      >
        {children}
      </main>
      <BottomNav />
    </>
  )
}
