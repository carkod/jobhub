import MainCV from "../../../../src/views/cv/MainCV";

export default async function CVPage({ params }) {
  const { language, id } = await params;

  return <MainCV match={{ params: { language, id } }} />;
}
