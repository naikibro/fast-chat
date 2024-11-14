import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fast Chat",
  description: "Powered by Azure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
