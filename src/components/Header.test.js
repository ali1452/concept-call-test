import { render, screen } from "@testing-library/react";
import Dashboard from "./Header.js";

test("renders learn react link", () => {
  render(<Dashboard />);
  const linkElement = screen.getByTestId("header");
  expect(linkElement).toBeInTheDocument();
});
