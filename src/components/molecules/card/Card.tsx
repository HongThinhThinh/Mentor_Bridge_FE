import { Card } from "antd";
import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface CustomizedCardProps {
  /** What tailwind class want to use for customizing card? */
  styleClass?: string;
  /** Card's customized background */
  background?: string;
  /** Rendering  */
  loading?: boolean;
  /** Card contents */
  children?: React.ReactNode;
}

const CustomizedCard: FC<CustomizedCardProps> = ({
  styleClass,
  background,
  loading,
  children,
  ...props
}) => {
  return loading ? (
    <Skeleton height="100%" width="100%" />
  ) : (
    <Card
      className={[`w-full h-full`, styleClass].join(" ")}
      style={{ background: background }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default CustomizedCard;