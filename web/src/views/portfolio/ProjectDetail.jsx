import HtmlText from "../../components/HtmlText";
import Documents from "./Documents";
import Links from "./Links";

export default function ProjectDetail({ match, initialProjects = [] }) {
  const { position } = match.params;
  const title = position
    ? position.charAt(0).toUpperCase() + position.slice(1)
    : "Portfolio";

  return (
    <div id="mainportfolio" className="container">
      <div className="ed-portfolio">
        <div style={{ marginBottom: "3rem" }}>
          <h1 className="ed-heading">{title}</h1>
        </div>

        {initialProjects.length === 0 && (
          <p className="ed-empty">No projects found for this category.</p>
        )}

        {initialProjects.map((project) => (
          <article key={project._id || project.slug} className="ed-project">
            <h2 className="ed-project__name">{project.name}</h2>
            <div className="ed-project__grid">
              <div className="ed-project__desc">
                <HtmlText text={project.desc} />
              </div>
              <aside className="ed-project__aside">
                <Links links={project.links} />
                <Documents documents={project.documents} />
              </aside>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
