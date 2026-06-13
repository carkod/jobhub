import MainResources from "../../../../src/views/resources/MainResources";

export default async function ResourcesPage({ params }) {
  const { language, id } = await params;

  return (
    <MainResources match={{ params: { language, id, position: id } }} />
  );
}
