import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Git Dashboard",
  description: "A dashboard for your Git repositories",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
