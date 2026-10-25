import MainCV from "../../../../src/views/cv/MainCV";
import { notFound } from "next/navigation";
import { excerpt, getPublicCV } from "../../../_lib/public-api";

export async function generateMetadata({ params }) {
  const { language, id } = await params;
  const cv = await getPublicCV(id);
  if (!cv || cv.cats?.locale !== language) {
    return { title: "CV not found", robots: { index: false } };
  }
  return { title: cv.name, description: excerpt(cv.summary) };
}

export default async function CVPage({ params }) {
  const { language, id } = await params;
  const cv = await getPublicCV(id);
  if (!cv || cv.cats?.locale !== language) notFound();
  return <MainCV match={{ params: { language, id } }} initialCv={cv} />;
}
