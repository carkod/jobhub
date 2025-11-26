import React from "react";
import Head from "next/head";
import Home from "../src/pages/home/Home";
import PageWrapper from "./PageWrapper";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Carlos Wu — Professional profile</title>
        <meta
          name="description"
          content="Carlos Wu — Full-stack developer, business analyst, investor"
        />
        <meta property="og:title" content="Carlos Wu — Professional profile" />
        <meta
          property="og:description"
          content="Carlos Wu — Full-stack developer, business analyst, investor"
        />
        <meta property="og:type" content="website" />
      </Head>
      <PageWrapper>
        <Home />
      </PageWrapper>
    </>
  );
}
