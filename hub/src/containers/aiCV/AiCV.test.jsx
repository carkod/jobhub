import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AiCV } from "./AiCV";

const makeProps = (overrides = {}) => ({
  cvs: [{ _id: "cv-1", name: "Baseline CV" }],
  fetchCVs: vi.fn(),
  generateAiCv: vi.fn().mockResolvedValue({
    status: "in-progress",
    message: "Generation started",
    jobId: "job-1",
  }),
  fetchAiCvGeneration: vi.fn(),
  notify: vi.fn(),
  ...overrides,
});

describe("AiCV form", () => {
  it("shows required-field errors and does not submit invalid data", () => {
    const props = makeProps();
    render(<AiCV {...props} />);

    fireEvent.click(
      screen.getByRole("button", { name: "Generate tailored CV" }),
    );

    expect(
      screen.getAllByText("Job title is required.").length,
    ).toBeGreaterThan(1);
    expect(screen.getAllByText("Select a work mode.").length).toBeGreaterThan(
      0,
    );
    expect(
      screen.getAllByText("Choose an existing baseline CV.").length,
    ).toBeGreaterThan(0);
    expect(props.generateAiCv).not.toHaveBeenCalled();
  });

  it("submits after all required fields are valid", async () => {
    const user = userEvent.setup();
    const props = makeProps();
    render(<AiCV {...props} />);

    await user.type(
      screen.getByPlaceholderText("Full Stack Engineer"),
      "Engineer",
    );
    await user.type(screen.getByPlaceholderText("Station"), "Station");
    await user.type(screen.getByPlaceholderText("Full-time"), "Full-time");
    await user.type(
      screen.getByPlaceholderText("Paste the complete job description here…"),
      "Build useful products",
    );

    await user.click(screen.getByText("Select work mode"));
    await user.click(screen.getByRole("option", { name: "Remote" }));
    await user.click(screen.getByText("Choose an existing CV"));
    await user.click(screen.getByRole("option", { name: "Baseline CV" }));

    await user.click(
      screen.getByRole("button", { name: "Generate tailored CV" }),
    );

    await waitFor(() => expect(props.generateAiCv).toHaveBeenCalledOnce());
    expect(props.generateAiCv).toHaveBeenCalledWith(
      expect.objectContaining({
        jobTitle: "Engineer",
        business: "Station",
        workMode: "Remote",
        contractType: "Full-time",
        description: "Build useful products",
        baselineCvId: "cv-1",
      }),
    );
  });
});
