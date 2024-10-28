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

function RoomChatDetail() {
  const { theme, setShowChatList, setActive, setRealtime } = useStateValue();
  const messagesContainerRef = useRef();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const user = useCurrentUser();
  const params = useParams();
  const idRef = useRef(params.id);
  const [typing, setTyping] = useState("");

  const fetch = async () => {
    setData([]);
    try {
      const res = await api.get(`/chat/detail/${idRef.current}`);
      console.log(res.data);
      // console.log(res.data.users);
      setData(res.data);
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

  console.log(data?.messages);

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  useEffect(() => {
    console.log(params.id);
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
      console.log("asdasd");
      const res = await api.post(`/chat/send/${idRef.current}`, {
        message: message,
      });
      setMessage("");
      fetch();
      setRealtime(res);
      // fetchRoom();
      console.log(res.data);
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
          src={data?.users?.filter((item) => item.id != user.id)[0].avt}
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
            const response = await api.post(
              `/chat/typing/${idRef.current}/${user.name}`
            );
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
