import {Link} from 'react-router';
import {STUDIO} from '~/data/outfit';
import {Reveal} from '~/components/outfit/Reveal';

export const meta = () => [{title: 'Shipping & Return Policy | OUTFIT®'}];

export default function ShippingAndReturns() {
  return (
    <div className="px-5 pt-24 md:px-8">
      <Link
        to="/"
        data-cursor-label="Back"
        className="mb-8 inline-block text-sm uppercase tracking-wider underline-offset-4 hover:underline"
      >
        ← Return to Shop
      </Link>

      <h1 className="mb-16 max-w-[14ch] text-[12vw] font-bold leading-[0.9] tracking-tighter md:text-[7vw]">
        Shipping &amp; Return Policy
      </h1>

      <div className="grid grid-cols-1 gap-x-16 gap-y-16 pb-24 md:grid-cols-2">
        <Section title="Shipping">
          <Item heading="Processing Time">
            All orders are processed within 1–2 business days. Orders are not
            shipped on weekends or public holidays in Uruguay. During
            high-volume periods, shipments may be delayed slightly. Thank you
            for your patience.
          </Item>
          <Item heading="Shipping Rates & Delivery Estimates">
            Shipping costs are calculated at checkout based on your location.
            Estimated delivery times — Within Uruguay: 2–5 business days.
            International: 7–21 business days (varies by destination and customs
            processing). Delivery times are estimates and may vary based on
            postal service performance.
          </Item>
          <Item heading="Order Tracking">
            Once your order has been shipped, you will receive a confirmation
            email with a tracking number. Tracking may take up to 24 hours to
            become active.
          </Item>
          <Item heading="Customs, Duties & Taxes">
            For international orders, customs duties, taxes, or other fees may
            apply. These charges are the buyer&apos;s responsibility and are not
            included in our prices or shipping costs.
          </Item>
        </Section>

        <Section title="Returns">
          <p className="leading-relaxed opacity-80">
            We want you to be happy with your purchase. If something isn&apos;t
            right, we&apos;re here to help.
          </p>
          <Item heading="Return Window">
            You may return items within 30 days of receiving your order.
            Products must be unused, in their original condition, and in original
            packaging. To request a return, please contact us at{' '}
            <a
              href={`mailto:${STUDIO.email}`}
              data-cursor="dot"
              className="underline underline-offset-4"
            >
              {STUDIO.email}
            </a>{' '}
            with your order number and reason for return.
          </Item>
          <Item heading="Refunds">
            Once we receive and inspect your return, we will notify you of the
            approval or rejection of your refund. Approved refunds are processed
            to your original payment method within 5–10 business days.
          </Item>
        </Section>
      </div>
    </div>
  );
}

function Section({title, children}) {
  return (
    <Reveal y={30} className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {children}
    </Reveal>
  );
}

function Item({heading, children}) {
  return (
    <div>
      <h3 className="mb-2 text-xs uppercase tracking-wider opacity-60">{heading}</h3>
      <p className="max-w-[52ch] leading-relaxed">{children}</p>
    </div>
  );
}
