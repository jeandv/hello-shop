import {createContext, useContext, useEffect, useState, useCallback} from 'react';

/** @typedef {'light'|'dark'|'red'} ThemeName */

const THEMES = /** @type {ThemeName[]} */ (['light', 'dark', 'red']);
const STORAGE_KEY = 'outfit-theme';

const ThemeContext = createContext({
  theme: /** @type {ThemeName} */ ('light'),
  setTheme: (/** @type {ThemeName} */ _t) => {},
  themes: THEMES,
});

export function ThemeProvider({children}) {
  const [theme, setThemeState] = useState(/** @type {ThemeName} */ ('light'));

  // Hydrate from storage on mount (client only).
  useEffect(() => {
    const saved = /** @type {ThemeName|null} */ (
      window.localStorage.getItem(STORAGE_KEY)
    );
    if (saved && THEMES.includes(saved)) setThemeState(saved);
  }, []);

  // Reflect onto <html data-theme> + persist.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((/** @type {ThemeName} */ t) => {
    if (THEMES.includes(t)) setThemeState(t);
  }, []);

  return (
    <ThemeContext.Provider value={{theme, setTheme, themes: THEMES}}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * The three swatch dots, matching the original order/colors:
 * black dot → light (black text), white dot → dark mode, red dot → red text.
 * The dot's visual color is decoupled from the theme it activates.
 */
const DOTS = /** @type {{theme: ThemeName, swatch: string}[]} */ ([
  {theme: 'light', swatch: '#0a0a0a'},
  {theme: 'dark', swatch: '#ffffff'},
  {theme: 'red', swatch: '#ff0001'},
]);

export function ThemeSwitcher({className = ''}) {
  const {theme, setTheme} = useTheme();
  return (
    <div className={`flex items-center gap-2 ${className}`} role="group" aria-label="Theme">
      {DOTS.map(({theme: name, swatch}) => (
        <button
          key={name}
          type="button"
          onClick={() => setTheme(name)}
          aria-label={`${name} theme`}
          aria-pressed={theme === name}
          data-cursor="dot"
          className="h-3.5 w-3.5 rounded-full border border-current/40 transition-transform duration-200 hover:scale-125"
          style={{
            background: swatch,
            transform: theme === name ? 'scale(1.3)' : undefined,
          }}
        />
      ))}
    </div>
  );
}
