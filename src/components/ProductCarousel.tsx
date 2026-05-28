import { useEffect, useRef } from 'react'
import type { Product } from '../lib/products'

interface Props {
  products: Product[]
}

export default function ProductCarousel({ products }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const doubled = [...products, ...products]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    let pos = 0
    let raf = 0
    const speed = 0.6

    const step = () => {
      pos += speed
      const half = track.scrollWidth / 2
      if (half > 0 && pos >= half) pos = 0
      track.scrollLeft = pos
      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [products.length])

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={trackRef}
        className="flex gap-3 w-max overflow-x-hidden scrollbar-hide py-2"
        style={{ scrollBehavior: 'auto' }}
      >
        {doubled.map((p, i) => (
          <div
            key={`${p.id}-${i}`}
            className="flex-shrink-0 w-[108px] sm:w-[130px] glass rounded-xl p-2"
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-white mb-1.5">
              <img
                src={p.image}
                alt={p.nameRu}
                className="w-full h-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </div>
            <p className="text-[9px] text-mint uppercase truncate">{p.category}</p>
            <p className="text-[10px] font-medium leading-tight line-clamp-2">{p.nameRu}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
