import { useEffect, useState } from 'react';

import * as S from './ThemeToggler.styles';

type ThemeMode = 'light' | 'dark';

const useTheme = () => {
  const [activeTheme, setActiveTheme] = useState<ThemeMode>(
    document.body.dataset.theme as ThemeMode
  );

  const inactiveTheme: ThemeMode = activeTheme === 'light' ? 'dark' : 'light';

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setActiveTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.body.dataset.theme = activeTheme;
    window.localStorage.setItem('theme', activeTheme);
  }, [activeTheme]);

  return { activeTheme, inactiveTheme, setActiveTheme };
};

const ThemeToggle = () => {
  const { activeTheme, inactiveTheme, setActiveTheme } = useTheme();
  const isDarkThemeActive = activeTheme === 'dark';

  return (
    <S.ThemeToggler
      type="button"
      aria-pressed={isDarkThemeActive}
      onClick={() => setActiveTheme(inactiveTheme)}
    >
      dark theme:{' '}
      <span aria-hidden={true}>{isDarkThemeActive ? 'on' : 'off'}</span>
    </S.ThemeToggler>
  );
};

export default ThemeToggle;
