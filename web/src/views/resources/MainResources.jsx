import HtmlText from "../../components/HtmlText";
import Documents from "./Documents";
import Links from "./Links";

export default function MainResources({ match, initialProjects = [] }) {
  const { position } = match.params;
  const title = position || "Professional Profile";

  return (
    <div className="ed-resources">
      <h1>{title} Projects</h1>
      {initialProjects.length === 0 ? (
        <p className="ed-empty">No projects found.</p>
      ) : (
        initialProjects.map((project, index) => (
          <section
            key={project._id || project.slug || `${project.name}-${index}`}
          >
            <h2>{project.name}</h2>
            {project.desc && <HtmlText text={project.desc} />}
            <Links links={project.links} />
            <Documents documents={project.documents} />
          </section>
        ))
      )}
    </div>
  );
}
