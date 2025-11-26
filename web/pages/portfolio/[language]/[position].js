import React from "react";
import Head from "next/head";
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
    <>
      <Head>
        <title>Carlos Wu — Portfolio</title>
        <meta name="description" content="Carlos Wu — Project details" />
        <meta property="og:title" content="Carlos Wu — Portfolio" />
        <meta property="og:description" content="Carlos Wu — Project details" />
        <meta property="og:type" content="website" />
      </Head>
      <PageWrapper>
        <ProjectDetail {...mockProps} />
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
