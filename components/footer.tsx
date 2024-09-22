export default function Footer() {
  return (
    <footer className="container mt-auto border-t p-4 text-center text-sm text-muted-foreground">
      <p>
        &copy; {new Date().getFullYear()} BannerDoc. Created by{" "}
        <a
          href="https://github.com/devRabbani"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium hover:text-primary hover:underline"
        >
          devRabbani
        </a>
        .
      </p>
    </footer>
  );
}
