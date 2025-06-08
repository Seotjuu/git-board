import type { Metadata } from "next";
import './globals.css';
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Git Dashboard",
  description: "A dashboard for your Git repositories",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" className="w-screen h-screen">
      <body className="w-full h-full">
        <SessionProvider>
          {children}
        </SessionProvider>  
      </body>
    </html>
  );
}

export default RootLayout;