import type { ReactNode } from "react";
import { Icon } from "./Icon";

export function Alert({ tone = "info", title, children, className = "" }: { tone?: "info" | "warn" | "danger" | "ok" | "safety"; title?: string; children: ReactNode; className?: string }) {
  const icon = tone === "ok" ? "check" : tone === "info" ? "info" : tone === "safety" ? "shield" : "alert";
  return (
    <div className={`alert alert--${tone} ${className}`} role={tone === "danger" ? "alert" : undefined}>
      <Icon name={icon} />
      <div>
        {title && <p style={{ marginBottom: 4 }}><strong>{title}</strong></p>}
        {children}
      </div>
    </div>
  );
}
