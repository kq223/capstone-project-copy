interface TooltipContentProps {
  children: string;
  side?: "right" | "left" | "top" | "bottom";
  isHovered?: boolean; // Explicitly declare the isHovered prop
}

const TooltipContent = ({
  children,
  side = "right",
  isHovered,
}: TooltipContentProps) => {
  if (!isHovered) return null; // Only render the tooltip if hovered

  const positionClass = `absolute ${side}-0 mt-2 w-max bg-black text-white text-sm p-2 rounded shadow-lg`;

  return <div className={positionClass}>{children}</div>;
};

export default TooltipContent;
