import React, { Component } from "react";
import Education from "../Education";
import IT from "../IT";
import Languages from "../Languages";
import Work from "../Work";
import PD from "./PD.esp";

function stripHtml(html) {
  return html.replace(/(<([^>]+)>)/gi, "");
}

const titles = {
  summary: "Resumen y objetivos profesionales",
  work: "Experiencia laboral",
  education: "Formación",
  skills: {
    languages: "Idiomas",
    webdev: "Conocimientos técnicos",
  },
  it: "Informática"
};

export default class FullPrint extends Component {
  render() {
    const cv = this.props;
    return (
      <html>
        <head>
          <link rel="stylesheet" href="/pdf/assets/index.css" />
        </head>
        <body>
          <div id="fullprint" className="container">
            <main className="cvContent">
              <h1>
                Carlos Wu - <small>{cv.name}</small>
              </h1>
              <section id="summary">
                {stripHtml(cv.summary) !== "" && (
                  <>
                    <h2>{titles.summary}</h2>
                    <div dangerouslySetInnerHTML={{ __html: cv.summary }}></div>
                  </>
                )}
              </section>

              {/* Mandatory fields */}
              <PD persdetails={cv.persdetails} />
              <Work workExp={cv.workExp} title={titles.work} />
              <Education educ={cv.educ} title={titles.education} />

              {/* Optional fields */}
              {cv.langSkills.length > 0 && (
                <Languages
                  langSkills={cv.langSkills}
                  webdevSkills={cv.webdevSkills}
                  title={titles.skills}
                />
              )}
              {/* { cv.webdevSkills.length > 0 && <WebDev webdevSkills={cv.webdevSkills} /> } */}
              {cv.itSkills.length > 0 && (
                <IT itSkills={cv.itSkills} title={titles.it} />
              )}
            </main>
          </div>
        </body>
      </html>
    );
  }
}
