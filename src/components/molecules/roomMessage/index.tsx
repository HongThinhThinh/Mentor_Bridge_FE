import { FC } from "react";
import { useStateValue } from "../../../context/stateProvider";
import "./RoomMessage.scss";
import { useNavigate } from "react-router-dom";
// import { selectUser } from "../../../redux/features/userSlice";

interface RoomMessageProps {
  room?: string;
  active?: boolean;
  setActive?: (room?: string) => void;
  avt?: string;
  name?: string;
  lastMessage?: string;
  icon?: string;
}
// eslint-disable-next-line react/prop-types
const RoomMessage: FC<RoomMessageProps> = ({
  room = "",
  active = "",
  setActive = () => {},
  avt,
  name,
  lastMessage,
  icon,
}) => {
  const { setIdRoomChat, setShowSearchFriends, setShowChatList } =
    useStateValue();
  const navigate = useNavigate();
  //   const user = useSelector(selectUser);
  const user = {
    name: "test",
    role: "CREATOR",
  };

  const setShow = () => {
    setIdRoomChat(room);
    setShowSearchFriends(false);
    setActive(room);
    setShowChatList(false);
    user?.role === "CREATOR"
      ? navigate(`/creator-manage/room/${room}`)
      : navigate(`/room-messages/${room}`);
  };

  return (
    <div
      className={`item ${active === room ? "active" : ""}`}
      onClick={setShow}
    >
      <img src={avt || "abc"} alt="" />
      <div className="item__detail">
        <h4>{name}</h4>
        <span>
          {icon}
          {lastMessage}
        </span>
      </div>
    </div>
  );
};

export default RoomMessage;
