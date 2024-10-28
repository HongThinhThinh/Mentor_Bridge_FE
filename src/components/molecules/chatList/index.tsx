import { FC, useEffect, useState } from "react";
import "./index.scss";
import { useStateValue } from "../../../context/stateProvider";

import { useParams } from "react-router-dom";
import useRealtime from "../../../hooks/useRealtime";
import RoomMessage from "../roomMessage";
import api from "../../../config/api";
import { useCurrentUser } from "../../../utils/getcurrentUser";

interface ChatListProps {
  setFetchRoom?: () => void;
}
const ChatList: FC<ChatListProps> = ({ setFetchRoom }) => {
  const { theme, setShowSearchFriends, active, setActive, realtime } =
    useStateValue();
  const [data, setData] = useState([]);
  const [isSet, setIsSet] = useState(false);
  // const [user, setUser] = useState([]);
  const user = useCurrentUser();
  const { id } = useParams();

  useRealtime(async (body) => {
    if (body.body === "New message") {
      await fetch();
    }
  });
  const fetch = async () => {
    try {
      const res = await api.get("/chat");
      console.log(res.data);
      // console.log(res.data.users);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch();
  }, [realtime]);

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <div className="chat-list">
        <div className="chat-list__information">
          <div className="chat-list__information__left">
            <img src={user?.avt} alt="" />
            <span>{user?.name}</span>
          </div>
          <div
            className="chat-list__information__right"
            onClick={() => setShowSearchFriends(true)}
          >
            {/* <FaEdit fontSize={"20px"} color={theme ? "#fff" : "#000"} /> */}
          </div>
        </div>
        <h3>Message</h3>
        <div className="chat-list__items">
          {data.map((room) => (
            <RoomMessage
              key={room?.roomID}
              room={room?.roomID}
              active={active}
              setActive={setActive}
              avt={room.users.filter((item) => item.id != user.id)[0].avt}
              name={room.users.filter((item) => item.id != user.id)[0].name}
              lastMessage={room.lastMessage}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatList;
