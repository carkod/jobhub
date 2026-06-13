import Metatags from "../../../src/components/Metatags";
import { AboutMe } from "../../../src/views/About";

export default function AboutMePage() {
  return (
    <>
      <Metatags title="About Me" description="About Carlos Wu" />
      <AboutMe />
    </>
  );
}
