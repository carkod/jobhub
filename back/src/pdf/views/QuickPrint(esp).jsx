import React, { Component } from 'react';
import PD from './PD(esp)';
import Work from './Work(esp)';
import Education from './Education(esp)';
import Languages from './Languages(esp)';
import WebDev from './WebDev(esp)';
import IT from './IT(esp)';

class QuickPrint extends Component {
  
  render() {
    const cv = this.props;
    return (
      <html>
      <head>
         <link rel="stylesheet" href="/pdf/assets/index.css" />
      </head>
      <body>
      <div id="quickprint" className="container">
        <main className="cvContent">
            <h1>Carlos Wu - <small>{cv.name}</small></h1>
            <section id="summary">
              <h2>Resumen y objetivos profesionales</h2>
              <div dangerouslySetInnerHTML={{__html: cv.summary}}></div>
            </section>
            <PD persdetails={cv.persdetails}/>
            <Work workExp={cv.workExp} />            
            <Education educ={cv.educ} />
            <Languages langSkills={cv.langSkills} />
            
            {/*Optional fields*/}
            {cv.webdevSkills.length > 1 && cv.webdevSkills[0].name !== '' ? <WebDev webdevSkills={cv.webdevSkills} /> : ''}
            {cv.itSkills.length > 1 && cv.itSkills[0].name !== '' ? <IT itSkills={cv.itSkills} /> : ''}
            {/*<Others others={cv.others} />*/}
        </main>
      </div>
      </body>
      </html>
    )
  }
}

export default QuickPrint;
