import { useEffect, useState } from 'react';

import * as S from './ThemeToggler.styles';

const useTheme = () => {
  const [activeTheme, setActiveTheme] = useState<'light' | 'dark'>(
    document.body.dataset.theme as 'dark' | 'light'
  );

  const inactiveTheme: 'dark' | 'light' =
    activeTheme === 'light' ? 'dark' : 'light';

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
