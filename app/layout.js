// app/layout.js
import './globals.css';
import ClientLayout from './ClientLayout';

export const metadata = {
  title: 'DD-Prompt',
  description: 'Created by Divyam',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
