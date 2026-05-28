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
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass rounded-2xl p-6 min-w-[280px] flex-shrink-0 cursor-pointer group"
    >
      <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-surface-2 relative">
        <img
          src={product.image}
          alt={product.nameRu}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 text-xs bg-mint/20 text-mint px-2 py-1 rounded-full backdrop-blur">
          {product.badge}
        </span>
      </div>
      <p className="text-xs text-mint uppercase tracking-wider mb-1">{product.category}</p>
      <h3 className="font-display font-semibold text-lg mb-2">{product.nameRu}</h3>
      <p className="text-sm text-muted">{product.description}</p>
    </motion.div>
  )
}
