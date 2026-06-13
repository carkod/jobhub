"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchPortfolioNav } from "../../actions/res";
import Metatags from "../../components/Metatags";

function getCategories(projects) {
  const categories = new Map();

  projects.forEach((project) => {
    const position = project.cats?.position?.trim();
    const language = project.cats?.locale || "en-GB";

    if (!position) return;

    const key = `${language}:${position.toLowerCase()}`;
    if (!categories.has(key)) {
      categories.set(key, { language, position });
    }
  });

  return Array.from(categories.values());
}

export default function PortfolioIndex() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    fetchPortfolioNav()
      .then((projects) => {
        if (active) {
          setCategories(getCategories(Array.isArray(projects) ? projects : []));
        }
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="ed-portfolio-index">
      <Metatags title="Portfolio" description="Portfolio and projects" />
      <h1 className="ed-heading">Portfolio</h1>

      {loading && <div className="ed-loading">Loading…</div>}
      {!loading && error && (
        <p className="ed-empty">Portfolio categories could not be loaded.</p>
      )}
      {!loading && !error && categories.length === 0 && (
        <p className="ed-empty">No public projects are available.</p>
      )}

      {!loading && !error && categories.length > 0 && (
        <div className="ed-portfolio-grid">
          {categories.map(({ language, position }) => (
            <Link
              key={`${language}:${position}`}
              href={`/portfolio/${encodeURIComponent(language)}/${encodeURIComponent(position)}`}
              className="ed-portfolio-card"
            >
              <div className="ed-portfolio-card__title">{position}</div>
              <span className="ed-portfolio-card__cta">View projects</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
