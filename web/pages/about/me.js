import React from "react";
import Metatags from "../../src/components/Metatags";
import { AboutMe } from "../../src/views/About";
import PageWrapper from "../PageWrapper";

export default function AboutMePage() {
  return (
    <>
      <Metatags title="About Me" description="About Carlos Wu" />
      <PageWrapper>
        <AboutMe />
      </PageWrapper>
    </>
  );
}
