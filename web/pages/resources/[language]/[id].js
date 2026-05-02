import React from "react";
import { useRouter } from "next/router";
import MainResources from "../../../src/pages/resources/MainResources";
import PageWrapper from "../../PageWrapper";

export default function ResourcesPage() {
  const router = useRouter();
  const { language, id } = router.query;

  // Create a mock match object for the existing component
  const mockProps = {
    match: {
      params: { language, id }
    }
  };

  return (
    <PageWrapper>
      <MainResources {...mockProps} />
    </PageWrapper>
  );
}

// Force this page to be server-side rendered
export async function getServerSideProps() {
  return {
    props: {},
  };
}
