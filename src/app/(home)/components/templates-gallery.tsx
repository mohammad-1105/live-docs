"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { templates } from "@/constants";
import { cn } from "@/lib/utils";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

export function TemplatesGallery() {
  const [isCreating, setIsCreating] = React.useState<boolean>(false);
  const create = useMutation(api.documents.create);
  const router = useRouter();

  const onTemplateClick = (title: string, initialContent: string) => {
    setIsCreating(true);
    create({ title, initialContent })
      .then((docId: Id<"documents">) => {
        router.push(`/documents/${docId}`);
      })
      .finally(() => setIsCreating(false));
  };

  return (
    <div>
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4 bg-foreground/10 select-none">
        <h3 className="font-medium">Create a new document</h3>

        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis[14.285714px] pl-4"
              >
                <div
                  className={cn(
                    "aspect-[3/4] flex flex-col gap-y-2.5",
                    isCreating && "pointer-events-none opacity-50"
                  )}
                >
                  <button
                    disabled={isCreating}
                    onClick={() => onTemplateClick(template.label, "")} // TODO: Add proper initial content
                    style={{
                      backgroundImage: `url(${template.imageSrc})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center"
                  ></button>
                  <p className="font-medium text-sm truncate text-center">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
