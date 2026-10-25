import FourOFour from "../src/views/FourOFour";

export const metadata = {
  title: "Page Not Found",
  description: "The page you requested was not found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <FourOFour />;
}
