import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base: IconProps = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: false,
};

export function IconGlobe(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14.5 14.5 0 0 1 0 18a14.5 14.5 0 0 1 0-18Z" />
      <path d="M5 6.5c1.9 1.2 4.3 1.9 7 1.9s5.1-.7 7-1.9" />
      <path d="M5 17.5c1.9-1.2 4.3-1.9 7-1.9s5.1.7 7 1.9" />
    </svg>
  );
}

export function IconChat(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 9.5A4.5 4.5 0 0 1 8 5h6a4.5 4.5 0 0 1 4.5 4.5v1A4.5 4.5 0 0 1 14 15h-3.2L7 18v-3.2a4.5 4.5 0 0 1-3.5-4.4v-.9Z" />
      <path d="M8.5 10h5" />
      <path d="M8.5 12.6h3" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.2V12l3.2 1.9" />
    </svg>
  );
}

export function IconCompass(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.4 8.6l-1.9 4.9-4.9 1.9 1.9-4.9 4.9-1.9Z" />
    </svg>
  );
}

export function IconRepeat(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 9.5A4.5 4.5 0 0 1 8.5 5H17" />
      <path d="m14.5 2.5 3 2.5-3 2.5" />
      <path d="M20 14.5A4.5 4.5 0 0 1 15.5 19H7" />
      <path d="m9.5 21.5-3-2.5 3-2.5" />
    </svg>
  );
}

export function IconMedal(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="14.5" r="5" />
      <path d="m9 9.6-2.6-5A1 1 0 0 1 7.3 3.2h9.4a1 1 0 0 1 .9 1.4l-2.6 5" />
      <path d="m12 12.4.9 1.9 2 .3-1.5 1.4.4 2-1.8-1-1.8 1 .4-2-1.5-1.4 2-.3.9-1.9Z" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m4.5 12.5 4.8 4.8L19.5 7" />
    </svg>
  );
}

export function IconCheckCircle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.3 2.7 2.7L16.2 9.5" />
    </svg>
  );
}

export function IconAlert(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.6v5" />
      <path d="M12 16.1h.01" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4.5 8 6.4 4.5a2 2 0 0 0 2.2 0L19.5 8" />
    </svg>
  );
}

export function IconUser(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5 19.2a7 7 0 0 1 14 0" />
    </svg>
  );
}

export function IconSparkle(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5c.6 3.9 1.9 5.2 5.8 5.8-3.9.6-5.2 1.9-5.8 5.8-.6-3.9-1.9-5.2-5.8-5.8 3.9-.6 5.2-1.9 5.8-5.8Z" />
      <path d="M18.2 15.4c.3 1.9.9 2.5 2.8 2.8-1.9.3-2.5.9-2.8 2.8-.3-1.9-.9-2.5-2.8-2.8 1.9-.3 2.5-.9 2.8-2.8Z" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.2l6.5 2.4v5.3c0 3.9-2.6 7.4-6.5 8.9-3.9-1.5-6.5-5-6.5-8.9V5.6L12 3.2Z" />
      <path d="m9.3 11.8 1.9 1.9 3.5-3.6" />
    </svg>
  );
}

export function IconDownload(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.8v10.4" />
      <path d="m7.8 10.4 4.2 4.2 4.2-4.2" />
      <path d="M4.5 17.5v1.2a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-1.2" />
    </svg>
  );
}

export function IconVideo(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="6" width="12.5" height="12" rx="3" />
      <path d="m15.5 12.8 4-2.6a.8.8 0 0 1 1.2.7v4.2a.8.8 0 0 1-1.2.7l-4-2.6v-.4Z" />
    </svg>
  );
}

export function IconStar(props: IconProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
      {...props}
    >
      <path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.4 1.1 6.2L12 17.1l-5.6 2.9 1.1-6.2L2.9 9.4l6.3-.9L12 2.8Z" />
    </svg>
  );
}

export function IconQuote(props: IconProps) {
  return (
    <svg
      width={28}
      height={28}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      focusable="false"
      {...props}
    >
      <path d="M9.4 5.5c-3.4 1.3-5.6 4.3-5.6 8v5h6.6v-6.6H7.1c.2-1.9 1.3-3.2 3.2-3.9L9.4 5.5Zm9.4 0c-3.4 1.3-5.6 4.3-5.6 8v5h6.6v-6.6h-3.3c.2-1.9 1.3-3.2 3.2-3.9l-.9-2.5Z" />
    </svg>
  );
}

export const BENEFIT_ICONS = {
  globe: IconGlobe,
  chat: IconChat,
  clock: IconClock,
} as const;

export const STEP_ICONS = {
  compass: IconCompass,
  chat: IconChat,
  repeat: IconRepeat,
  medal: IconMedal,
} as const;
