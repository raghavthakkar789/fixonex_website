import { socialIconMap } from "@/lib/social-icons";
import type { SocialLink } from "@/types";
import { Card, CardContent } from "@/components/ui/card";

export function SocialLinksGrid({ links }: { links: SocialLink[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {links.map((s) => {
        const Icon = socialIconMap[s.icon];
        return (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[4.5rem] rounded-sm outline-none ring-offset-background transition-shadow focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Card className="h-full transition-shadow hover:shadow-card-hover">
              <CardContent className="flex min-h-[4.5rem] items-center gap-4 p-5 sm:p-6">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-sm bg-muted text-primary">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-heading font-semibold text-foreground">{s.label}</p>
                  <p className="break-all text-xs leading-snug text-muted-foreground">{s.href}</p>
                </div>
              </CardContent>
            </Card>
          </a>
        );
      })}
    </div>
  );
}
