import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
      <Link
        to="/"
        className="text-gray-medium hover:text-brand-pink transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4" strokeWidth={1.67} />
      </Link>

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRight
            className="w-4 h-4 stroke-gray-light"
            strokeWidth={1.67}
          />
          {item.href && index < items.length - 1 ? (
            <Link
              to={item.href}
              className="text-gray-medium hover:text-brand-pink transition-colors truncate max-w-[120px]"
            >
              {item.label}
            </Link>
          ) : (
            <span
              className="text-gray-dark truncate max-w-[120px]"
              aria-current="page"
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}
