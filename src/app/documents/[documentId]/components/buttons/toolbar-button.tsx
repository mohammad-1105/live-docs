import { Hint } from "@/components/hint";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface ToolbarButtonProps {
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

export function ToolbarButton({
  label,
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) {
  return (
    <Hint label={label}>
      <button
        onClick={onClick}
        className={cn(
          "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-foreground/5 dark:hover:bg-primary-foreground/10",
          isActive && "bg-foreground/5 dark:bg-primary-foreground/10"
        )}
      >
        <Icon className="size-4" />
      </button>
    </Hint>
  );
}
