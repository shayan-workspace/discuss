"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export interface FormButtonProps {
  children: ReactNode;
}

export default function FormButton({ children }: Readonly<FormButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className="btn btn-primary w-full">
      {pending ? (
        <div className="spinner-dot-intermittent [--spinner-color:var(--gray-12)]"></div>
      ) : (
        children
      )}
    </button>
  );
}
