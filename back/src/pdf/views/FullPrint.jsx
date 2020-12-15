import React, { Component } from 'react';
import PD from './PD';
import Work from './Work';
import Education from './Education';
import Languages from './Languages';
import WebDev from './WebDev';
import IT from './IT';

function stripHtml(html) {
   return html.replace(/(<([^>]+)>)/gi, "");
}

class FullPrint extends Component {
  
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
            <h1>Carlos Wu - <small>{cv.name}</small></h1>
            <section id="summary">
              {stripHtml(cv.summary) !== '' && (
                <>
                <h2>Summary and professional goals</h2>
                <div dangerouslySetInnerHTML={{__html: cv.summary}}></div>
                </>
              )
              }
            </section>

            {/* Mandatory fields */}
            <PD persdetails={cv.persdetails}/>
            <Work workExp={cv.workExp} />            
            <Education educ={cv.educ} />
            
            {/* Optional fields */}
            { cv.langSkills.length > 0 && <Languages langSkills={cv.langSkills} /> }
            { cv.webdevSkills.length > 0 && <WebDev webdevSkills={cv.webdevSkills} /> }
            { cv.itSkills.length > 0 && <IT itSkills={cv.itSkills} /> }

        </main>
      </div>
      </body>
      </html>
    )
  }
}

export default FullPrint;
