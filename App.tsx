

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGlobalStore } from './store/globalStore';
import RootLayout from './layouts/RootLayout';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};


const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useGlobalStore((state) => state.theme);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return <>{children}</>;
};

const App: React.FC = () => {
    return (
        <ThemeProvider>
            <ScrollToTop />
            <RootLayout />
        </ThemeProvider>
    );
};

export default App;