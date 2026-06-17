import {useEffect} from 'react';

/**
 * Lenis smooth scroll, driven by the GSAP ticker so ScrollTrigger stays in
 * sync. Client-only: Lenis/GSAP touch `window`, so everything is created
 * inside the effect to keep SSR (Oxygen) happy.
 *
 * Exposes the instance on `window.__lenis` so links can `scrollTo` it.
 */
export function SmoothScroll() {
  useEffect(() => {
    let lenis;
    let gsap;
    let ScrollTrigger;
    let rafCb;
    let cancelled = false;

    (async () => {
      const [{default: Lenis}, gsapMod, stMod] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      gsap = gsapMod.gsap ?? gsapMod.default;
      ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
      gsap.registerPlugin(ScrollTrigger);

      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      window.__lenis = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      rafCb = (time) => lenis.raf(time * 1000);
      gsap.ticker.add(rafCb);
      gsap.ticker.lagSmoothing(0);
    })();

    return () => {
      cancelled = true;
      if (gsap && rafCb) gsap.ticker.remove(rafCb);
      if (lenis) {
        lenis.destroy();
        delete window.__lenis;
      }
    };
  }, []);

  return null;
}

/** Scroll helper usable from anywhere (no-op on server). */
export function scrollToTop(immediate = false) {
  if (typeof window === 'undefined') return;
  if (window.__lenis) window.__lenis.scrollTo(0, {immediate});
  else window.scrollTo({top: 0, behavior: immediate ? 'auto' : 'smooth'});
}
