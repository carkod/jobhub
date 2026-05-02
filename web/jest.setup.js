require("@testing-library/jest-dom");

jest.mock("next/router", () => ({
  useRouter() {
    return {
      asPath: "/about",
    };
  },
}));
