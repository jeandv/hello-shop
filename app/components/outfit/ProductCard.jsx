import {Link} from 'react-router';
import {formatPrice} from '~/data/outfit';

/**
 * Product tile for the shop grid. Sharp corners, image zooms on hover, the
 * red accent dot fades in — Swiss restraint with one moment of motion.
 *
 * @param {{product: import('~/data/outfit').OutfitProduct, index?: number}} props
 */
export function ProductCard({product, index = 0}) {
  return (
    <Link
      to={`/products/${product.handle}`}
      data-cursor-label="View"
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        {/* accent dot */}
        <span className="absolute left-3 top-3 z-10 h-2 w-2 rounded-full bg-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <img
          src={product.image}
          alt={product.title}
          loading={index < 4 ? 'eager' : 'lazy'}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between text-sm">
        <span className="font-medium tracking-tight">{product.title}</span>
        <span className="tabular-nums">{formatPrice(product.price)}</span>
      </div>
      <span className="text-xs uppercase tracking-wider opacity-50">Apparel</span>
    </Link>
  );
}
