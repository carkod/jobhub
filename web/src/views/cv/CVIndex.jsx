"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchCVNav } from "../../actions/cv";
import Metatags from "../../components/Metatags";

export default function CVIndex() {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    fetchCVNav()
      .then((data) => {
        if (active) setCvs(Array.isArray(data) ? data : []);
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
      <Metatags title="CV" description="Curriculum vitae and experience" />
      <h1 className="ed-heading">CV</h1>

      {loading && <div className="ed-loading">Loading…</div>}
      {!loading && error && (
        <p className="ed-empty">CVs could not be loaded.</p>
      )}
      {!loading && !error && cvs.length === 0 && (
        <p className="ed-empty">No public CVs are available.</p>
      )}

      {!loading && !error && cvs.length > 0 && (
        <div className="ed-portfolio-grid">
          {cvs.map((cv) => {
            const language = cv.cats?.locale || "en-GB";
            const id = cv.slug || cv._id;

            return (
              <Link
                key={cv._id}
                href={`/cv/${encodeURIComponent(language)}/${encodeURIComponent(id)}`}
                className="ed-portfolio-card"
              >
                <div className="ed-portfolio-card__title">
                  {cv.navName || "View CV"}
                </div>
                <span className="ed-portfolio-card__cta">View CV</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
