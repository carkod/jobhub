"use client";

import { useEffect, useState } from "react";

const COOKIE_ACK_KEY = "carloswf_cookie_ack_v1";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      setIsVisible(window.localStorage.getItem(COOKIE_ACK_KEY) !== "true");
    } catch (error) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    try {
      window.localStorage.setItem(COOKIE_ACK_KEY, "true");
    } catch (error) {
      // The banner can still be dismissed if storage is unavailable.
    }

    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside className="ed-cookie-banner" aria-label="Cookie notice">
      <p>
        This site uses Google Analytics cookies. By continuing to browse, you
        accept this.
      </p>
      <button type="button" onClick={acceptCookies}>
        OK
      </button>
    </aside>
  );
}
