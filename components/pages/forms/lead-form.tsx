"use client";

import Link from "@/components/ui/link";
import { useState, type FormEvent } from "react";
import { Check } from "@/components/ui/icons";
import { cn } from "@/components/ui/primitives";
import { useLang } from "@/components/ui/locale";
import { tr } from "@/lib/i18n";

const inputClass =
  "mt-1.5 h-12 w-full rounded-xl border bg-white px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-ink";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Short lead form (gated reports, early access, event sign-ups).
 * Front-end only — TODO: send submissions to your CRM or email service.
 */
export function LeadForm({
  submitLabel: submitLabelProp,
  successTitle: successTitleProp,
  successText: successTextProp,
  idPrefix = "lead",
}: {
  submitLabel?: string;
  successTitle?: string;
  successText?: string;
  idPrefix?: string;
}) {
  const lang = useLang();
  const submitLabel = submitLabelProp ?? tr(lang, "Submit", "Envoyer");
  const successTitle = successTitleProp ?? tr(lang, "Thanks — we've got it.", "Merci, nous avons bien reçu votre demande.");
  const successText =
    successTextProp ?? tr(lang, "A member of the Walumo team will be in touch with you shortly.", "Un membre de l'équipe Walumo vous contactera très prochainement.");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) next.name = tr(lang, "Please enter your full name.", "Veuillez saisir votre nom complet.");
    if (!EMAIL.test(String(data.get("email") ?? "").trim())) next.email = tr(lang, "Please enter a valid work email.", "Veuillez saisir une adresse e-mail professionnelle valide.");
    if (!String(data.get("company") ?? "").trim()) next.company = tr(lang, "Please enter your company or organisation.", "Veuillez saisir le nom de votre entreprise ou organisation.");
    setErrors(next);
    if (Object.keys(next).length) {
      e.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center py-10 text-center" role="status" aria-live="polite">
        <span className="flex size-12 items-center justify-center rounded-full bg-accent-soft text-accent-strong">
          <Check size={24} />
        </span>
        <p className="mt-5 font-serif text-2xl text-ink">{successTitle}</p>
        <p className="mt-2 max-w-xs text-[15px] leading-6 text-muted">{successText}</p>
      </div>
    );
  }

  const field = (name: string, label: string, type = "text", autoComplete?: string) => (
    <div>
      <label htmlFor={`${idPrefix}-${name}`} className="text-sm font-bold text-ink">
        {label}
      </label>
      <input
        id={`${idPrefix}-${name}`}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={errors[name] ? "true" : "false"}
        aria-describedby={errors[name] ? `${idPrefix}-${name}-error` : undefined}
        className={cn(inputClass, errors[name] ? "border-[#b3412e]" : "border-line")}
      />
      {errors[name] && (
        <p id={`${idPrefix}-${name}-error`} className="mt-1.5 text-[13px] text-[#b3412e]">
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <form noValidate onSubmit={onSubmit} className="space-y-4">
      {field("name", tr(lang, "Full name *", "Nom complet *"), "text", "name")}
      {field("email", tr(lang, "Work email *", "E-mail professionnel *"), "email", "email")}
      {field("company", tr(lang, "Company / organisation *", "Entreprise / organisation *"), "text", "organization")}
      <button
        type="submit"
        className="h-12 w-full rounded-full bg-ink text-[15px] font-bold text-white transition-colors hover:bg-ink-soft"
      >
        {submitLabel}
      </button>
      <p className="text-center text-[12.5px] leading-5 text-muted">
        {tr(lang, "We use your details only to respond to your enquiry.", "Nous utilisons vos informations uniquement pour répondre à votre demande.")}{" "}
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-ink">
          {tr(lang, "Privacy policy", "Politique de confidentialité")}
        </Link>
      </p>
    </form>
  );
}
