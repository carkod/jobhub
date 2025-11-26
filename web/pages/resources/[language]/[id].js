import React from "react";
import Head from "next/head";
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
    <>
      <Head>
        <title>Carlos Wu — Resources</title>
        <meta name="description" content="Carlos Wu — Resources and materials" />
        <meta property="og:title" content="Carlos Wu — Resources" />
        <meta property="og:description" content="Carlos Wu — Resources and materials" />
        <meta property="og:type" content="website" />
      </Head>
      <PageWrapper>
        <MainResources {...mockProps} />
      </PageWrapper>
    </>
  );
}

// Force this page to be server-side rendered
export async function getServerSideProps() {
  return {
    props: {},
  };
}
