import React from "react";
import Head from "next/head";
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
    <>
      <Head>
        <title>Carlos Wu — Blog Post</title>
        <meta name="description" content="Carlos Wu — Blog post" />
        <meta property="og:title" content="Carlos Wu — Blog Post" />
        <meta property="og:description" content="Carlos Wu — Blog post" />
        <meta property="og:type" content="article" />
      </Head>
      <PageWrapper>
        <BlogDetail {...mockProps} />
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
