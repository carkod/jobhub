import React from "react";
import { useRouter } from "next/router";
import PageWrapper from "../../../views/PageWrapper";
import ProjectDetail from "../../../views/portfolio/ProjectDetail";

export default function ProjectDetailPage() {
  const router = useRouter();
  const { language, position } = router.query;
  if (!router.isReady) return null;
  return <PageWrapper><ProjectDetail match={{ params: { language, position } }} /></PageWrapper>;
}
