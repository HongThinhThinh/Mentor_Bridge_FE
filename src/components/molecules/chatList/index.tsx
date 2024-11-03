import { FC, useEffect, useState } from "react";
import "./index.scss";
import { useStateValue } from "../../../context/stateProvider";
import { useParams } from "react-router-dom";
import useRealtime from "../../../hooks/useRealtime";
import RoomMessage from "../roomMessage";
import { useCurrentUser } from "../../../utils/getcurrentUser";
import useChatService from "../../../services/useChatService";

interface ChatListProps {
  setFetchRoom?: () => void;
}
const ChatList: FC<ChatListProps> = ({ setFetchRoom }) => {
  const { theme, setShowSearchFriends, active, setActive, realtime } =
    useStateValue();
  const [data, setData] = useState([]);
  const user = useCurrentUser();
  const { id } = useParams();
  const { getChat } = useChatService();

  useRealtime(async (body) => {
    if (body.body === "New message") {
      await fetch();
    }
  });
  const fetch = async () => {
    try {
      const res = await getChat();
      setData(res);
    } catch (err) {
      console.log(err);
    }
  };

  const getNameMessage = (data) => {
    if (data?.users && data?.users?.length == 2) {
      const response = data?.users.filter((item) => item.id != user?.id)[0];
      return response?.fullName || response?.email;
    }
  };
  const getImg = (data) => {
    if (data?.users && data?.users.length == 2) {
      const response = data?.users.filter((item) => item.id != user?.id)[0];
      return response?.avartar;
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
            <img src={user?.avatar} alt="" />
            <span>{user?.fullName || user?.email}</span>
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
          {data?.map((room) => (
            <RoomMessage
              key={room?.roomID}
              room={room?.roomID}
              active={active}
              setActive={setActive}
              avt={getImg(room)}
              name={getNameMessage(room) || room?.name}
              lastMessage={room?.lastMessage}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ChatList;
