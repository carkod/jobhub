import MainResources from "../../../../src/views/resources/MainResources";
import {
  getPublicProjects,
  projectsForCategory,
} from "../../../_lib/public-api";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `${id} | Portfolio`,
    description: `Portfolio and projects by Carlos Wu — ${id}`,
  };
}

export default async function ResourcesPage({ params }) {
  const { language, id } = await params;
  const projects = projectsForCategory(await getPublicProjects(), language, id);

  return (
    <MainResources
      match={{ params: { language, id, position: id } }}
      initialProjects={projects}
    />
  );
}
