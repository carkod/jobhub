"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  to,
  href,
  exact,
  activeClassName,
  className,
  children,
  ...props
}) {
  const location = usePathname();
  const linkHref = href || to;
  const isActive = exact
    ? location === linkHref
    : location.startsWith(linkHref);
  const combinedClass = [className, isActive ? activeClassName : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={linkHref} className={combinedClass || undefined} {...props}>
      {children}
    </Link>
  );
}
