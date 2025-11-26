import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import MainCV from "../../../src/pages/cv/MainCV";
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
    <>
      <Head>
        <title>Carlos Wu — CV/Resume</title>
        <meta name="description" content="Carlos Wu — Curriculum Vitae and Resume" />
        <meta property="og:title" content="Carlos Wu — CV/Resume" />
        <meta property="og:description" content="Carlos Wu — Curriculum Vitae and Resume" />
        <meta property="og:type" content="website" />
      </Head>
      <PageWrapper>
        <MainCV {...mockProps} />
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
