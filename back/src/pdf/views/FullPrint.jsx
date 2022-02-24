import React, { Component } from "react";
import Education from "./Education";
import IT from "./IT";
import Languages from "./Languages";
import PD from "./PD";
import Work from "./Work";


function stripHtml(html) {
  return html.replace(/(<([^>]+)>)/gi, "");
}

const titles = {
  summary: "Summary and professional goals",
  work: "Work Experience",
  education: "Education",
  skills: {
    languages: "Languages",
    webdev: "Web development",
  },
  it: "IT"
};

class FullPrint extends Component {
  render() {
    const cv = this.props;
    return (
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href={`/pdf/assets/index.css`} />
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
                    <h2>Summary and professional goals</h2>
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

export default FullPrint;
