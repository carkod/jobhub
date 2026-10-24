import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import Nav from "./Nav";

describe("Nav", () => {
  it("renders the main section links and marks the current route", () => {
    render(
      <MemoryRouter
        initialEntries={["/ai-cv"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <Nav />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "HOME" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: "AI CV" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "COVER LETTERS" })).toHaveAttribute(
      "href",
      "/coverletters",
    );
  });
});
