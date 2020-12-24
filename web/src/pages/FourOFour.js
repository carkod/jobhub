import React from 'react';
import { Helmet } from "react-helmet";

const FourOFour = props => {
  
    return (
      <div id="fourofour" className="container">
        <Helmet>
          <title>{`Carlos Wu - About`}</title>
          <meta charSet="utf-8" />
          <meta name="description" content={`Carlos Wu - Professional Profile | 404 error`}/>
          <link rel="canonical" href={process.env.REACT_APP_HOME_URL} />
        </Helmet>
        
        <main>
            <h1>This is not your typical 404 page. Please stop hitting wrong pages!</h1>
            <h2>Just kidding, if this is a mistake please report it to admin. Thanks!</h2>
        </main>
        
      </div>
    );
}




export default FourOFour;