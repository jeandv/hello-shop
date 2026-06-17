import {useEffect, useRef, useState} from 'react';

/**
 * Custom cursor: a precise dot + a trailing ring. The ring grows over
 * interactive elements and can show a short label (e.g. "VIEW", "ADD")
 * driven by a `data-cursor-label` / `data-cursor` attribute on the target.
 *
 * Pointer-fine only; on touch/coarse pointers it renders nothing and the
 * native cursor stays. Fully client-side (uses `window`, GSAP).
 */
export function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add('outfit-cursor-active');

    let cancelled = false;
    let cleanupFns = [];

    (async () => {
      const gsapMod = await import('gsap');
      if (cancelled) return;
      const gsap = gsapMod.gsap ?? gsapMod.default;

      const dot = dotRef.current;
      const ring = ringRef.current;
      const label = labelRef.current;

      const xDot = gsap.quickTo(dot, 'x', {duration: 0.15, ease: 'power3'});
      const yDot = gsap.quickTo(dot, 'y', {duration: 0.15, ease: 'power3'});
      const xRing = gsap.quickTo(ring, 'x', {duration: 0.4, ease: 'power3'});
      const yRing = gsap.quickTo(ring, 'y', {duration: 0.4, ease: 'power3'});

      const onMove = (e) => {
        xDot(e.clientX);
        yDot(e.clientY);
        xRing(e.clientX);
        yRing(e.clientY);
      };

      const interactiveSel = 'a, button, [data-cursor], input, textarea, select, [role="button"]';
      const onOver = (e) => {
        const target = e.target.closest?.(interactiveSel);
        if (!target) return;
        const mode = target.getAttribute('data-cursor');
        const text = target.getAttribute('data-cursor-label');
        if (mode === 'dot') {
          gsap.to(ring, {scale: 0.4, opacity: 0.5, duration: 0.3});
        } else if (text) {
          label.textContent = text;
          gsap.to(ring, {scale: 3.4, opacity: 1, duration: 0.35});
          gsap.to(label, {opacity: 1, duration: 0.25});
        } else {
          gsap.to(ring, {scale: 2.2, opacity: 1, duration: 0.35});
        }
        gsap.to(dot, {scale: 0.4, duration: 0.3});
      };
      const onOut = (e) => {
        const target = e.target.closest?.(interactiveSel);
        if (!target) return;
        gsap.to(ring, {scale: 1, opacity: 1, duration: 0.35});
        gsap.to(dot, {scale: 1, duration: 0.3});
        gsap.to(label, {opacity: 0, duration: 0.2});
      };
      const onDown = () => gsap.to(ring, {scale: 0.8, duration: 0.2});
      const onUp = () => gsap.to(ring, {scale: 1, duration: 0.2});
      const onLeave = () => gsap.to([dot, ring], {opacity: 0, duration: 0.2});
      const onEnter = () => gsap.to([dot, ring], {opacity: 1, duration: 0.2});

      window.addEventListener('mousemove', onMove, {passive: true});
      document.addEventListener('mouseover', onOver, true);
      document.addEventListener('mouseout', onOut, true);
      window.addEventListener('mousedown', onDown);
      window.addEventListener('mouseup', onUp);
      document.addEventListener('mouseleave', onLeave);
      document.addEventListener('mouseenter', onEnter);

      cleanupFns = [
        () => window.removeEventListener('mousemove', onMove),
        () => document.removeEventListener('mouseover', onOver, true),
        () => document.removeEventListener('mouseout', onOut, true),
        () => window.removeEventListener('mousedown', onDown),
        () => window.removeEventListener('mouseup', onUp),
        () => document.removeEventListener('mouseleave', onLeave),
        () => document.removeEventListener('mouseenter', onEnter),
      ];
    })();

    return () => {
      cancelled = true;
      cleanupFns.forEach((fn) => fn());
      document.documentElement.classList.remove('outfit-cursor-active');
    };
  }, []);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 -ml-5 -mt-5 flex h-10 w-10 items-center justify-center rounded-full border border-fg"
        style={{willChange: 'transform'}}
      >
        <span
          ref={labelRef}
          className="text-[8px] font-medium uppercase tracking-wider text-fg opacity-0"
        />
      </div>
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-fg"
        style={{willChange: 'transform'}}
      />
    </div>
  );
}
