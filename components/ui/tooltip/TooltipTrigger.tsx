// app/components/ui/tooltip/TooltipTrigger.tsx
import { ReactNode } from "react";

interface TooltipTriggerProps {
  children: ReactNode;
  asChild?: boolean;
}

const TooltipTrigger = ({ children, asChild }: TooltipTriggerProps) => {
  if (asChild) {
    return <span className="cursor-pointer">{children}</span>;
  }
  return <div className="cursor-pointer">{children}</div>;
};

export default TooltipTrigger;
