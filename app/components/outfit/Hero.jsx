import {useEffect, useRef} from 'react';

const LETTERS = ['O', 'U', 'T', 'F', 'I', 'T'];

/**
 * Full-bleed OUTFIT wordmark. On load each letter rises from behind a mask
 * with a stagger; the ® and rule fade in after. Reduced-motion safe.
 */
export function Hero() {
  const rootRef = useRef(null);
  const lettersRef = useRef([]);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let ctx;
    let cancelled = false;
    (async () => {
      const gsapMod = await import('gsap');
      if (cancelled) return;
      const gsap = gsapMod.gsap ?? gsapMod.default;
      ctx = gsap.context(() => {
        const tl = gsap.timeline({defaults: {ease: 'power4.out'}});
        tl.from(lettersRef.current, {
          yPercent: 120,
          duration: 1.1,
          stagger: 0.06,
        })
          .from(
            '[data-hero-meta]',
            {autoAlpha: 0, y: 20, duration: 0.8},
            '-=0.5',
          )
          .from('[data-hero-rule]', {scaleX: 0, duration: 1, ease: 'power3.inOut'}, '<');
      }, rootRef);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section ref={rootRef} className="px-5 pt-24 md:px-8">
      <h1 className="sr-only">OUTFIT — apparel by ++hellohello</h1>
      <div
        aria-hidden="true"
        className="flex items-stretch justify-between overflow-hidden leading-[0.75]"
      >
        {LETTERS.map((ch, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <span
              ref={(el) => (lettersRef.current[i] = el)}
              className="inline-block font-bold tracking-tighter"
              style={{fontSize: 'clamp(4rem, 17.5vw, 22rem)'}}
            >
              {ch}
            </span>
          </span>
        ))}
      </div>

      <div className="relative">
        <span
          data-hero-meta
          className="absolute -top-[2.2em] right-0 text-[clamp(1.5rem,3vw,3rem)]"
          aria-hidden="true"
        >
          ®
        </span>
        <hr data-hero-rule className="origin-left border-0 border-t border-fg/80" />
      </div>
    </section>
  );
}
