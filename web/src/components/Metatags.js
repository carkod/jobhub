import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { SITE_URL } from "../config";

export default function Metatags({ title, description, type="website", imageUrl=null }) {
  const router = useRouter();
  const currentUrl = typeof window !== 'undefined' ? window.location.href : `${SITE_URL}${router.asPath}`;
  
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{`Carlos Wu — ${title}`}</title>
      <meta
        name="description"
        content={`Carlos Wu — ${description}`}
      />
      <link rel="canonical" href={currentUrl} />
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
      <meta property="og:title" content={`Carlos Wu — ${title}`} />
      <meta property="og:description" content={`Carlos Wu — ${description}`} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />

      <meta name="twitter:title" content={`Carlos Wu — ${title}`} />
      <meta name="twitter:description" content={`Carlos Wu — ${description}`} />
      <meta name="twitter:url" content={currentUrl} />
    </Head>
  );
}