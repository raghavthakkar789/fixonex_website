import { TransitionLink } from "@/components/navigation/TransitionLink";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center sm:py-28">
      <p className="font-heading text-7xl font-bold tracking-[-0.04em] text-primary/90">404</p>
      <h1 className="mt-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">Page not found</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
        The link may be old or mistyped. Use the menu above or return home to keep browsing.
      </p>
      <Button asChild className="mt-10" size="lg">
        <TransitionLink href="/">Back to home</TransitionLink>
      </Button>
    </div>
  );
}
