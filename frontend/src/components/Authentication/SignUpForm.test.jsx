import { render, screen, fireEvent } from "@testing-library/react";
import SignUpForm from "./SignUpForm";
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

describe("Sign Up Form", () => {
  const mockHandleSignUp = vi.fn();

  beforeEach(() => {
    mockHandleSignUp.mockClear();
  });

  const renderWithRouter = (ui) => {
    return render(<Router>{ui}</Router>);
  };

  test("Renders appropriate fields: email, username, pw, repeatpw, captcha, button", () => {
    renderWithRouter(<SignUpForm handleUserCreation={mockHandleSignUp} />);

    expect(screen.getByPlaceholderText("name@mail.com")).toBeDefined();
    expect(screen.getByPlaceholderText("Username")).toBeDefined();
    const pws = screen.getAllByPlaceholderText("********");

    expect(pws[0]).toBeDefined();
    expect(pws[1]).toBeDefined();

    expect(screen.getByRole("button", { name: /sign up/i })).toBeDefined();
    expect(screen.getByTestId("mock-recaptcha")).toBeDefined();
  });

  test("Sign up button is disabled if captcha is not complete", () => {
    renderWithRouter(<SignUpForm handleUserCreation={mockHandleSignUp} />);

    const signUpButton = screen.getByRole("button", { name: /sign up/i });

    expect(signUpButton).toBeDisabled();
  });

  test("Sign up button is enabled when captcha is completed", () => {
    renderWithRouter(<SignUpForm handleUserCreation={mockHandleSignUp} />);

    const signUpButton = screen.getByRole("button", { name: /sign up/i });

    expect(signUpButton).toBeDisabled();

    fireEvent.change(screen.getByTestId("mock-recaptcha"), {
      target: { value: "mock-captcha-value" },
    });

    expect(signUpButton).not.toBeDisabled();
  });

  test("handleUserCreation is called with proper data and proper amount of times when form is submitted", async () => {
    renderWithRouter(<SignUpForm handleUserCreation={mockHandleSignUp} />);

    const emailInput = screen.getByPlaceholderText("name@mail.com");
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInputs = screen.getAllByPlaceholderText("********");
    const signUpButton = screen.getByRole("button", { name: /sign up/i });

    const user = userEvent.setup();

    await user.type(emailInput, "bazinga@example.com");
    await user.type(usernameInput, "Bazinga");
    await user.type(passwordInputs[0], "12345678");
    await user.type(passwordInputs[1], "12345678");

    fireEvent.change(screen.getByTestId("mock-recaptcha"), {
      target: { value: "mock-captcha-value" },
    });

    await user.click(signUpButton);

    expect(mockHandleSignUp.mock.calls).toHaveLength(1);

    expect(mockHandleSignUp.mock.calls[0][0].email).toBe("bazinga@example.com");
    expect(mockHandleSignUp.mock.calls[0][0].username).toBe("Bazinga");
    expect(mockHandleSignUp.mock.calls[0][0].password).toBe("12345678");
    expect(mockHandleSignUp.mock.calls[0][0].repeatPassword).toBe("12345678");
  });

  test("handleUserCreation is not called if captcha is not completed", async () => {
    renderWithRouter(<SignUpForm handleUserCreation={mockHandleSignUp} />);

    const emailInput = screen.getByPlaceholderText("name@mail.com");
    const usernameInput = screen.getByPlaceholderText("Username");
    const passwordInputs = screen.getAllByPlaceholderText("********");
    const signUpButton = screen.getByRole("button", { name: /sign up/i });

    const user = userEvent.setup();

    await user.type(emailInput, "bazinga@example.com");
    await user.type(usernameInput, "Bazinga");
    await user.type(passwordInputs[0], "12345678");
    await user.type(passwordInputs[1], "12345678");

    await user.click(signUpButton);

    expect(mockHandleSignUp.mock.calls).toHaveLength(0);
  });

  // TODO - Validation and tests for it, maybe test for 2 pws not being the same
});
