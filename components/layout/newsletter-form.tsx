"use client";

import { useState } from "react";
import { cn } from "@/components/ui/primitives";

/**
 * Newsletter sign-up. Front-end only: wire `onSubmit` to your e-mail provider.
 */
export function NewsletterForm({ dark, className }: { dark?: boolean; className?: string }) {
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className={cn("text-sm", dark ? "text-accent" : "text-accent-strong", className)} role="status">
        Thanks — you're on the list for our next insights.
      </p>
    );
  }

  return (
    <form
      className={cn("flex w-full max-w-md gap-2", className)}
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      <label htmlFor={dark ? "nl-email-dark" : "nl-email"} className="sr-only">
        Email address
      </label>
      <input
        id={dark ? "nl-email-dark" : "nl-email"}
        type="email"
        required
        placeholder="Your work email"
        className={cn(
          "h-12 min-w-0 flex-1 rounded-full px-5 text-[15px] outline-none transition-colors",
          dark
            ? "border border-white/20 bg-white/5 text-white placeholder:text-white/50 focus:border-accent"
            : "border border-line bg-white text-ink placeholder:text-muted focus:border-ink",
        )}
      />
      <button
        type="submit"
        className={cn(
          "h-12 shrink-0 rounded-full px-6 text-[15px] font-medium transition-colors",
          dark ? "bg-white text-ink hover:bg-accent" : "bg-ink text-white hover:bg-ink-soft",
        )}
      >
        Subscribe
      </button>
    </form>
  );
}
