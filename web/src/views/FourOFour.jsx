import React from "react";
import Link from "next/link";

const FourOFour = () => (
  <div id="fourofour">
    <div>
      <h1>404</h1>
      <p>This page doesn't exist.</p>
      <p style={{ marginTop: "1.5rem" }}>
        <Link href="/">← Back home</Link>
      </p>
    </div>
  </div>
);

export default FourOFour;
