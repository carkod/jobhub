import React from "react";
import Metatags from "../src/components/Metatags";
import FourOFour from "../src/pages/FourOFour";
import PageWrapper from "./PageWrapper";

export default function Custom404() {
  return (
    <>
      <Metatags
        title="Page Not Found"
        description="The page you requested was not found."
        robots="noindex, follow"
      />
      <PageWrapper>
        <FourOFour />
      </PageWrapper>
    </>
  );
}
