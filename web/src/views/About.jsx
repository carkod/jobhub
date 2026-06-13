"use client";

import React, { useState } from "react";
import Metatags from "../components/Metatags";

export function AboutMe() {
  return <About initialTab="me" />;
}

export function AboutSite() {
  return <About initialTab="site" />;
}

export function About({ initialTab = "me" }) {
  const [tab, setTab] = useState(initialTab);

  return (
    <div className="ed-faqs">
      <Metatags
        title="FAQs"
        description="About Carlos Wu — developer, background, and this site."
      />

      <div className="ed-faqs__tabs">
        <button
          className={`ed-faqs__tab${tab === "me" ? " active" : ""}`}
          onClick={() => setTab("me")}
        >
          About Me
        </button>
        <button
          className={`ed-faqs__tab${tab === "site" ? " active" : ""}`}
          onClick={() => setTab("site")}
        >
          About This Site
        </button>
      </div>

      {tab === "me" && (
        <div className="ed-faqs__panel">
          <div style={{ position: "relative" }}>
            <div className="ed-faqs__quote-bg">"</div>
            <div className="ed-faqs__about-grid">
              <div className="ed-faqs__photo">
                <img src="/carlos.jpg" alt="Carlos Wu" />
              </div>
              <div className="ed-faqs__qa-list">
                <div className="ed-faqs__qa">
                  <h3>What is your name?</h3>
                  <p>
                    My name is Carlos Wu Fei. In the UK I go by Carlos Wu. I'm a
                    Spanish citizen with two surnames: Wu (first) and Fei
                    (second).
                  </p>
                </div>
                <div className="ed-faqs__qa">
                  <h3>What is your academic background?</h3>
                  <p>
                    I graduated in Business Management from Universidad Carlos
                    III in Madrid. I then completed a Master's in Management
                    Consulting, which gave me a solid foundation in business
                    analysis, project proposals, and financial modelling.
                  </p>
                </div>
                <div className="ed-faqs__qa">
                  <h3>What do you do?</h3>
                  <p>
                    I'm a software engineer and entrepreneur based in London. I
                    build products that scale — from full-stack web apps to
                    distributed systems. Founder of Binbot, a cryptocurrency
                    trading platform.
                  </p>
                </div>
                <div className="ed-faqs__qa">
                  <h3>How long have you been coding?</h3>
                  <p>
                    Since 2013 — over a decade professionally, building
                    everything from marketing sites to enterprise-grade web
                    applications and distributed systems.
                  </p>
                </div>
                <div className="ed-faqs__qa">
                  <h3>What are your professional goals?</h3>
                  <p>
                    I love web technologies and am drawn to roles that bridge
                    development and business: I understand development better
                    than most business analysts, and business better than most
                    developers. I thrive as the coordination link between the
                    two.
                  </p>
                </div>
                <div className="ed-faqs__qa">
                  <h3>Will you consider relocating?</h3>
                  <p>
                    Yes — I go wherever professional opportunities appear,
                    provided the work is valued and the compensation meets local
                    market standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === "site" && (
        <div className="ed-faqs__panel">
          <div className="ed-faqs__site-body">
            <p>
              This site has three applications. The <strong>Back</strong>{" "}
              application is a Node.js + Express server connected to a MongoDB
              database. The <strong>Hub</strong> is a private admin CMS for
              managing content. The <strong>Web</strong> application is what
              you're seeing now — a Next.js frontend that pulls data from the
              API.
            </p>
            <h3>Tech Stack</h3>
            <div className="ed-faqs__stack">
              {[
                "React",
                "Next.js",
                "Redux",
                "Node.js",
                "Express",
                "MongoDB",
                "Sass",
              ].map((t, i, arr) => (
                <React.Fragment key={t}>
                  <span>{t}</span>
                  {i < arr.length - 1 && <span className="dot">•</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
