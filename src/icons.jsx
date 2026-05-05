import React from "react";

function SvgIcon({ children, size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (props) => (
  <SvgIcon {...props}><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></SvgIcon>
);
export const BadgeCheck = (props) => (
  <SvgIcon {...props}><path d="M8 3.5 12 2l4 1.5 3 3V11c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6.5l3-3Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></SvgIcon>
);
export const BriefcaseBusiness = (props) => (
  <SvgIcon {...props}><path d="M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1" /><path d="M4 8h16v11H4z" /><path d="M4 13h16" /><path d="M10 13v2h4v-2" /></SvgIcon>
);
export const Building2 = (props) => (
  <SvgIcon {...props}><path d="M6 21V4h9v17" /><path d="M15 9h4v12" /><path d="M9 8h3" /><path d="M9 12h3" /><path d="M9 16h3" /><path d="M3 21h18" /></SvgIcon>
);
export const Check = (props) => (
  <SvgIcon {...props}><path d="m5 12 4 4L19 6" /></SvgIcon>
);
export const ChevronDown = (props) => (
  <SvgIcon {...props}><path d="m6 9 6 6 6-6" /></SvgIcon>
);
export const CircleDot = (props) => (
  <SvgIcon {...props}><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" /></SvgIcon>
);
export const ClipboardCheck = (props) => (
  <SvgIcon {...props}><path d="M9 3h6l1 2h3v16H5V5h3l1-2Z" /><path d="m8.5 13 2.3 2.3 4.7-5" /></SvgIcon>
);
export const Clock3 = (props) => (
  <SvgIcon {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l4 2" /></SvgIcon>
);
export const LifeBuoy = (props) => (
  <SvgIcon {...props}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="4" /><path d="m5.7 5.7 3.1 3.1" /><path d="m15.2 15.2 3.1 3.1" /><path d="m18.3 5.7-3.1 3.1" /><path d="m8.8 15.2-3.1 3.1" /></SvgIcon>
);
export const Mail = (props) => (
  <SvgIcon {...props}><path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" /></SvgIcon>
);
export const MapPin = (props) => (
  <SvgIcon {...props}><path d="M12 21s7-5.3 7-12a7 7 0 0 0-14 0c0 6.7 7 12 7 12Z" /><circle cx="12" cy="9" r="2.5" /></SvgIcon>
);
export const Menu = (props) => (
  <SvgIcon {...props}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></SvgIcon>
);
export const MessageCircle = (props) => (
  <SvgIcon {...props}><path d="M21 11.5a8.5 8.5 0 0 1-12.5 7.5L4 20l1.1-4A8.5 8.5 0 1 1 21 11.5Z" /></SvgIcon>
);
export const MonitorSmartphone = (props) => (
  <SvgIcon {...props}><path d="M4 5h12v9H4z" /><path d="M8 18h4" /><path d="M10 14v4" /><path d="M18 10h3v9h-3z" /></SvgIcon>
);
export const Phone = (props) => (
  <SvgIcon {...props}><path d="M22 16.5v3a2 2 0 0 1-2.2 2A19 19 0 0 1 2.5 4.2 2 2 0 0 1 4.5 2h3L9 7 6.8 8.8a13 13 0 0 0 8.4 8.4L17 15l5 1.5Z" /></SvgIcon>
);
export const Save = (props) => (
  <SvgIcon {...props}><path d="M5 3h12l2 2v16H5z" /><path d="M8 3v6h8V3" /><path d="M8 21v-7h8v7" /></SvgIcon>
);
export const ShieldCheck = (props) => (
  <SvgIcon {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m8.5 12 2.2 2.2 4.8-5" /></SvgIcon>
);
export const Sparkles = (props) => (
  <SvgIcon {...props}><path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3Z" /><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" /></SvgIcon>
);
export const Store = (props) => (
  <SvgIcon {...props}><path d="M4 10h16l-1.5-6h-13L4 10Z" /><path d="M5 10v10h14V10" /><path d="M9 20v-5h6v5" /><path d="M4 10c0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 3 0 0 2 3 2 4 0" /></SvgIcon>
);
export const Wrench = (props) => (
  <SvgIcon {...props}><path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5L15 12l-3-3 2.7-2.7Z" /></SvgIcon>
);
export const X = (props) => (
  <SvgIcon {...props}><path d="M6 6l12 12" /><path d="M18 6 6 18" /></SvgIcon>
);
