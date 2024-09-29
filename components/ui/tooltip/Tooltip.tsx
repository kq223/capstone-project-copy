"use client"; // This tells Next.js that this is a client-side component

import React, { ReactNode, useState, cloneElement, ReactElement } from "react";
import TooltipContent from "./TooltipContent"; // Make sure the path is correct

interface TooltipProps {
  children: ReactNode;
}

const Tooltip = ({ children }: TooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {React.Children.map(children, (child) => {
        // Ensure we are only passing isHovered to TooltipContent
        if (React.isValidElement(child) && child.type === TooltipContent) {
          return cloneElement(child as ReactElement, { isHovered });
        }
        return child;
      })}
    </div>
  );
};

export default Tooltip;
