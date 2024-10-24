import { FC, useEffect, useState } from "react";
import "./ChatList.scss";
import { FaEdit } from "react-icons/fa";
import { useStateValue } from "../../../context/stateProvider";
import api from "../../config/axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useRealtime from "../../../hooks/useRealtime";
import RoomMessage from "../roomMessage"

interface ChatListProps {
  setFetchRoom?: () => void;
}
const RoomMessage: FC<ChatListProps> = ({ setFetchRoom }) => {
  const { theme, setShowSearchFriends, active, setActive, realtime } =
    useStateValue();
  const [data, setData] = useState([]);
  const [isSet, setIsSet] = useState(false);
  // const [user, setUser] = useState([]);
  const user = useSelector(selectUser);
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
