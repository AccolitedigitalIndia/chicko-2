import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-20 h-20 rounded-full bg-brand-pink-light flex items-center justify-center mb-4">
        <Icon className="w-10 h-10 stroke-brand-pink" strokeWidth={1.5} />
      </div>
      <h3 className="text-gray-dark text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-medium text-sm text-center mb-4 max-w-xs">
        {description}
      </p>
      {action}
    </div>
  );
}
