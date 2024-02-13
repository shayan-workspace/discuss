"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

export interface FormButtonProps {
  children: ReactNode;
  className?: string;
}

export default function FormButton({
  children,
  className,
}: Readonly<FormButtonProps>) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={`btn btn-primary ${className}`}>
      {pending ? (
        <div className="spinner-dot-intermittent [--spinner-color:var(--gray-12)]"></div>
      ) : (
        children
      )}
    </button>
  );
}
