import { useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

function useRealtime(callback) {
  const WS_SERVER = import.meta.env.VITE_API_URL_SERVER_WEBSOCKET;
  const WS_LOCAL = import.meta.env.VITE_API_URL_LOCAL_WEBSOCKET;
  const socket = new SockJS(WS_LOCAL);
  const stomp = Stomp.over(socket);
  const accountID = localStorage.getItem("userId");
  useEffect(() => {
    const onConnected = () => {
      console.log("WebSocket connected");
      stomp.subscribe(`/topic/chat/${accountID}`, (message) => {
        console.log(message);
        callback && callback(message);
      });

      stomp.subscribe(`/topic/interaction`, (message) => {
        console.log(message);
        callback && callback(message);
      });

      stomp.subscribe(`/topic/notification/${accountID}`, (message) => {
        console.log(message);
        callback && callback(message);
      });
    };
    stomp.connect({}, onConnected, null);
  }, []);
}

export default useRealtime;
