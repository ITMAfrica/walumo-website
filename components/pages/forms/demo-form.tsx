"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Check } from "@/components/ui/icons";
import { cn } from "@/components/ui/primitives";

export const interests = [
  { value: "kazi-pro", label: "Kazi Pro" },
  { value: "talent-pro", label: "Talent Pro" },
  { value: "sales-tracker", label: "Sales Tracker" },
  { value: "digital-transformation", label: "Digital transformation" },
] as const;

const sizes = ["1–20", "21–50", "51–200", "201–500", "500+"];

/** Map ?interest= values from CTAs to a form option. */
const interestAlias: Record<string, string> = {
  hr: "kazi-pro",
  "talent-acquisition": "talent-pro",
  "commercial-operations": "sales-tracker",
  implementation: "digital-transformation",
  services: "digital-transformation",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FREE_MAIL = /@(gmail|yahoo|hotmail|outlook|live|icloud|aol|proton(mail)?)\./i;

const inputClass =
  "mt-1.5 h-12 w-full rounded-xl border bg-white px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink";

type Errors = Partial<Record<"name" | "email" | "company" | "role" | "size" | "interest", string>>;

/**
 * Request-a-demo form (fields from the content blueprint).
 * TODO: connect `submit` to your email/CRM endpoint (e.g. a Route Handler) — it currently simulates success.
 */
export function DemoForm() {
  const params = useSearchParams();
  const initial = params.get("interest") ?? "";
  const [interest, setInterest] = useState<string>(interestAlias[initial] ?? (interests.some((i) => i.value === initial) ? initial : ""));
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(payload: Record<string, string>) {
    // Replace with: await fetch("/api/demo-request", { method: "POST", body: JSON.stringify(payload) })
    await new Promise((r) => setTimeout(r, 700));
    return payload;
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const next: Errors = {};
    if (!get("name")) next.name = "Please enter your full name.";
    if (!EMAIL.test(get("email"))) next.email = "Please enter a valid email address.";
    else if (FREE_MAIL.test(get("email"))) next.email = "Please use your work email so we can route your request.";
    if (!get("company")) next.company = "Please enter your company or organisation.";
    if (!get("role")) next.role = "Please enter your role.";
    if (!get("size")) next.size = "Please select your company size.";
    if (!interest) next.interest = "Please choose the product or solution you're interested in.";
    setErrors(next);
    if (Object.keys(next).length) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setStatus("sending");
    try {
      await submit({ ...Object.fromEntries(data.entries()) as Record<string, string>, interest });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[480px] flex-col items-center justify-center text-center" role="status" aria-live="polite">
        <span className="flex size-14 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
          <Check size={28} />
        </span>
        <h2 className="mt-6 font-serif text-3xl text-ink">Thanks — we&apos;ve got it.</h2>
        <p className="mt-3 max-w-sm text-[15px] leading-6 text-muted">
          A member of the Walumo team will be in touch with you shortly.
        </p>
      </div>
    );
  }

  const invalid = (k: keyof Errors) => (errors[k] ? ("true" as const) : ("false" as const));
  const describedBy = (k: keyof Errors) => (errors[k] ? `demo-${k}-error` : undefined);
  const border = (k: keyof Errors) => (errors[k] ? "border-[#b3412e]" : "border-line");
  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`demo-${k}-error`} className="mt-1.5 text-[13px] text-[#b3412e]">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-5" aria-busy={status === "sending"}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="demo-name" className="text-sm font-bold text-ink">Full name *</label>
          <input id="demo-name" name="name" autoComplete="name" aria-invalid={invalid("name")} aria-describedby={describedBy("name")} className={cn(inputClass, border("name"))} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="demo-email" className="text-sm font-bold text-ink">Work email *</label>
          <input id="demo-email" name="email" type="email" autoComplete="email" placeholder="name@company.com" aria-invalid={invalid("email")} aria-describedby={describedBy("email")} className={cn(inputClass, border("email"))} />
          {err("email")}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="demo-company" className="text-sm font-bold text-ink">Company / organisation *</label>
          <input id="demo-company" name="company" autoComplete="organization" aria-invalid={invalid("company")} aria-describedby={describedBy("company")} className={cn(inputClass, border("company"))} />
          {err("company")}
        </div>
        <div>
          <label htmlFor="demo-role" className="text-sm font-bold text-ink">Role *</label>
          <input id="demo-role" name="role" autoComplete="organization-title" aria-invalid={invalid("role")} aria-describedby={describedBy("role")} className={cn(inputClass, border("role"))} />
          {err("role")}
        </div>
      </div>
      <div>
        <label htmlFor="demo-size" className="text-sm font-bold text-ink">Company size *</label>
        <select id="demo-size" name="size" defaultValue="" aria-invalid={invalid("size")} aria-describedby={describedBy("size")} className={cn(inputClass, border("size"))}>
          <option value="" disabled>
            Select a range
          </option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s} employees
            </option>
          ))}
        </select>
        {err("size")}
      </div>

      <fieldset>
        <legend className="text-sm font-bold text-ink">Product or solution of interest *</legend>
        <div className="mt-2 flex flex-wrap gap-2" role="radiogroup" aria-invalid={invalid("interest")} aria-describedby={describedBy("interest")}>
          {interests.map((i) => (
            <label
              key={i.value}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-strong",
                interest === i.value ? "border-ink bg-ink text-white" : "border-line text-ink-soft hover:border-ink",
              )}
            >
              <input type="radio" name="interest-choice" value={i.value} className="sr-only" checked={interest === i.value} onChange={() => setInterest(i.value)} />
              {i.label}
            </label>
          ))}
        </div>
        {err("interest")}
      </fieldset>

      <div>
        <label htmlFor="demo-message" className="text-sm font-bold text-ink">How can we help?</label>
        <textarea
          id="demo-message"
          name="message"
          rows={4}
          placeholder="Tell us what you would like to solve in your organisation."
          className={cn(inputClass, "h-auto border-line py-3")}
        />
      </div>

      {status === "error" && (
        <p className="rounded-xl bg-[#fdecec] px-4 py-3 text-sm text-[#b3412e]" role="alert">
          Something went wrong. Please try again, or email us directly.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="h-12 w-full rounded-full bg-ink text-[15px] font-bold text-white transition-colors hover:bg-ink-soft disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? "Sending…" : "Request a Demo"}
      </button>
      <p className="text-center text-[12.5px] leading-5 text-muted">
        We use your details only to respond to your enquiry. See our{" "}
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-ink">
          privacy policy
        </Link>
        .
      </p>
    </form>
  );
}
