import React from "react";
import { useRouter } from "next/router";
import PageWrapper from "../../../views/PageWrapper";
import MainResources from "../../../views/resources/MainResources";

export default function ResourcesPage() {
  const router = useRouter();
  const { language, id } = router.query;
  if (!router.isReady) return null;
  return <PageWrapper><MainResources match={{ params: { language, id, position: id } }} /></PageWrapper>;
}
