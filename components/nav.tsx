import Link from "next/link";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./theme-toggle";

export default function Nav() {
  return (
    <nav className="bg-background">
      <div className="container py-3 flex justify-between items-center">
        <Link href="/" className="text-lg font-medium">
          BannerDoc
        </Link>
        <ModeToggle />
      </div>
      <Separator />
    </nav>
  );
}
