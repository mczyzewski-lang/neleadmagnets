import type { SVGProps } from "react";

const paths: Record<string, string> = {
  home: "M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  wallet: "M3 7a2 2 0 0 1 2-2h13v4M3 7v11a2 2 0 0 0 2 2h15V9H5a2 2 0 0 1-2-2Zm14 7h.01",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  map: "M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14",
  handshake: "M8 12l3 3a2 2 0 0 0 3-3l-3-3M2 11l4-4 4 2 3-2 4 1 5 4-4 4-2-1M6 15l2 2",
  coins: "M8 7c0-1.7 2.7-3 6-3s6 1.3 6 3-2.7 3-6 3-6-1.3-6-3Zm0 0v4c0 1.7 2.7 3 6 3s6-1.3 6-3V7M4 12c0-1.7 2.7-3 6-3M4 12v4c0 1.7 2.7 3 6 3 1.2 0 2.3-.2 3.2-.5M4 12c0 1.7 2.7 3 6 3",
  split: "M12 3v18M5 7h4M5 12h4M15 7h4M15 12h4M5 17h4M15 17h4",
  checklist: "M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2",
  check: "M5 12.5 10 17 19 7",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  arrowLeft: "M19 12H5M11 6l-6 6 6 6",
  info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-11v6m0-9h.01",
  alert: "M12 3 2 20h20L12 3Zm0 6v5m0 3h.01",
  shield: "M12 3 4 6v6c0 4.5 3.4 8.3 8 9 4.6-.7 8-4.5 8-9V6z",
  lock: "M6 11h12v10H6zM8 11V8a4 4 0 0 1 8 0v3",
  download: "M12 4v11m0 0-4-4m4 4 4-4M5 20h14",
  print: "M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  edit: "M4 20h4L19 9l-4-4L4 16zM14 6l4 4",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v5l3 2",
  gift: "M4 10h16v10H4zM2 7h20v3H2zM12 7v13M12 7S9 2 7 4s5 3 5 3Zm0 0s3-5 5-3-5 3-5 3Z",
  book: "M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6M20 4v14h-6",
  phone: "M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-8 9a8 8 0 0 1 16 0",
  trash: "M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3",
  sparkle: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6",
  scale: "M12 3v18M7 21h10M5 7h14M5 7l-3 7a3 3 0 0 0 6 0zM19 7l-3 7a3 3 0 0 0 6 0z",
  doc: "M6 3h9l4 4v14H6zM14 3v5h5M9 13h6M9 17h6",
  plus: "M12 5v14M5 12h14",
  x: "M6 6l12 12M18 6 6 18",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z",
  bank: "M3 10 12 4l9 6M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18",
  message: "M4 5h16v11H8l-4 4z",
};

export type IconName = keyof typeof paths;

export function Icon({ name, ...rest }: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
      <path d={paths[name]} />
    </svg>
  );
}
