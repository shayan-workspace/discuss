import type { Metadata } from "next";
import type { ReactNode } from "react";
import Providers from "@/app/providers";
import { inter } from "@/utils/fonts";
import "@/globals.css";

export const metadata: Metadata = {
  title: "Discuss",
  description: "Discuss",
};

export interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
