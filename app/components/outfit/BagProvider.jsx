import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from 'react';

/**
 * @typedef {Object} BagLine
 * @property {string} key   unique per handle+size+color
 * @property {string} handle
 * @property {string} title
 * @property {number} price
 * @property {string} size
 * @property {string} color
 * @property {string} image
 * @property {number} qty
 */

const STORAGE_KEY = 'outfit-bag';
const BagContext = createContext(null);

const lineKey = (handle, size, color) => `${handle}::${size}::${color}`;

export function BagProvider({children}) {
  const [lines, setLines] = useState(/** @type {BagLine[]} */ ([]));
  const [hydrated, setHydrated] = useState(false);
  const [bump, setBump] = useState(0); // increments on add → drives header pulse

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const add = useCallback((product, {size, color, qty = 1}) => {
    const key = lineKey(product.handle, size, color);
    setLines((prev) => {
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) =>
          l.key === key ? {...l, qty: l.qty + qty} : l,
        );
      }
      return [
        ...prev,
        {
          key,
          handle: product.handle,
          title: product.title,
          price: product.price,
          image: product.image,
          size,
          color,
          qty,
        },
      ];
    });
    setBump((b) => b + 1);
  }, []);

  const remove = useCallback((key) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const setQty = useCallback((key, qty) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? {...l, qty} : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
    return {lines, count, subtotal, hydrated, bump, add, remove, setQty, clear};
  }, [lines, hydrated, bump, add, remove, setQty, clear]);

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error('useBag must be used within <BagProvider>');
  return ctx;
}
