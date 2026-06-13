import ProjectDetail from "../../../../src/views/portfolio/ProjectDetail";

export default async function ProjectDetailPage({ params }) {
  const { language, position } = await params;

  return <ProjectDetail match={{ params: { language, position } }} />;
}
