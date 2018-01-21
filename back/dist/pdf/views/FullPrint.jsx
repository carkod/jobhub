import React, { Component } from 'react';
import PD from './PD';
import Work from './Work';
import Education from './Education';
import Languages from './Languages';
import WebDev from './WebDev';
import IT from './IT';

class FullPrint extends Component {
  
  render() {
    const cv = this.props;
    return (
      <html>
      <head>
         <link rel="stylesheet" href="/pdf/assets/index.css" />
      </head>
      <body>
      <div id="mainCV" className="container">
        <main className="cvContent">
            <h1>Carlos Wu - <small>{cv.name}</small></h1>
            <section id="summary">
              <h2>Summary and professional goals</h2>
              <div dangerouslySetInnerHTML={{__html: cv.summary}}></div>
            </section>
            <PD persdetails={cv.persdetails}/>
            <Work workExp={cv.workExp} />            
            <Education educ={cv.educ} />
            <Languages langSkills={cv.langSkills} />
            <WebDev webdevSkills={cv.webdevSkills} />
            <IT itSkills={cv.itSkills} />
            {/*<Others others={cv.others} />*/}
        </main>
      </div>
      </body>
      </html>
    )
  }
}

export default FullPrint;
