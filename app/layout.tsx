import './globals.css';

export const metadata = {
  title: 'Asterix · Preface',
  description: 'A literary correspondence. One reader a day, found by the way they read.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
