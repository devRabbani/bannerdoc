import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid h-[75vh] place-content-center gap-6">
      <h1 className="text-center text-2xl font-semibold">404 Page Not Found</h1>
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
  );
}
