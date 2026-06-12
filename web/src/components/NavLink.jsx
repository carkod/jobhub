import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavLink({ to, href, exact, activeClassName, className, children, ...props }) {
  const router = useRouter();
  const location = router.pathname;
  const linkHref = href || to;
  const isActive = exact ? location === linkHref : location.startsWith(linkHref);
  const combinedClass = [className, isActive ? activeClassName : ""].filter(Boolean).join(" ");

  return (
    <Link href={linkHref} className={combinedClass || undefined} {...props}>
      {children}
    </Link>
  );
}
