import Link from "next/link";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

export default function Nav() {
  return (
    <nav className="bg-background sticky top-0 z-50">
      <div className="container py-3 flex gap-3 items-center">
        <Link href="/" className="text-lg font-medium">
          BannerDoc
        </Link>
        <Button variant="outline" size="default" asChild>
          <a
            href="https://github.com/devRabbani/bannerdoc"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center ml-auto"
          >
            <Star className="mr-2 h-4 w-4" />
            GitHub
          </a>
        </Button>
        <ModeToggle />
      </div>
      <Separator />
    </nav>
  );
}
