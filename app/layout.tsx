import type { Metadata } from "next";
import './globals.css';

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
        {children}
      </body>
    </html>
  );
}

export default RootLayout;