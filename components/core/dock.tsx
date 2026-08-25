"use client";

import {
  useRef,
  useState,
  useCallback,
  Children,
  isValidElement,
  cloneElement,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";

/* ── Dock ────────────────────────────────────────────────────── */

type DockProps = {
  children: ReactNode;
  className?: string;
};

export function Dock({ children, className = "" }: DockProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);

  const handlePointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      setMouseX(e.clientX);
    },
    [],
  );

  const handlePointerLeave = useCallback(() => setMouseX(null), []);

  return (
    <div
      ref={trackRef}
      className={`dock ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {Children.map(children, (child) => {
        if (!isValidElement(child)) return child;
        return cloneElement(child as React.ReactElement<{ mouseX?: number | null }>, { mouseX });
      })}
    </div>
  );
}

/* ── DockItem ────────────────────────────────────────────────── */

type DockItemProps = {
  children: ReactNode;
  href: string;
  mouseX?: number | null;
  label: string;
  distance?: number;
  magnification?: number;
};

export function DockItem({
  children,
  href,
  mouseX = null,
  label,
  distance = 120,
  magnification = 50,
}: DockItemProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const calculateScale = (): number => {
    if (mouseX === null || !ref.current) return 1;
    const rect = ref.current.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const dist = Math.abs(mouseX - center);
    if (dist > distance) return 1;
    return 1 + (magnification / 100) * (1 - dist / distance);
  };

  const scale = calculateScale();

  return (
    <a
      ref={ref}
      href={href}
      className="dock-item"
      style={{ transform: `scale(${scale})` }}
    >
      <span className="dock-item-icon">{children}</span>
      <span className="dock-item-label">{label}</span>
    </a>
  );
}
