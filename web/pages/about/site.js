import React from "react";
import Head from "next/head";
import { AboutSite } from "../../src/pages/About";
import PageWrapper from "../PageWrapper";

export default function AboutSitePage() {
  return (
    <>
      <Head>
        <title>Carlos Wu — About this site</title>
        <meta name="description" content="Carlos Wu — About this site" />
        <meta property="og:title" content="Carlos Wu — About this site" />
        <meta property="og:description" content="Carlos Wu — About this site" />
        <meta property="og:type" content="website" />
      </Head>
      <PageWrapper>
        <AboutSite />
      </PageWrapper>
    </>
  );
}
