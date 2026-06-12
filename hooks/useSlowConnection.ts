'use client'
import { useState, useEffect } from 'react'

export function useSlowConnection(): boolean {
  const [slow, setSlow] = useState(false)
  useEffect(() => {
    const conn = (navigator as any).connection
    if (!conn) return
    const check = () => {
      setSlow(conn.saveData === true || ['slow-2g', '2g'].includes(conn.effectiveType))
    }
    check()
    conn.addEventListener?.('change', check)
    return () => conn.removeEventListener?.('change', check)
  }, [])
  return slow
}
