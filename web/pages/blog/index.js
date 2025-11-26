import React from "react";
import Head from "next/head";
import BlogIndex from "../../src/pages/blog/BlogIndex";
import PageWrapper from "../PageWrapper";

export default function BlogIndexPage() {
  return (
    <>
      <Head>
        <title>Carlos Wu — Blog</title>
        <meta name="description" content="Carlos Wu — Blog posts and articles" />
        <meta property="og:title" content="Carlos Wu — Blog" />
        <meta property="og:description" content="Carlos Wu — Blog posts and articles" />
        <meta property="og:type" content="website" />
      </Head>
      <PageWrapper>
        <BlogIndex />
      </PageWrapper>
    </>
  );
}
