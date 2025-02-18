"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { useSearchParam } from "@/hooks/use-search-param";

export function SearchInput() {
  const [search, setSearch] = useSearchParam("");
  const [value, setValue] = React.useState<string>(search);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    inputRef.current?.blur();
    setSearch("");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <form onSubmit={handleSubmit} className="relative max-w-[720px] w-full">
        <Input
          value={value}
          ref={inputRef}
          onChange={handleChange}
          placeholder="Search docs"
          className="md:text-base placeholder:text-muted-foreground px-14 w-full border-none focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-foreground/5 rounded-full focus-visible:ring-0 h-[48px] focus:bg-white dark:focus:bg-transparent"
        />
        <Button
          type="submit"
          size={"icon"}
          variant={"ghost"}
          className="absolute left-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
        >
          <SearchIcon className="size-4" />
        </Button>

        {value && (
          <Button
            onClick={handleClear}
            type="button"
            size={"icon"}
            variant={"ghost"}
            className="absolute right-3 top-1/2 -translate-y-1/2 [&_svg]:size-5 rounded-full"
          >
            <XIcon className="size-4" />
          </Button>
        )}
      </form>
    </div>
  );
}
