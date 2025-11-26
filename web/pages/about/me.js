import React from "react";
import Head from "next/head";
import { AboutMe } from "../../src/pages/About";
import PageWrapper from "../PageWrapper";

export default function AboutMePage() {
  return (
    <>
      <Head>
        <title>Carlos Wu — About Me</title>
        <meta name="description" content="Carlos Wu — About Me" />
        <meta property="og:title" content="Carlos Wu — About Me" />
        <meta property="og:description" content="Carlos Wu — About Me" />
        <meta property="og:type" content="website" />
      </Head>
      <PageWrapper>
        <AboutMe />
      </PageWrapper>
    </>
  );
}
