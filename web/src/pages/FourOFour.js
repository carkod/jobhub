import React from 'react';
import { Helmet } from "react-helmet";
import Metatags from "../components/Metatags";

const FourOFour = props => {
  
    return (
      <div id="fourofour" className="container">
      <Metatags title={"404 Page not found"} description={"The page you requested was not found. If this is a mistake please report it to the site admin."}/>
        
        <main>
            <h1>This is not your typical 404 page. Please stop hitting wrong pages!</h1>
            <h2>Just kidding, if this is a mistake please report it to admin. Thanks!</h2>
        </main>
        
      </div>
    );
}




export default FourOFour;