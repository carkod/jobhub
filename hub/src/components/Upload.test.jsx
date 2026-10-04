import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Upload from "./Upload";

describe("Upload", () => {
  it("shows the upload action only when active and calls its handler", () => {
    const handleUpload = vi.fn();
    const { rerender } = render(
      <Upload active={false} handleUpload={handleUpload} />,
    );

    expect(screen.queryByRole("button")).not.toBeInTheDocument();

    rerender(<Upload active handleUpload={handleUpload} />);
    fireEvent.click(screen.getByRole("button"));

    expect(handleUpload).toHaveBeenCalledOnce();
  });

  it("forwards selected files through the change handler", () => {
    const handleChange = vi.fn();
    const { container } = render(<Upload handleChange={handleChange} />);
    const file = new File(["resume"], "resume.pdf", {
      type: "application/pdf",
    });
    const input = container.querySelector('input[type="file"]');

    fireEvent.change(input, { target: { files: [file] } });

    expect(handleChange).toHaveBeenCalledOnce();
    expect(handleChange.mock.calls[0][0].target.files[0]).toBe(file);
  });
});
