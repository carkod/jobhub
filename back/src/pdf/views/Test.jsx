import React, { Component } from "react";

class Test extends Component {
  render() {
    return (
      <html>
        <head>
          <link
            rel="stylesheet"
            type="text/css"
            href={`/pdf/assets/index.css`}
          />
        </head>
        <body>
          <div id="test" className="container">
            <main className="cvContent">
              <h1>{this.props.title}</h1>
            </main>
          </div>
        </body>
      </html>
    );
  }
}

export default Test;
