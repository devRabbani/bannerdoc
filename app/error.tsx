"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grid h-[75vh] place-content-center gap-6">
      <div className="text-center">
        <h1 className="text-xl font-semibold md:text-2xl">
          Ohh ho, Something went wrong!
        </h1>
        <p className="mx-auto mt-2 w-11/12 font-medium text-muted-foreground/80 sm:mt-3">
          Check console for error message, If you want to see some technical
          things.
        </p>
      </div>

      <div className="mx-auto space-x-3">
        <Button onClick={reset} variant="secondary" className="w-28">
          Retry
        </Button>
        <Link
          href="/"
          className={buttonVariants({
            variant: "outline",
            className: "mx-auto w-fit",
          })}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
