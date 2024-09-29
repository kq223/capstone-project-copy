// components/Sidebar.tsx

import { Home, FileText, UserCheck } from "lucide-react";
import Link from "next/link";
import Tooltip from "./ui/tooltip/Tooltip";
import TooltipTrigger from "./ui/tooltip/TooltipTrigger";
import TooltipContent from "./ui/tooltip/TooltipContent";

const Sidebar = () => {
  return (
    <aside className="hidden sm:flex w-60 flex-col bg-white text-gray-800 shadow-md fixed h-full">
      {/* Header */}
      <div className="flex items-center justify-center h-16 bg-gray-200">
        <h1 className="text-xl font-bold">My App</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-8 space-y-4">
        {/* Home Link */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/"
              className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Home className="h-5 w-5 mr-3 text-gray-600" />
              <span>Home</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Home</TooltipContent>
        </Tooltip>

        {/* Policies Link */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/policies"
              className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FileText className="h-5 w-5 mr-3 text-gray-600" />
              <span>Policies</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Policies</TooltipContent>
        </Tooltip>

        {/* Customers Link */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href="/customers"
              className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <UserCheck className="h-5 w-5 mr-3 text-gray-600" />
              <span>Customers</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">Customers</TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
};

export default Sidebar;
