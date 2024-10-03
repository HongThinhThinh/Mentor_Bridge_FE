import { Badge } from "antd";
import { FontSize, FontWeight } from "../../../constants/typography";

export interface NotificationProps {
  /** What tailwind class want to use for customizing Badge? */
  styleClass?: string;
  /** The weight of the font used in the Badge text. */
  fontWeight?: FontWeight;
  /** The size of the font used in the Badge text. */
  fontSize?: FontSize;
  /** Badge children'ss contents */
  children?: React.ReactNode;
  /** Badge contents */
  count?: React.ReactNode;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Notification = ({
  fontSize = "base",
  fontWeight = "medium",
  styleClass,
  children,
  count,
  ...props
}: NotificationProps) => {
  return (
    <Badge
      className={[`text-${fontSize}-${fontWeight}`, styleClass].join(" ")}
      count={count}
      {...props}
    >
      {children}
    </Badge>
  );
};
