// src/components/common/Breadcrumb.tsx
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className = "" }: BreadcrumbProps) => {
  return (
    <nav className={`flex items-center space-x-1 text-sm ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-1">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isFirst = index === 0;

          return (
            <li key={index} className="flex items-center">
              {/* Separator (except for first item) */}
              {!isFirst && (
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
              )}

              {/* Breadcrumb Item */}
              {isLast ? (
                // Current page (not clickable)
                <span className="flex items-center text-gray-900 font-medium" aria-current="page">
                  {isFirst && <Home className="h-4 w-4 mr-1" />}
                  {item.name}
                </span>
              ) : (
                // Clickable link
                <Link
                  href={item.url}
                  className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
                >
                  {isFirst && <Home className="h-4 w-4 mr-1" />}
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;