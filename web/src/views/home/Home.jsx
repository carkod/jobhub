"use client";

import React, { Component } from "react";
import Link from "next/link";
import { produce } from "immer";
import Metatags from "../../components/Metatags";
import { fetchCVNav } from "../../actions/cv";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { cvs: [] };
  }

  componentDidMount = async () => {
    try {
      const navigationCvs = await fetchCVNav();
      this.setState(
        produce((draft) => {
          draft.cvs = navigationCvs;
        }),
      );
    } catch (e) {
      console.warn("Could not load CV navigation:", e.message);
    }
  };

  render() {
    const { cvs } = this.state;
    const firstCv = cvs && cvs.length > 0 ? cvs[0] : null;
    const cvHref = firstCv
      ? `/cv/${firstCv.cats?.locale || "en-GB"}/${firstCv.slug || firstCv._id}`
      : "/cv";

    return (
      <div className="ed-home">
        <Metatags
          title="Professional Profile"
          description="Software engineer, entrepreneur — building products that scale"
        />

        <div className="ed-hero">
          <div className="ed-hero__left">
            <h1 className="ed-hero__title">
              Software
              <br />
              <em>Engineer</em> &amp;
              <br />
              <span className="ed-hero__title--sub">Entrepreneur</span>
            </h1>

            <p className="ed-hero__bio">
              London-based software engineer and entrepreneur with over a decade
              of experience building products that scale. Founder of{" "}
              <a href="https://binbot.in" target="_blank" rel="noreferrer">
                Binbot
              </a>
              , a cryptocurrency trading platform. Specialising in React,
              Node.js, and cloud infrastructure — I build products and lead
              teams.
            </p>

            <ul className="ed-hero__links">
              <li>
                <a href="mailto:disendaweb@gmail.com">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/carkod/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://stackoverflow.com/users/2454059/carkod"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="m4 17 1-5" />
                    <path d="M6.5 17h11" />
                    <path d="M6.5 21h11" />
                    <path d="M11 21V6.5" />
                    <path d="m7 11 5-7 5 7" />
                  </svg>
                  Stack Overflow
                </a>
              </li>
              <li>
                <a href="https://binbot.in" target="_blank" rel="noreferrer">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                  Binbot
                </a>
              </li>
            </ul>

            <Link href={cvHref} className="ed-cta">
              View my latest CV
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="ed-hero__photo-col">
            <div className="ed-hero__glow" />
            <div className="ed-hero__photo-frame">
              <img src="/carlos.jpg" alt="Carlos Wu" />
            </div>
            <span className="ed-hero__location">Hyde Park, London, UK</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
