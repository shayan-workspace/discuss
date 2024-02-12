import type { Metadata } from "next";
import type { ReactNode } from "react";
import Providers from "@/app/providers";
import { Header } from "@/components";

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
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
