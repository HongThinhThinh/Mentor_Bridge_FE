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
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  variant = "default",
  fontSize = "base",
  fontWeight = "medium",
  size = "md",
  styleClass = "text-white",
  background = "bg-shade-900",
  label,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={[
        `text-${fontSize}-${fontWeight}`,
        size,
        variant,
        variant == "default" ? background : "",
        styleClass,
      ].join(" ")}
      {...props}
    >
      {label}
    </button>
  );
};
