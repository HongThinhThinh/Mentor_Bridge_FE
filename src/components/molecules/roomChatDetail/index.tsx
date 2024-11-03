import { useEffect, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { Input } from "antd";
import "./index.scss";
import { IoIosArrowBack } from "react-icons/io";
import { useParams } from "react-router-dom";
import useRealtime from "../../../hooks/useRealtime";
import Message from "../../atoms/message/Message";
import { useStateValue } from "../../../context/stateProvider";
import api from "../../../config/api";
import { useCurrentUser } from "../../../utils/getcurrentUser";
import useChatService from "../../../services/useChatService";

function RoomChatDetail() {
  const { theme, setShowChatList, setActive, setRealtime } = useStateValue();
  const messagesContainerRef = useRef();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const user = useCurrentUser();
  const params = useParams();
  const idRef = useRef(params.id);
  const [typing, setTyping] = useState("");
  const { getChatDetail, sendChat, sendTyping } = useChatService();

  const fetch = async () => {
    setData([]);
    try {
      // const res = await api.get(`/chat/detail/${idRef.current}`);
      const response = await getChatDetail(idRef.current);

      // setData(res.data);
      setData(response);
    } catch (err) {
      console.log(err);
    }
  };

  useRealtime(async (body) => {
    if (body.body === "New message") {
      await fetch();
    } else {
      if (!body.body.includes(user?.name)) {
        setTyping(body.body);
        setTimeout(() => {
          setTyping("");
        }, 2000);
      }
    }
  });

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  useEffect(() => {
    idRef.current = params.id;
  }, [params.id]);

  useEffect(() => {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [data.messages]);

  useEffect(() => {
    fetch();
  }, [params.id]);

  const sendMessage = async () => {
    if (message.length !== 0) {
      // const res = await api.post(`/chat/send/${idRef.current}`, {
      //   message: message,
      // });

      const res = await sendChat(idRef.current, message);

      console.log(res, "tran");
      setMessage("");
      fetch();
      setRealtime(res);
      // fetchRoom();
    }
  };

  return (
    <div className="chat-detail">
      <div className="chat-detail__header">
        <div
          onClick={() => {
            setShowChatList(true);
            setActive(false);
          }}
          className="chat-detail__header__back"
        >
          <IoIosArrowBack fontSize={"30px"} />
        </div>

        <img
          src={
            data?.users?.filter((item) => item.id != user.id)[0].avt ||
            "data:image/jpeg;base64,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"
          }
          alt=""
        />
        <div className="header__info">
          <span>
            {data?.users?.filter((item) => item.id != user.id)[0].name}
          </span>
          <div className="status">
            <div className="dot"></div>
            <span>online</span>
          </div>
        </div>
      </div>
      <div className="chat-detail__messages" ref={messagesContainerRef}>
        {data?.messages?.map((item) => (
          <Message
            key={item.user?.id}
            text={item?.message}
            me={item.user?.id === user?.id ? "me" : ""}
            avt={item.user.avatar}
          />
        ))}
      </div>
      {typing}
      <div className="chat-detail__input">
        <Input
          onKeyDown={handleKeyDown}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onInput={async () => {
            // const response = await api.post(
            //   `/chat/typing/${idRef.current}/${user.name}`
            // );
            await sendTyping(idRef.current, user.name);
          }}
          placeholder="Type a message"
          autoSize
        />

        <div className="chat-detail__input__iconSend">
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            onChange={(e) => {
              setImg(e.target.files[0]);
              handleSend(e.target.files[0]);
            }}
          />
          {message.length === 0 || (
            <button onClick={sendMessage}>
              <IoSend color={theme ? "#fff" : "#000"} fontSize={"25px"} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomChatDetail;
