import React from "react";
import { useRouter } from "next/router";
import PageWrapper from "../../../views/PageWrapper";
import MainCV from "../../../views/cv/MainCV";

export default function CVDetailPage() {
  const router = useRouter();
  const { language, id } = router.query;
  if (!router.isReady) return null;
  return <PageWrapper><MainCV match={{ params: { language, id } }} /></PageWrapper>;
}
