import {useEffect, useRef, useState} from 'react';
import {Link, useLocation} from 'react-router';
import {useBag} from './BagProvider';
import {ThemeSwitcher} from './ThemeProvider';

/** The ++ wordmark, drawn as two plus signs to match the brand. */
function Logo({className = ''}) {
  return (
    <Link
      to="/"
      aria-label="OUTFIT home"
      data-cursor-label="Home"
      className={`inline-flex items-end gap-1 leading-none ${className}`}
    >
      <span className="text-3xl font-bold tracking-tighter">+</span>
      <span className="text-3xl font-bold tracking-tighter">+</span>
    </Link>
  );
}

const MENU_LINKS = [
  {label: 'Shop', to: '/'},
  {label: 'Bag', to: '/bag'},
  {label: 'Shipping & Returns', to: '/shipping-and-returns'},
];

export function Header() {
  const {count, bump} = useBag();
  const {pathname} = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const bagRef = useRef(null);

  // Pulse the bag count whenever an item is added.
  useEffect(() => {
    if (!bump || !bagRef.current) return;
    let ctx;
    (async () => {
      const gsapMod = await import('gsap');
      const gsap = gsapMod.gsap ?? gsapMod.default;
      ctx = gsap.context(() => {
        gsap.fromTo(
          bagRef.current,
          {scale: 1.4, color: 'var(--accent)'},
          {scale: 1, color: 'var(--fg)', duration: 0.6, ease: 'back.out(3)'},
        );
      });
    })();
    return () => ctx?.revert();
  }, [bump]);

  // Close the overlay on route change + lock scroll while open.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen]);

  const isShop = pathname === '/';

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="flex items-center justify-between px-5 py-4 text-fg md:px-8">
          <Logo />

          <nav className="flex items-center gap-6 md:gap-9">
            <Link
              to="/"
              data-cursor-label="View"
              className={`hidden text-sm tracking-tight underline-offset-4 hover:underline md:inline ${
                isShop ? 'underline' : ''
              }`}
            >
              Shop
            </Link>
            <Link
              to="/bag"
              data-cursor-label="View"
              className="hidden text-sm tracking-tight underline-offset-4 hover:underline md:inline"
            >
              Bag (<span ref={bagRef} className="tabular-nums">{count}</span>)
            </Link>

            <ThemeSwitcher className="hidden md:flex" />

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              data-cursor="dot"
              className="text-sm tracking-tight underline-offset-4 hover:underline md:hidden"
              aria-expanded={menuOpen}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </button>
          </nav>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} count={count} />
    </>
  );
}

function MenuOverlay({open, onClose, count}) {
  const ref = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    if (!ref.current) return;
    let ctx;
    (async () => {
      const gsapMod = await import('gsap');
      const gsap = gsapMod.gsap ?? gsapMod.default;
      ctx = gsap.context(() => {
        if (open) {
          gsap.set(ref.current, {display: 'flex'});
          gsap.fromTo(ref.current, {yPercent: -100}, {yPercent: 0, duration: 0.6, ease: 'power4.out'});
          gsap.fromTo(
            itemsRef.current,
            {y: 40, autoAlpha: 0},
            {y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08, delay: 0.15, ease: 'power3.out'},
          );
        } else {
          gsap.to(ref.current, {
            yPercent: -100,
            duration: 0.5,
            ease: 'power4.in',
            onComplete: () => gsap.set(ref.current, {display: 'none'}),
          });
        }
      }, ref);
    })();
    return () => ctx?.revert();
  }, [open]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-40 hidden flex-col justify-between bg-bg px-5 pb-8 pt-24 text-fg"
      style={{display: 'none'}}
    >
      <nav className="flex flex-col gap-2">
        {MENU_LINKS.map((l, i) => (
          <Link
            key={l.to}
            to={l.to}
            ref={(el) => (itemsRef.current[i] = el)}
            onClick={onClose}
            data-cursor="dot"
            className="text-[12vw] font-bold leading-[0.95] tracking-tighter"
          >
            {l.label}
            {l.label === 'Bag' ? ` (${count})` : ''}
          </Link>
        ))}
      </nav>
      <div
        ref={(el) => (itemsRef.current[MENU_LINKS.length] = el)}
        className="flex items-center justify-between border-t border-fg/20 pt-4 text-xs uppercase tracking-wider"
      >
        <span>OUTFIT®</span>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
