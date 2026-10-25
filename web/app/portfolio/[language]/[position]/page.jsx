import ProjectDetail from "../../../../src/views/portfolio/ProjectDetail";
import {
  getPublicProjects,
  projectsForCategory,
} from "../../../_lib/public-api";

export async function generateMetadata({ params }) {
  const { position } = await params;
  return {
    title: position,
    description: `Portfolio and projects by Carlos Wu — ${position}`,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { language, position } = await params;
  const projects = projectsForCategory(
    await getPublicProjects(),
    language,
    position,
  );
  return (
    <ProjectDetail
      match={{ params: { language, position } }}
      initialProjects={projects}
    />
  );
}
