import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { ChatScene, DisconnectedToolsScene, SpreadsheetsScene } from "@/components/ui/pain-visuals";
import type { PainPoint } from "@/lib/content";

const scenes: Record<PainPoint["scene"], ReactNode> = {
  spreadsheets: <SpreadsheetsScene />,
  chat: <ChatScene />,
  tools: <DisconnectedToolsScene />,
};

/** "What goes wrong today": each card shows a small animated scene of the problem above its text. */
export function PainCards({ items }: { items: PainPoint[] }) {
  return (
    <ul className="grid gap-5 md:grid-cols-3">
      {items.map((p, i) => (
        <Reveal as="li" key={p.title} delay={i * 80} className="h-full">
          <div className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] bg-white shadow-card transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift">
            <div className="flex h-60 items-center justify-center bg-[#fdf0ed] p-4">{scenes[p.scene]}</div>
            <div className="p-7">
              <h3 className="text-lg font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-6 text-muted">{p.text}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
