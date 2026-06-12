import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { SITE_URL } from "../config";

export default function Metatags({ title, description, type = "website", imageUrl = null, robots = "index, follow" }) {
  const router = useRouter();
  const location = router.pathname;
  const currentUrl = typeof window !== "undefined" ? window.location.href : `${SITE_URL}${location}`;
  const fullTitle = `Carlos Wu — ${title}`;
  const fullDesc = `Carlos Wu — ${description}`;

  useEffect(() => {
    document.title = fullTitle;
    const setMeta = (name, content, prop) => {
      let el = prop
        ? document.querySelector(`meta[property="${prop}"]`)
        : document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        if (prop) el.setAttribute("property", prop);
        else el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };
    setMeta("description", fullDesc);
    setMeta("robots", robots);
    setMeta(null, fullTitle, "og:title");
    setMeta(null, fullDesc, "og:description");
    setMeta(null, type, "og:type");
    setMeta(null, currentUrl, "og:url");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", fullDesc);
  }, [fullTitle, fullDesc, type, currentUrl, robots]);

  return null;
}
