export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="page-wrapper"
      style={{ minHeight: '100vh' }}
    >
      {children}
    </div>
  )
}
