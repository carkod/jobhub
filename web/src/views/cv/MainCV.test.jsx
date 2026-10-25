import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MainCV from "./MainCV";

test("renders the server supplied CV and reports PDF generation failures", async () => {
  global.fetch = jest.fn(async () => ({
    ok: false,
    statusText: "Unavailable",
  }));

  render(
    <MainCV
      match={{ params: { id: "public-cv", language: "en-GB" } }}
      initialCv={{ name: "Platform CV", summary: "Public summary" }}
    />,
  );

  expect(screen.getByText("Public summary")).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Download PDF" }));

  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Could not generate the PDF",
    ),
  );
  expect(global.fetch).toHaveBeenCalledWith(
    "/pdf/generate/curriculum-vitae/public-cv/en-GB",
    { method: "GET", headers: { Accept: "application/pdf" } },
  );
});
