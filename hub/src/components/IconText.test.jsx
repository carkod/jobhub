import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import IconText from "./IconText";

describe("IconText", () => {
  it("renders its text with the requested icon", () => {
    const { container } = render(
      <IconText text="Published" iconName="check circle" />,
    );

    expect(screen.getByText("Published")).toBeInTheDocument();
    expect(container.querySelector(".check.circle.icon")).toBeInTheDocument();
  });
});
