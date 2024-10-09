import { FontSize, FontWeight } from "../../../constants/typography";

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  variant?: "frosted-glass" | "outlined" | "default";
  /** What tailwind class want to use for customizing button? */
  styleClass?: string;
  /** What is color of the button? */
  background?: string;
  /** How large should the button be? */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  /** The weight of the font used in the button text. */
  fontWeight?: FontWeight;
  /** The size of the font used in the button text. */
  fontSize?: FontSize;
  /** Button type (button, submit, reset) */
  type?: "button" | "submit" | "reset"; // Updated type definition
  /** Button contents */
  children: React.ReactNode;
  /** Optional click handler */
  onClick?: () => void;
  /** The type of the button (button, submit, reset) */
  type?: "button" | "submit" | "reset";
}

/** Primary UI component for user interaction */
export const Button = ({
  variant = "default",
  fontSize = "base",
  fontWeight = "medium",
  size = "md",
  styleClass,
  background,
  children,
  type = "button", // Default type is set to "button"
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={[
        `text-${fontSize}-${fontWeight}`,
        size,
        variant,
        variant === "default" ? background : "",
        styleClass,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};
