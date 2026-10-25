import Home from "../src/views/home/Home";
import { getPublicCVNavigation } from "./_lib/public-api";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Professional Profile | Carlos Wu",
  description:
    "Software engineer and entrepreneur building products that scale.",
};

export default async function HomePage() {
  const cvs = await getPublicCVNavigation();
  return <Home cvs={cvs} />;
}
