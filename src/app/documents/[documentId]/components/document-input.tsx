import { CloudUploadIcon } from "lucide-react";
import React from "react";

export function DocumentInput() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg truncate px-1.5 cursor-pointer">
        Untitled document
      </span>
      <CloudUploadIcon />
    </div>
  );
}
