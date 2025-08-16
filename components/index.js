'use client';
import { usePathname } from "next/navigation";

export function get_url() {
  const pathname = usePathname();

  return pathname;
}

