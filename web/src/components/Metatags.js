import React from "react";
import { Helmet } from "react-helmet";

export default function Metatags({ title, description, type="website", imageUrl=null }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{`Carlos Wu &mdash; ${title}`}</title>
      <meta
        name="description"
        content={`Carlos Wu &mdash; ${description}`}
      />
      <link rel="canonical" href={window.location.href} />
      {imageUrl && (
        <>
          <meta
            name="image"
            content={imageUrl}
          />
          <meta property="og:image" content={imageUrl} />
          <meta name="twitter:image" content={imageUrl} />
          <meta name="twitter:card" content={imageUrl} />
        </>
      )}
      <meta property="og:title" content={`Carlos Wu &mdash; ${title}`} />
      <meta property="og:description" content={`Carlos Wu &mdash; ${description}`} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={window.location.href} />

      <meta name="twitter:title" content={`Carlos Wu &mdash; ${title}`} />
      <meta name="twitter:description" content={`Carlos Wu &mdash; ${description}`} />
      <meta name="twitter:url" content={window.location.href} />
    </Helmet>
  );
}