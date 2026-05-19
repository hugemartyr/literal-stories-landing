import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: {
    default: "Asterix",
    template: "%s - Asterix",
  },
  description:
    "A premium literary dating app where users connect through words before appearance.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        
        {children}
      </body>
    </html>
  );
}
