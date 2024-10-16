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
  type?: "button" | "submit" | "reset";
  /** Button contents */
  children: React.ReactNode;
  /** Optional click handler */
  onClick?: () => void;
  /** The type of the button (button, submit, reset) */
  isDisabled?: boolean;
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
  type = "button",
  isDisabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={[
        `text-${fontSize} font-${fontWeight}`,
        size,
        variant,
        variant === "default" ? background : "",
        styleClass,
        isDisabled
          ? "bg-gray-400 text-gray-600 cursor-not-allowed pointer-events-none"
          : "",
        isDisabled ? "cursor-not-allowed" : "cursor-pointer",
        isDisabled && "opacity-65",
      ].join(" ")}
      type={type}
      disabled={isDisabled}
      {...props}
    >
      {children}
    </button>
  );
};
