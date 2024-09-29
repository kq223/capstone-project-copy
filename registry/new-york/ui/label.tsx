// /registry/new-york/ui/label.tsx

import React from "react";
import { cn } from "@/lib/utils";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({ className, ...props }) => {
  return (
    <label
      className={cn(
        "block text-sm font-medium leading-6 text-muted-foreground",
        className
      )}
      {...props}
    />
  );
};
