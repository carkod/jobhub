import React from "react";
import { render, screen } from "@testing-library/react";
import { About } from "./pages/About";

describe("About", () => {
  it("renders the about page content", () => {
    render(<About />);

    expect(
      screen.getByRole("heading", { name: /faqs about me/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/my name is carlos\./i)
    ).toBeInTheDocument();
  });
});
