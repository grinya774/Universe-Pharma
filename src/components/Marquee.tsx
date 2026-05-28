export default function Marquee() {
  const items = [
    'GMP', 'HALAL', '50 млрд КОЕ', 'Istanbul', 'Wildberries', 'Ozon',
    'Made in Turkey', '18 штаммов', 'Premium Quality', 'Esenyurt Factory',
  ]

  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden border-y border-white/10 py-4 bg-surface">
      <div className="marquee-track flex whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="mx-8 text-sm tracking-[0.3em] uppercase text-muted font-display">
            {item}
            <span className="mx-8 text-mint">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
