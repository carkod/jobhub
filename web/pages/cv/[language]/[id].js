import React from "react";
import { useRouter } from "next/router";
import MainCV from "../../../src/views/cv/MainCV";
import PageWrapper from "../../PageWrapper";

export default function CVPage() {
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
      <MainCV {...mockProps} />
    </PageWrapper>
  );
}

// Force this page to be server-side rendered
export async function getServerSideProps() {
  return {
    props: {},
  };
}
