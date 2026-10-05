import type { SVGProps } from "react";
import type { IconName } from "@/lib/site";

type Props = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 20, children, ...rest }: Props & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: Props) => (
  <Base {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Base>
);

export const ArrowUpRight = (p: Props) => (
  <Base {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Base>
);

export const Check = (p: Props) => (
  <Base {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Base>
);

export const ChevronDown = (p: Props) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" />
  </Base>
);

export const Plus = (p: Props) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

export const Menu = (p: Props) => (
  <Base {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Base>
);

export const Close = (p: Props) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const Play = (p: Props) => (
  <Base {...p}>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="none" />
  </Base>
);

export const Clock = (p: Props) => (
  <Base {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Base>
);

export const Mail = (p: Props) => (
  <Base {...p}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </Base>
);

export const Phone = (p: Props) => (
  <Base {...p}>
    <path d="M5 4.5h3.5l1.5 4-2 1.5a11 11 0 0 0 6 6l1.5-2 4 1.5V19a1.5 1.5 0 0 1-1.5 1.5A15.5 15.5 0 0 1 3.5 6 1.5 1.5 0 0 1 5 4.5Z" />
  </Base>
);

export const MapPin = (p: Props) => (
  <Base {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </Base>
);

export const Download = (p: Props) => (
  <Base {...p}>
    <path d="M12 4v11M7 10.5l5 5 5-5M5 19.5h14" />
  </Base>
);

export const Star = ({ size = 16, ...rest }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...rest}>
    <path
      fill="currentColor"
      d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8L12 2.8Z"
    />
  </svg>
);

export const featurePaths: Record<IconName, React.ReactNode> = {
  code: <path d="m8.5 8-4 4 4 4M15.5 8l4 4-4 4M13.5 5.5l-3 13" />,
  layers: (
    <>
      <path d="m12 4 8.5 4.5L12 13 3.5 8.5 12 4Z" />
      <path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5" />
    </>
  ),
  rocket: (
    <>
      <path d="M14.5 4.5c2.8-.6 4.9-.4 5 0 .4.1.6 2.2 0 5-1 4.5-5.5 8-5.5 8l-3.5-3.5-3.5-3.5s3.5-4.5 7.5-6Z" />
      <path d="M9 12.5 6 12l-2 2 4 1M11.5 15l.5 3-2 2-1-4" />
      <circle cx="15" cy="9" r="1.5" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.5" />
      <path d="M5 6v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6M5 12v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="m20 20-4.5-4.5" />
    </>
  ),
  cpu: (
    <>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M10 3.5v3M14 3.5v3M10 17.5v3M14 17.5v3M3.5 10h3M3.5 14h3M17.5 10h3M17.5 14h3" />
    </>
  ),
  graduation: (
    <>
      <path d="m12 5 9.5 4.5L12 14 2.5 9.5 12 5Z" />
      <path d="M6.5 11.5V16c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3v-4.5M21.5 9.5v5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.5" />
      <path d="M2.5 19.5c.5-3.5 3.2-5.5 6.5-5.5s6 2 6.5 5.5" />
      <path d="M15.5 5.2a3.5 3.5 0 0 1 0 6.6M17.5 14.3c2.2.6 3.7 2.5 4 5.2" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
      <path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5M3.5 12.5h17" />
    </>
  ),
  book: (
    <>
      <path d="M4.5 5.5A1.5 1.5 0 0 1 6 4h13.5v14H6a1.5 1.5 0 0 0-1.5 1.5v-14Z" />
      <path d="M4.5 19.5A1.5 1.5 0 0 0 6 21h13.5M9 8h6.5" />
    </>
  ),
  newspaper: (
    <>
      <path d="M5 4.5h11.5v15H6.5A1.5 1.5 0 0 1 5 18V4.5Z" />
      <path d="M16.5 8.5h3V18a1.5 1.5 0 0 1-3 0M8 8h5.5M8 11.5h5.5M8 15h3.5" />
    </>
  ),
  sparkles: (
    <>
      <path d="M11 4.5 12.6 9l4.4 1.6-4.4 1.6L11 16.7l-1.6-4.5L5 10.6 9.4 9 11 4.5Z" />
      <path d="M18 14.5 18.8 17l2.2.7-2.2.8-.8 2.5-.8-2.5-2.2-.8 2.2-.7.8-2.5Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5 19 6v5.5c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5S9.7 5.9 12 3.5Z" />
    </>
  ),
  chart: <path d="M4.5 19.5h15M7.5 16v-4M11.5 16V8M15.5 16v-6M19.5 16V5.5" />,
  handshake: (
    <>
      <path d="m3 11.5 4-4 3 1 2-1.5 3 .5 6 5" />
      <path d="m7.5 13.5 3 3a1.4 1.4 0 0 0 2-2M11 15l2 2a1.4 1.4 0 0 0 2-2l-2.5-2.5M14.5 15.5l.8.8a1.4 1.4 0 0 0 2-2L13 10" />
      <path d="M3 11.5 6 15M21 12.5l-2.5 3" />
    </>
  ),
};

export function FeatureIcon({ name, size = 20, ...rest }: Props & { name: IconName }) {
  return (
    <Base size={size} {...rest}>
      {featurePaths[name]}
    </Base>
  );
}

type SocialName = "linkedin" | "x" | "github" | "youtube" | "instagram" | "facebook";

const socialPaths: Record<SocialName, string> = {
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.06c.53-1 1.83-1.75 3.44-1.75 3.68 0 4.2 2.2 4.2 5.1v6.15h-4v-5.45c0-1.3-.03-2.97-1.8-2.97-1.82 0-2.1 1.42-2.1 2.88v5.54h-4v-11Z",
  x: "M17.5 3h3.2l-7 8 8.3 10h-6.5l-5.1-6.2L4.6 21H1.4l7.5-8.6L1 3h6.6l4.6 5.7L17.5 3Zm-1.1 16.2h1.8L6.7 4.7H4.8l11.6 14.5Z",
  github:
    "M12 2a10 10 0 0 0-3.16 19.5c.5.1.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z",
  youtube:
    "M21.6 7.2a2.5 2.5 0 0 0-1.77-1.77C18.27 5 12 5 12 5s-6.27 0-7.83.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.77 1.77C5.73 19 12 19 12 19s6.27 0 7.83-.43a2.5 2.5 0 0 0 1.77-1.77A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z",
  instagram:
    "M12 3c2.44 0 2.75.01 3.71.05 2.43.11 3.57 1.26 3.68 3.68.04.96.05 1.27.05 3.71v1.12c0 2.44-.01 2.75-.05 3.71-.11 2.42-1.25 3.57-3.68 3.68-.96.04-1.27.05-3.71.05s-2.75-.01-3.71-.05c-2.43-.11-3.57-1.26-3.68-3.68C4.57 14.31 4.56 14 4.56 11.56v-1.12c0-2.44.01-2.75.05-3.71.11-2.42 1.25-3.57 3.68-3.68C9.25 3.01 9.56 3 12 3Zm0 4.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Zm0 7.4a2.9 2.9 0 1 1 0-5.8 2.9 2.9 0 0 1 0 5.8Zm4.7-8.6a1.05 1.05 0 1 0 0 2.1 1.05 1.05 0 0 0 0-2.1Z",
  facebook:
    "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.9 3.78-3.9 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
};

export function SocialIcon({ name, size = 20 }: { name: SocialName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d={socialPaths[name]} />
    </svg>
  );
}
