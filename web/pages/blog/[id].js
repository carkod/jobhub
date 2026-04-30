import React from "react";
import { useRouter } from "next/router";
import BlogDetail from "../../src/pages/blog/BlogDetail";
import PageWrapper from "../PageWrapper";

export default function BlogDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  // Create a mock match object for the existing component
  const mockProps = {
    match: {
      params: { id }
    }
  };

  return (
    <PageWrapper>
      <BlogDetail {...mockProps} />
    </PageWrapper>
  );
}

// Force this page to be server-side rendered
export async function getServerSideProps() {
  return {
    props: {},
  };
}
