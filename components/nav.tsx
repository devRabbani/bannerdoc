import Link from "next/link";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { Star } from "lucide-react";

export default function Nav() {
  return (
    <nav>
      <div className="container flex items-center gap-3 py-3">
        <Link href="/" className="text-lg font-medium">
          BannerDoc
        </Link>
        <Button variant="outline" size="default" asChild>
          <a
            href="https://github.com/devRabbani/bannerdoc"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto flex items-center"
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
