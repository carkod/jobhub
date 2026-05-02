import React from "react";
import { useRouter } from "next/router";
import ProjectDetail from "../../../src/pages/portfolio/ProjectDetail";
import PageWrapper from "../../PageWrapper";

export default function ProjectDetailPage() {
  const router = useRouter();
  const { language, position } = router.query;

  // Create a mock match object for the existing component
  const mockProps = {
    match: {
      params: { language, position }
    }
  };

  return (
    <PageWrapper>
      <ProjectDetail {...mockProps} />
    </PageWrapper>
  );
}

// Force this page to be server-side rendered
export async function getServerSideProps() {
  return {
    props: {},
  };
}
