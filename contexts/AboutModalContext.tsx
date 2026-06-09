'use client'

import { createContext, useContext, useState } from 'react'

const AboutModalContext = createContext<{
  isOpen: boolean
  toggle: () => void
  close:  () => void
}>({ isOpen: false, toggle: () => {}, close: () => {} })

export function AboutModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <AboutModalContext.Provider value={{
      isOpen,
      toggle: () => setIsOpen(p => !p),
      close:  () => setIsOpen(false),
    }}>
      {children}
    </AboutModalContext.Provider>
  )
}

export function useAboutModal() {
  return useContext(AboutModalContext)
}
