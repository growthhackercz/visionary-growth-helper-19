
import React from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  showBackButton?: boolean;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader = ({
  title,
  description,
  breadcrumbs,
  showBackButton = false,
  actions,
  className,
}: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className={cn("space-y-4 mb-6", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
          {breadcrumbs.map((item, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="w-4 h-4" />}
              {item.href ? (
                <button
                  onClick={() => navigate(item.href!)}
                  className="hover:text-foreground transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <span className="text-foreground">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}
      
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          )}
          <div>
            <h1 className="text-3xl font-bold text-foreground">{title}</h1>
            {description && (
              <p className="text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
};
