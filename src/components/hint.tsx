"use client";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type HintProps = {
  label: string;
  children: React.ReactNode;
};
export function Hint({ label, children }: HintProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0.5}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
