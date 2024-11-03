import { BellOutlined } from "@ant-design/icons";
import { FC, useEffect, useState } from "react";
import { Notification } from "../../atoms/notification/Notification";
import Account from "../../molecules/account/Account";
import { useCurrentUser } from "../../../utils/getcurrentUser";
import useNotificationService from "../../../services/useNotificationService";
import { formatDateAndHour } from "../../../utils/dateFormat";

interface HeaderProps {
  title?: string;
}

const Header: FC<HeaderProps> = ({ title }) => {
  const { getNotifications, updateNotifications } = useNotificationService();
  const [data, setData] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications();

      setData(response);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleReadNoti = async () => {
    await updateNotifications();
    await fetchNotifications();
  };

  const user = useCurrentUser();
  const role =
    user?.role === "STUDENT" ? "Xin Chào Sinh Viên!" : "Xin Chào Giảng Viên!";

  // Format items for Dropdown menu
  const notificationItems = data
    ?.sort((a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)) // Sort by date in descending order
    .map((item) => ({
      key: item.id,
      label: (
        <div className="p-2">
          <strong>{item?.title}</strong>
          <p>{item?.message}</p>
          <span className="text-xs text-gray-500">
            {formatDateAndHour(item?.createdAt)}
          </span>
        </div>
      ),
    }));

  return (
    <div className="flex justify-between pt-7">
      <div>
        <h1 className="text-2xl-bold pt-3">{title}</h1>
      </div>
      <div className="flex gap-5" onClick={() => handleReadNoti()}>
        <Notification
          count={
            Array.isArray(data)
              ? data?.filter((item) => !item?.isRead).length
              : 0
          }
          items={notificationItems}
          placement="bottomRight"
          styleClass="cursor-pointer text-shade-800"
        >
          <div className="h-14 w-14 flex justify-center items-center rounded-full">
            <BellOutlined style={{ fontSize: 26 }} />
          </div>
        </Notification>
        <Account
          src={user?.avatar}
          subTitle={role}
          title={user?.fullName || user?.email}
        />
      </div>
    </div>
  );
};

export default Header;
