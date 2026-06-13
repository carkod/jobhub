import React from "react";
import { useRouter } from "next/router";
import PageWrapper from "../../views/PageWrapper";
import BlogDetail from "../../views/blog/BlogDetail";

export default function BlogDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  if (!router.isReady) return null;
  return <PageWrapper><BlogDetail match={{ params: { id } }} /></PageWrapper>;
}
