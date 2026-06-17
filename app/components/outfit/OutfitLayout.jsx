import {ThemeProvider} from './ThemeProvider';
import {BagProvider} from './BagProvider';
import {SmoothScroll} from './SmoothScroll';
import {Cursor} from './Cursor';
import {Header} from './Header';
import {Footer} from './Footer';
import {RouteTransition} from './RouteTransition';

/**
 * Top-level shell for the OUTFIT® storefront replica. Composes the client
 * providers (theme + bag), the smooth-scroll + custom-cursor singletons, and
 * the persistent chrome (header / footer) around the routed page.
 */
export function OutfitLayout({children}) {
  return (
    <ThemeProvider>
      <BagProvider>
        <SmoothScroll />
        <Cursor />
        {/* text-fg on a wrapper (not <html>/<body>) so theme color reliably
            propagates — var(--fg) on the root element doesn't inherit in some
            engines, but the Tailwind utility on a child div does. No color
            transition here: transitioning a var()-driven `color` freezes the
            computed value and descendants inherit the stale color. */}
        <div className="text-fg">
          <Header />
          <main className="min-h-screen">
            <RouteTransition>{children}</RouteTransition>
          </main>
          <Footer />
        </div>
      </BagProvider>
    </ThemeProvider>
  );
}
