import {Link} from 'react-router';
import {PRODUCTS, STUDIO} from '~/data/outfit';
import {Hero} from '~/components/outfit/Hero';
import {ProductCard} from '~/components/outfit/ProductCard';
import {Reveal} from '~/components/outfit/Reveal';

export const meta = () => {
  return [
    {title: 'OUTFIT® — by ++hellohello'},
    {
      name: 'description',
      content:
        'OUTFIT® — a signature apparel collection by the ++hellohello team. Made to be worn. Or judged. Or both.',
    },
  ];
};

export default function Home() {
  return (
    <>
      <Hero />

      {/* WHY / meta row */}
      <section className="grid grid-cols-2 gap-x-6 gap-y-8 px-5 py-10 text-sm md:grid-cols-4 md:px-8">
        <p className="uppercase tracking-wider opacity-60">Outfit</p>

        <div className="col-span-2 md:col-span-1">
          <p className="mb-3 uppercase tracking-wider opacity-60">Why</p>
          <p className="max-w-[40ch] font-medium leading-relaxed">{STUDIO.about}</p>
        </div>

        <div className="md:col-start-4 md:text-right">
          <a
            href="https://hellohello.is"
            target="_blank"
            rel="noreferrer"
            data-cursor="dot"
            className="uppercase tracking-wider underline-offset-4 hover:underline"
          >
            Visit ++ website
          </a>
          <p className="mt-1 uppercase tracking-wider opacity-60">© {STUDIO.year}</p>
          <Link
            to="/shipping-and-returns"
            data-cursor="dot"
            className="mt-6 inline-block uppercase tracking-wider underline-offset-4 hover:underline"
          >
            Shipping & Returns
          </Link>
        </div>
      </section>

      {/* Product grid */}
      <section className="px-5 pb-24 md:px-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {PRODUCTS.map((product, i) => (
            <Reveal key={product.handle} delay={(i % 4) * 0.05} y={30}>
              <ProductCard product={product} index={i} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
