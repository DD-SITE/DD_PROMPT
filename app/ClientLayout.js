// app/ClientLayout.js
'use client';

import { ThemeProvider } from 'next-themes';
import SessionWrapper from './SessionWrapper';
import Provider from './Provider';
import ConvexClientProvider from './ConvexClientProvider';

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <SessionWrapper>
        <ConvexClientProvider>
          <Provider>{children}</Provider>
        </ConvexClientProvider>
      </SessionWrapper>
    </ThemeProvider>
  );
}
