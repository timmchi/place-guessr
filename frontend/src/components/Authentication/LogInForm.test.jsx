import { render, screen, fireEvent } from "@testing-library/react";
import LogInForm from "./LogInForm";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";

vi.mock("react-google-recaptcha", () => ({
  default: ({ onChange }) => {
    return (
      <input
        data-testid="mock-recaptcha"
        onChange={() => onChange("mock-captcha-value")}
      />
    );
  },
}));

vi.mock("@material-tailwind/react", () => ({
  Card: ({ children }) => <div>{children}</div>,
  Input: ({ value, onChange, placeholder, type = "text" }) => (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  ),
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
  Typography: ({ children }) => <p>{children}</p>,
}));

describe("Log In Form", () => {
  const mockHandleLogin = vi.fn();

  beforeEach(() => {
    mockHandleLogin.mockClear();
  });

  const renderWithRouter = (ui) => {
    return render(<Router>{ui}</Router>);
  };

  test("Renders appropriate fields: email, pw, captcha, button", () => {
    renderWithRouter(<LogInForm handleLogin={mockHandleLogin} />);

    expect(screen.getByPlaceholderText("name@mail.com")).toBeDefined();
    expect(screen.getByPlaceholderText("********")).toBeDefined();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeDefined();
    expect(screen.getByTestId("mock-recaptcha")).toBeDefined();
  });

  test("Sign in button is disabled if captcha is not complete", () => {
    renderWithRouter(<LogInForm handleLogin={mockHandleLogin} />);

    const signInButton = screen.getByRole("button", { name: /sign in/i });

    expect(signInButton).toBeDisabled();
  });

  test("SIgn in button is enabled when captcha is completed", () => {
    renderWithRouter(<LogInForm handleLogin={mockHandleLogin} />);

    const signInButton = screen.getByRole("button", { name: /sign in/i });

    expect(signInButton).toBeDisabled();

    fireEvent.change(screen.getByTestId("mock-recaptcha"), {
      target: { value: "mock-captcha-value" },
    });

    expect(signInButton).not.toBeDisabled();
  });

  test("Handlelogin is called with proper data and proper amount of times when form is submitted", async () => {
    renderWithRouter(<LogInForm handleLogin={mockHandleLogin} />);

    const emailInput = screen.getByPlaceholderText("name@mail.com");
    const passwordInput = screen.getByPlaceholderText("********");
    const signInButton = screen.getByRole("button", { name: /sign in/i });

    const user = userEvent.setup();

    await user.type(emailInput, "bazinga@example.com");
    await user.type(passwordInput, "12345678");

    fireEvent.change(screen.getByTestId("mock-recaptcha"), {
      target: { value: "mock-captcha-value" },
    });

    await user.click(signInButton);

    expect(mockHandleLogin.mock.calls).toHaveLength(1);

    expect(mockHandleLogin.mock.calls[0][0].email).toBe("bazinga@example.com");
    expect(mockHandleLogin.mock.calls[0][0].password).toBe("12345678");
  });

  test("handlelogin is not called if captcha is not completed", async () => {
    renderWithRouter(<LogInForm handleLogin={mockHandleLogin} />);

    const emailInput = screen.getByPlaceholderText("name@mail.com");
    const passwordInput = screen.getByPlaceholderText("********");
    const signInButton = screen.getByRole("button", { name: /sign in/i });

    const user = userEvent.setup();

    await user.type(emailInput, "bazinga@example.com");
    await user.type(passwordInput, "12345678");

    await user.click(signInButton);

    expect(mockHandleLogin.mock.calls).toHaveLength(0);
  });

  // TODO - Validation and tests for it
});
