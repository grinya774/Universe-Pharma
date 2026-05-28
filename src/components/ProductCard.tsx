import { motion } from 'framer-motion'
import type { Product } from '../lib/products'

interface Props {
  product: Product
  index: number
}

export default function ProductCard({ product, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="glass rounded-2xl p-3 md:p-6 min-w-[200px] md:min-w-[280px] flex-shrink-0 snap-center"
    >
      <div className="aspect-[3/4] rounded-xl overflow-hidden mb-3 bg-white">
        <img
          src={product.image}
          alt={product.nameRu}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <span className="text-[10px] md:text-xs text-mint uppercase tracking-wider">{product.category}</span>
      <h3 className="font-display font-semibold text-sm md:text-lg mb-1 leading-tight">{product.nameRu}</h3>
      <p className="text-[11px] md:text-sm text-muted line-clamp-2">{product.description}</p>
      <span className="inline-block mt-2 text-[10px] md:text-xs bg-mint/15 text-mint px-2 py-0.5 rounded-full">
        {product.badge}
      </span>
    </motion.div>
  )
}
