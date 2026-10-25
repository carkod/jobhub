"use client";

import { usePathname } from "next/navigation";
import CookieBanner from "../src/components/CookieBanner";
import Layout from "../src/views/Layout";

export default function PageWrapper({ children }) {
  const pathname = usePathname();

  return (
    <Layout>
      <main className="ed-main">
        <div key={pathname} className="page-transition">
          {children}
        </div>
      </main>
      <CookieBanner />
    </Layout>
  );
}
