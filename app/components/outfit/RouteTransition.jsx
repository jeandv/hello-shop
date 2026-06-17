import {useEffect} from 'react';
import {useLocation} from 'react-router';
import {scrollToTop} from './SmoothScroll';

/**
 * Per-route entrance: remounts its child on pathname change (via `key`) so the
 * `page-enter` CSS animation replays, and snaps the scroll position to the top
 * through Lenis. Keeps navigation feeling deliberate without a heavy overlay.
 */
export function RouteTransition({children}) {
  const {pathname} = useLocation();

  useEffect(() => {
    scrollToTop(true);
  }, [pathname]);

  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  );
}
