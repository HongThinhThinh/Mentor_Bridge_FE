import { BellOutlined } from "@ant-design/icons";
import { FC } from "react";
import { Notification } from "../../atoms/notification/Notification";
import { Button } from "../../atoms/button/Button";
import Account from "../../molecules/account/Account";

interface HeaderProps {
  title?: React.Key;
  items?: [];
}

const Header: FC<HeaderProps> = ({ title }) => {
  return (
    <div className="flex justify-between pt-7">
      <div className="">
        <h1 className="text-2xl-bold pt-3">{title?.toString()}</h1>
      </div>
      <div className="flex gap-5">
        <Notification count={5}>
          <Button styleClass="bg-shade-400 text-shade-800 h-14 w-14 flex justify-center items-center rounded-full">
            <BellOutlined style={{ fontSize: 26 }} />
          </Button>
        </Notification>
        <Account subTitle="Xin Chào Giảng Viên!" title="Trương Gia Bình" />
      </div>
    </div>
  );
};

export default Header;