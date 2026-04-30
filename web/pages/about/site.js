import React from "react";
import Metatags from "../../src/components/Metatags";
import { AboutSite } from "../../src/pages/About";
import PageWrapper from "../PageWrapper";

export default function AboutSitePage() {
  return (
    <>
      <Metatags title="About This Site" description="About the Carlos Wu website" />
      <PageWrapper>
        <AboutSite />
      </PageWrapper>
    </>
  );
}
