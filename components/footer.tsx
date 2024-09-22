export default function Footer() {
  return (
    <footer className="container text-center border-t text-muted-foreground text-sm p-4 mt-8">
      <p>
        &copy; {new Date().getFullYear()} BannerDoc. Created by{" "}
        <a
          href="https://github.com/devRabbani"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:underline hover:text-primary"
        >
          devRabbani
        </a>
        .
      </p>
    </footer>
  );
}
