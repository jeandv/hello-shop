import {useState} from 'react';
import {Link, useLoaderData} from 'react-router';
import {getProduct, formatPrice, SIZES, COLORS} from '~/data/outfit';
import {useBag} from '~/components/outfit/BagProvider';
import {Reveal} from '~/components/outfit/Reveal';

export const meta = ({data}) => {
  const title = data?.product ? `${data.product.title} | OUTFIT®` : 'OUTFIT®';
  return [{title}];
};

/** @param {import('./+types/products.$handle').Route.LoaderArgs} args */
export async function loader({params}) {
  const product = getProduct(params.handle);
  if (!product) {
    throw new Response('Product not found', {status: 404});
  }
  return {product};
}

export default function Product() {
  const {product} = useLoaderData();
  const {add} = useBag();

  const [size, setSize] = useState('M');
  const [color, setColor] = useState(COLORS[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(product, {size, color, qty});
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <div className="px-5 pt-24 md:px-8">
      <Link
        to="/"
        data-cursor-label="Back"
        className="mb-8 inline-block text-sm uppercase tracking-wider underline-offset-4 hover:underline"
      >
        ← Return to Shop
      </Link>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        {/* Image */}
        <Reveal y={20}>
          <div className="aspect-[4/5] overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>
        </Reveal>

        {/* Detail (sticky on desktop) */}
        <div className="md:sticky md:top-24 md:h-fit">
          <div className="flex items-baseline justify-between border-b border-fg/15 pb-4">
            <h1 className="text-4xl font-bold tracking-tighter md:text-5xl">
              {product.title}
            </h1>
            <span className="text-xl tabular-nums">{formatPrice(product.price)}</span>
          </div>

          <p className="mt-6 max-w-[42ch] leading-relaxed">{product.description}</p>

          {/* Color */}
          <Fieldset legend="Color">
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <Option key={c} active={color === c} onClick={() => setColor(c)}>
                  {c}
                </Option>
              ))}
            </div>
          </Fieldset>

          {/* Size */}
          <Fieldset legend="Size">
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <Option key={s} active={size === s} onClick={() => setSize(s)}>
                  {s}
                </Option>
              ))}
            </div>
          </Fieldset>

          {/* Quantity + Add */}
          <div className="mt-8 flex items-stretch gap-3">
            <div className="flex items-center border border-fg/30">
              <Stepper label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </Stepper>
              <span className="w-10 text-center tabular-nums">{qty}</span>
              <Stepper label="Increase quantity" onClick={() => setQty((q) => q + 1)}>
                +
              </Stepper>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              data-cursor="dot"
              className="flex-1 border border-fg py-3 text-sm uppercase tracking-wider transition-colors hover:bg-fg hover:text-bg"
            >
              {added ? 'Added to Bag ✓' : 'Add to Bag'}
            </button>
          </div>

          {/* Buy Now — primary checkout CTA. Placeholder for now (no href):
              wire to the Shopify checkout once real variant IDs are available. */}
          <button
            type="button"
            data-cursor="dot"
            className="mt-3 w-full bg-fg py-3 text-sm uppercase tracking-wider text-bg transition-opacity hover:opacity-90"
          >
            Buy Now
          </button>

          <Link
            to="/bag"
            data-cursor="dot"
            className="mt-4 inline-block text-xs uppercase tracking-wider opacity-60 underline-offset-4 hover:underline"
          >
            View Bag →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Fieldset({legend, children}) {
  return (
    <div className="mt-6">
      <p className="mb-2 text-xs uppercase tracking-wider opacity-60">{legend}</p>
      {children}
    </div>
  );
}

function Option({active, onClick, children}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-cursor="dot"
      aria-pressed={active}
      className={`min-w-11 border px-3 py-1.5 text-sm transition-colors ${
        active ? 'border-fg bg-fg text-bg' : 'border-fg/30 hover:border-fg'
      }`}
    >
      {children}
    </button>
  );
}

function Stepper({label, onClick, children}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      data-cursor="dot"
      className="flex h-full w-10 items-center justify-center text-lg leading-none hover:bg-fg hover:text-bg"
    >
      {children}
    </button>
  );
}

export function ErrorBoundary() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-5 text-center">
      <p className="text-6xl font-bold tracking-tighter">404</p>
      <p className="opacity-70">That piece doesn&apos;t exist. Or it sold out of existence.</p>
      <Link
        to="/"
        data-cursor-label="Back"
        className="text-sm uppercase tracking-wider underline underline-offset-4"
      >
        ← Return to Shop
      </Link>
    </div>
  );
}
