"use client";

import { type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
};

export function Stagger({ children, className }: StaggerProps) {
  return <div className={className}>{children}</div>;
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
};

export function StaggerItem({ children, className }: StaggerItemProps) {
  return <div className={className}>{children}</div>;
}
