"use client";

import { useEffect, useState } from "react";
import { fetchProjects } from "../../actions/res";
import HtmlText from "../../components/HtmlText";
import Documents from "./Documents";
import Links from "./Links";
import Metatags from "../../components/Metatags";

export default function MainResources({ match }) {
  const { position, language } = match.params;
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProjects() {
      setLoading(true);

      try {
        const allProjects = await fetchProjects();
        const filtered = (allProjects || []).filter((project) => {
          const matchPos = project.cats?.position?.toLowerCase() === position;
          const matchStatus = project.cats?.status?.toLowerCase() === "public";
          const matchLang = project.cats?.locale === language;

          return matchPos && matchStatus && matchLang;
        });

        if (!cancelled) setPortfolio(filtered);
      } catch (error) {
        console.warn("Could not load portfolio:", error.message);
        if (!cancelled) setPortfolio([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProjects();

    return () => {
      cancelled = true;
    };
  }, [language, position]);

  const title = position || "Professional Profile";

  if (loading) return <div className="ed-loading">Loading…</div>;

  return (
    <div className="ed-portfolio">
      <Metatags
        title={`${title} | Portfolio`}
        description={`Portfolio and projects by Carlos Wu — ${title}`}
      />
      <h1>{title} Projects</h1>
      {portfolio.length === 0 ? (
        <p className="ed-empty">No projects found.</p>
      ) : (
        portfolio.map((project, index) => (
          <section
            key={project.id || project._id || `${project.name}-${index}`}
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
