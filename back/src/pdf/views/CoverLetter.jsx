import React, { Component } from 'react';

class CoverLetter extends Component {
  
  render() {
    const cv = this.props;
    return (
      <html>
      <head>
         <link rel="stylesheet" href="/pdf/assets/index.css" />
      </head>
      <body>
      <div id="coverletter" className="container">
        <main className="clContent">
            <h1>Cover Letter - <small>{cv.name}</small></h1>
            <section id="summary">
              <div dangerouslySetInnerHTML={{__html: cv.desc}}></div>
            </section>
            
        </main>
      </div>
      </body>
      </html>
    )
  }
}

export default CoverLetter;
