export default function Header() {
  return (
    <div
      aria-label="Site identity"
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
      }}
    >
      <span style={{ fontFamily: 'var(--font-mako)', fontSize: '16px', color: 'var(--color-ink-primary)' }}>
        Duc Ngo
      </span>

      <span style={{ fontFamily: 'var(--font-mako)', fontSize: '16px', color: 'var(--color-ink-primary)' }}>
        Currently designing at Hootsuite and the Peak SFU
      </span>

      <span style={{ fontFamily: 'var(--font-mako)', fontSize: '16px', color: 'var(--color-ink-primary)' }}>
        Vancouver based
      </span>
    </div>
  )
}
