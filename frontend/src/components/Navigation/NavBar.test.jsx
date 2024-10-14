import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "./NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { useLocation } from "react-router-dom";
import { expect, test } from "vitest";
import store from "../../reducers/store";
import { Provider } from "react-redux";

vi.mock("material-tailwind/react", () => ({
  Navbar: ({ children }) => <nav>{children}</nav>,
  Typography: ({ children }) => <div>{children}</div>,
  IconButton: ({ children, onClick }) => (
    <button onClick={onClick}>{children}</button>
  ),
  Collapse: ({ open, children }) => (open ? <div>{children}</div> : null),
}));

const mockHandleLogout = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe("NavBar Component", () => {
  const mockLocation = (pathname) => {
    useLocation.mockReturnValue({ pathname });
  };

  const renderWithRouterAndRedux = (ui) => {
    return render(
      <Provider store={store}>
        <Router>{ui}</Router>
      </Provider>
    );
  };

  test("should render NavBar when pathname does not match pathsNotToRender", () => {
    mockLocation("/not-matching-path");

    renderWithRouterAndRedux(<NavBar handleLogout={mockHandleLogout} />);

    expect(screen.getByText(/Place Guesser/i)).toBeDefined();

    const abouts = screen.getAllByText(/About/i);

    expect(abouts[0]).toBeDefined();
    expect(abouts[1]).toBeDefined();

    const logins = screen.getAllByText(/Log In/i);
    expect(logins[0]).toBeDefined();
    expect(logins[1]).toBeDefined();

    const signups = screen.getAllByText(/Sign Up/i);
    expect(signups[0]).toBeDefined();
    expect(signups[1]).toBeDefined();
  });

  test("should not render NavBar when pathname starts with '/rooms'", () => {
    mockLocation("/rooms");

    const { container } = renderWithRouterAndRedux(
      <NavBar handleLogout={mockHandleLogout} />
    );

    expect(container.firstChild).toBeNull();
  });

  test("should not render NavBar when pathname starts with '/lobby'", () => {
    mockLocation("/lobby");

    const { container } = renderWithRouterAndRedux(
      <NavBar handleLogout={mockHandleLogout} />
    );

    expect(container.firstChild).toBeNull();
  });

  // TODO - tests which will test for when the user is logged in/logged out
});
