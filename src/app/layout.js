import { Bricolage_Grotesque } from 'next/font/google';
import "./globals.css";

const bricolage = Bricolage_Grotesque({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage', // Added CSS variable for better Tailwind integration
});

export const metadata = {
  title: {
    default: "Yogeshwar Controls | Powering Your Industry with Precision",
    template: "%s | Yogeshwar Controls"
  },
  description: "Government Approved Electrical Licensed Contractor & Supplier providing expert high and low voltage distribution solutions.",
  icons: {
    icon: '/favicon.ico', // Ensure you have a favicon in /public
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={bricolage.variable}>
      <head>
        {/* Google Material Symbols for the Hamburger and Call icons */}
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" 
        />
      </head>
      <body className={`${bricolage.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}