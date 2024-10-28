import { useStateValue } from "../../context/stateProvider";
import { useMediaQuery } from "react-responsive";
import { Outlet, useParams } from "react-router-dom";
import ChatList from "../../components/molecules/chatList";
import FormSearchFriends from "../../components/molecules/formSearchFriends";
import "./index.scss";
function RoomChat() {
  const { theme, showSearchFriends, showChatList } = useStateValue();
  const isQuery = useMediaQuery({ maxWidth: 800 });
  const { param } = useParams();

  return (
    <div
      className="roomChat"
      style={{
        backgroundColor: theme ? "#202020" : "#fff",
        color: theme ? "#fff" : "#202020",
      }}
    >
      {isQuery ? (
        <>
          {showChatList && <ChatList />}
          {!showChatList && <Outlet />}
          {showSearchFriends && <FormSearchFriends />}
        </>
      ) : (
        <>
          <ChatList />
          <Outlet />
          {showSearchFriends && <FormSearchFriends />}
        </>
      )}
    </div>
  );
}

export default RoomChat;
