import {Link} from 'react-router';
import {formatPrice} from '~/data/outfit';
import {useBag} from '~/components/outfit/BagProvider';

export const meta = () => [{title: 'Your Bag | OUTFIT®'}];

export default function Bag() {
  const {lines, count, subtotal, hydrated, setQty, remove, clear} = useBag();

  return (
    <div className="px-5 pt-24 md:px-8">
      <div className="flex items-baseline justify-between border-b border-fg/15 pb-6">
        <h1 className="text-[14vw] font-bold leading-none tracking-tighter md:text-[8vw]">
          Your Bag
        </h1>
        <span className="text-lg tabular-nums opacity-60">({count})</span>
      </div>

      {/* Avoid flashing the empty state before localStorage hydrates */}
      {!hydrated ? null : lines.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 gap-12 pb-24 pt-10 lg:grid-cols-[1fr_360px]">
          <ul className="divide-y divide-fg/15 border-y border-fg/15">
            {lines.map((line) => (
              <BagLine key={line.key} line={line} setQty={setQty} remove={remove} />
            ))}
          </ul>

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="border border-fg/30 p-6">
              <Row label="Subtotal" value={formatPrice(subtotal)} />
              <Row label="Shipping" value="Calculated at checkout" muted />
              <div className="my-4 border-t border-fg/15" />
              <Row label="Total" value={formatPrice(subtotal)} strong />
              {/* Placeholder for now (no href): wire to the Shopify checkout
                  once real variant IDs are available. */}
              <button
                type="button"
                data-cursor="dot"
                className="mt-6 w-full bg-fg py-3 text-sm uppercase tracking-wider text-bg transition-opacity hover:opacity-90"
              >
                Checkout
              </button>
              <button
                type="button"
                onClick={clear}
                data-cursor="dot"
                className="mt-3 w-full text-xs uppercase tracking-wider opacity-50 underline-offset-4 hover:underline"
              >
                Clear bag
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-start gap-6 py-24">
      <p className="text-2xl font-medium tracking-tight opacity-80">
        Not even one thing? That&apos;s sad.
      </p>
      <Link
        to="/"
        data-cursor-label="Shop"
        className="text-sm uppercase tracking-wider underline underline-offset-4"
      >
        ← Back to Shop
      </Link>
    </div>
  );
}

function BagLine({line, setQty, remove}) {
  return (
    <li className="flex gap-4 py-5">
      <Link to={`/products/${line.handle}`} className="block w-24 shrink-0 bg-muted">
        <img src={line.image} alt={line.title} className="aspect-[4/5] w-full object-cover" />
      </Link>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <Link
            to={`/products/${line.handle}`}
            data-cursor="dot"
            className="font-medium tracking-tight underline-offset-4 hover:underline"
          >
            {line.title}
          </Link>
          <span className="tabular-nums">{formatPrice(line.price * line.qty)}</span>
        </div>

        <p className="mt-1 text-xs uppercase tracking-wider opacity-50">
          {line.color} / {line.size}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center border border-fg/30">
            <button
              type="button"
              aria-label="Decrease quantity"
              data-cursor="dot"
              onClick={() => setQty(line.key, line.qty - 1)}
              className="flex h-8 w-8 items-center justify-center hover:bg-fg hover:text-bg"
            >
              −
            </button>
            <span className="w-8 text-center text-sm tabular-nums">{line.qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              data-cursor="dot"
              onClick={() => setQty(line.key, line.qty + 1)}
              className="flex h-8 w-8 items-center justify-center hover:bg-fg hover:text-bg"
            >
              +
            </button>
          </div>

          <button
            type="button"
            onClick={() => remove(line.key)}
            data-cursor="dot"
            className="text-xs uppercase tracking-wider opacity-50 underline-offset-4 hover:underline"
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}

function Row({label, value, muted, strong}) {
  return (
    <div className="flex items-baseline justify-between py-1 text-sm">
      <span className={muted ? 'opacity-50' : ''}>{label}</span>
      <span className={`tabular-nums ${strong ? 'font-medium' : ''} ${muted ? 'opacity-50' : ''}`}>
        {value}
      </span>
    </div>
  );
}
