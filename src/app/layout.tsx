import type { Metadata } from 'next';
import { Inter, Source_Serif_4, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'PyTutor — Learn Python, Slowly and Deeply',
  description:
    'A meticulous, etymological, slow-paced Python learning suite. Built for thoughtful learners who want to understand, not just memorize.',
  authors: [{ name: 'Ryan Haig' }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground font-sans antialiased">
        <ThemeBootstrap />
        {children}
      </body>
    </html>
  );
}

function ThemeBootstrap() {
  // Inline theme bootstrap - prevents flash of wrong theme
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var stored = localStorage.getItem('pytutor-theme');
              var theme = stored || 'dark';
              document.documentElement.classList.toggle('dark', theme === 'dark');
            } catch (e) {
              document.documentElement.classList.add('dark');
            }
          })();
        `,
      }}
    />
  );
}
