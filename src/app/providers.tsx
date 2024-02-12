"use client";

import type { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

export interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: Readonly<ProvidersProps>) {
  return <SessionProvider>{children}</SessionProvider>;
}
