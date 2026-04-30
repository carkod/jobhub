import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Compatibility wrapper for older `to` props while using Next routing.
export default function NavLink({ to, href, exact, activeClassName, children, ...props }) {
  const router = useRouter();
  const linkHref = href || to; // Support both props for compatibility
  const isActive = exact 
    ? router.asPath === linkHref 
    : router.asPath.startsWith(linkHref);
  
  const className = isActive ? activeClassName : '';

  return (
    <Link href={linkHref} className={className} {...props}>
      {children}
    </Link>
  );
}
