import React from "react";
import Head from "next/head";
import { About } from "../src/pages/About";
import PageWrapper from "./PageWrapper";

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>Carlos Wu — About</title>
        <meta name="description" content="Carlos Wu — About" />
        <meta property="og:title" content="Carlos Wu — About" />
        <meta property="og:description" content="Carlos Wu — About" />
        <meta property="og:type" content="website" />
      </Head>
      <PageWrapper>
        <About />
      </PageWrapper>
    </>
  );
}
