import {Link} from 'react-router';
import {STUDIO} from '~/data/outfit';
import {Reveal} from './Reveal';

export function Footer() {
  return (
    <footer className="border-t border-fg/15 bg-bg px-5 pb-8 pt-16 text-fg md:px-8">
      {/* Oversized tagline */}
      <Reveal as="p" className="mb-16 max-w-[18ch] text-[10vw] font-bold leading-[0.92] tracking-tighter md:text-[7vw]">
        {STUDIO.tagline}{' '}
        <span className="align-super text-[0.3em] font-normal">©26</span>
      </Reveal>

      <div className="grid grid-cols-2 gap-x-6 gap-y-10 text-sm md:grid-cols-4">
        <div className="col-span-2 max-w-[40ch] md:col-span-1">
          <p className="leading-relaxed">{STUDIO.about}</p>
        </div>

        <div>
          <h3 className="mb-3 text-xs uppercase tracking-wider opacity-50">Studio</h3>
          <ul className="space-y-1">
            {STUDIO.nav.map((n) => (
              <li key={n.label}>
                <a
                  href={n.href}
                  data-cursor="dot"
                  className="underline-offset-4 hover:underline"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs uppercase tracking-wider opacity-50">Social</h3>
          <ul className="space-y-1">
            {STUDIO.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="dot"
                  className="underline-offset-4 hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs uppercase tracking-wider opacity-50">Address</h3>
          <address className="space-y-1 not-italic">
            {STUDIO.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p>
              <a
                href={`mailto:${STUDIO.email}`}
                data-cursor="dot"
                className="underline-offset-4 hover:underline"
              >
                {STUDIO.email}
              </a>
            </p>
          </address>
        </div>
      </div>

      <div className="mt-16 flex flex-col gap-2 border-t border-fg/15 pt-4 text-xs uppercase tracking-wider opacity-60 md:flex-row md:items-center md:justify-between">
        <span>
          {STUDIO.name} — All rights reserved © {STUDIO.year}
        </span>
        <Link to="/shipping-and-returns" data-cursor="dot" className="underline-offset-4 hover:underline">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
