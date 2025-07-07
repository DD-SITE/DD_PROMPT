import SessionWrapper from "./SessionWrapper"; // 👈 import this
import "./globals.css";
import Provider from "./Provider"; // your main app provider
import ConvexClientProvider from "./ConvexClientProvider";

export const metadata = {
  title: "DD-Prompt",
  description: "Created by Divyam",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper> {/* ✅ all context inside client component */}
          <ConvexClientProvider>
            <Provider>{children}</Provider>
          </ConvexClientProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
