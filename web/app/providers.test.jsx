import { fireEvent, render, screen } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import Providers from "./providers";
import { GENERATE_PDF } from "../src/actions/generate-pdf";

function StoreProbe() {
  const dispatch = useDispatch();
  const snackBar = useSelector((state) => state.snackBarReducer);

  return (
    <button
      type="button"
      onClick={() =>
        dispatch({
          type: GENERATE_PDF,
          message: "Generating PDF",
        })
      }
    >
      {snackBar.loading ? snackBar.message : "idle"}
    </button>
  );
}

describe("Providers", () => {
  it("provides the Redux store to app children", () => {
    render(
      <Providers>
        <StoreProbe />
      </Providers>,
    );

    expect(screen.getByRole("button", { name: "idle" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "idle" }));

    expect(
      screen.getByRole("button", { name: "Generating PDF" }),
    ).toBeInTheDocument();
  });
});
