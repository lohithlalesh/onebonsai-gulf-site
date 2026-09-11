"use client";

import type { ReactNode } from "react";
import { usePlanIntegration } from "./PlanIntegrationModal";

type PlanIntegrationButtonProps = {
  children: ReactNode;
  className?: string;
};

export default function PlanIntegrationButton({ children, className }: PlanIntegrationButtonProps) {
  const { openPlanIntegration } = usePlanIntegration();

  return (
    <button className={className} type="button" onClick={openPlanIntegration}>
      {children}
    </button>
  );
}
