import React from "react";
import Head from "next/head";
import FourOFour from "../src/pages/FourOFour";
import PageWrapper from "./PageWrapper";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Carlos Wu — Page Not Found</title>
        <meta name="description" content="Carlos Wu — Page not found" />
      </Head>
      <PageWrapper>
        <FourOFour />
      </PageWrapper>
    </>
  );
}
