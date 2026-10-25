"use client";

import { useState } from "react";
import { generatePdfApi } from "../../actions/generate-pdf";
import HtmlText from "../../components/HtmlText";
import Education from "./Education";
import IT from "./IT";
import Languages from "./Languages";
import PD from "./PD";
import WebDev from "./WebDev";
import Work from "./Work";

export default function MainCV({ match, initialCv: cv }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getPdf = async (event) => {
    event.preventDefault();
    const { id, language } = match.params;
    setLoading(true);
    setError("");
    try {
      const content = await generatePdfApi("curriculum-vitae", id, language);
      const url = URL.createObjectURL(
        new Blob([content], { type: "application/pdf" }),
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = `Carlos-Wu-${cv.name}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Could not generate the PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="mainCV" className="container">
      {cv ? (
        <div className="ed-cv">
          <div className="ed-cv__header">
            <h1 className="ed-cv__title">
              Carlos Wu
              <span className="ed-cv__subtitle">{cv.name}</span>
            </h1>
            <button
              type="button"
              onClick={getPdf}
              className="ed-cv__download"
              disabled={loading}
              title="Download as PDF"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {loading ? "Generating…" : "Download PDF"}
            </button>
          </div>
          {error && (
            <p className="ed-cv__error" role="alert">
              {error}
            </p>
          )}

          {cv.summary && (
            <section id="summary" className="ed-cv__section ed-cv__summary">
              <h2 className="ed-cv__section-title">Summary</h2>
              <div className="ed-cv__summary-body">
                <HtmlText text={cv.summary} />
              </div>
            </section>
          )}

          <PD persdetails={cv.persdetails} />
          <Work workExp={cv.workExp ?? []} />
          <Education educ={cv.educ ?? []} />
          <Languages langSkills={cv.langSkills ?? []} />
          {cv.webdevSkills?.length > 0 && cv.webdevSkills[0].name !== "" && (
            <WebDev webdevSkills={cv.webdevSkills} />
          )}
          {cv.itSkills?.length > 0 && cv.itSkills[0].name !== "" && (
            <IT itSkills={cv.itSkills} />
          )}
        </div>
      ) : (
        <div className="ed-loading">Loading…</div>
      )}
    </div>
  );
}
