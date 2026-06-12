import Metatags from "../src/components/Metatags";
import FourOFour from "../src/views/FourOFour";

export default function NotFound() {
  return (
    <>
      <Metatags
        title="Page Not Found"
        description="The page you requested was not found."
        robots="noindex, follow"
      />
      <FourOFour />
    </>
  );
}
