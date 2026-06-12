import Metatags from "../../../src/components/Metatags";
import { AboutSite } from "../../../src/views/About";

export default function AboutSitePage() {
  return (
    <>
      <Metatags
        title="About This Site"
        description="About the Carlos Wu website"
      />
      <AboutSite />
    </>
  );
}
