import {useEffect, useRef} from 'react';

/**
 * Scroll-reveal wrapper. Fades + rises its content once when it enters the
 * viewport, via GSAP ScrollTrigger. Client-only and reduced-motion aware.
 *
 * @param {object} props
 * @param {React.ElementType} [props.as] - element/tag to render (default 'div')
 * @param {number} [props.delay] - stagger delay in seconds
 * @param {number} [props.y] - initial vertical offset in px
 * @param {string} [props.className]
 * @param {React.ReactNode} props.children
 */
export function Reveal({as: Tag = 'div', delay = 0, y = 40, className, children, ...rest}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.style.visibility = 'visible';
      return;
    }

    let ctx;
    let cancelled = false;

    (async () => {
      const [gsapMod, stMod] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      const gsap = gsapMod.gsap ?? gsapMod.default;
      const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          {autoAlpha: 0, y},
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: 'power3.out',
            scrollTrigger: {trigger: el, start: 'top 88%', once: true},
          },
        );
      });
    })();

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, [delay, y]);

  return (
    <Tag ref={ref} className={className} style={{visibility: 'hidden'}} {...rest}>
      {children}
    </Tag>
  );
}
