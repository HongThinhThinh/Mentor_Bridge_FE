import { useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

function useRealtime(callback) {

  const WS_URL = "http://137.184.153.35:8080/websocket";
  const accountID = localStorage.getItem("accountId");

  useEffect(() => {
    // Initialize socket and stomp client
    const socket = new SockJS(WS_URL);
    const stomp = Stomp.over(socket);

    // Function to handle connection
    const onConnected = () => {
      console.log("WebSocket connected");

      // Subscribe to chat
      stomp.subscribe(`/topic/chat/${accountID}`, (message) => {
        handleMessage(message);
      });

      // Subscribe to interaction
      stomp.subscribe(`/topic/interaction`, (message) => {
        handleMessage(message);
      });

      // Subscribe to notification
      stomp.subscribe(`/topic/notification/${accountID}`, (message) => {
        handleMessage(message);
      });
    };

    // Function to handle incoming messages
    const handleMessage = (message) => {
      if (message.body) {
        console.log("Received message:", message.body);
        try {
          const parsedMessage = JSON.parse(message.body);  // Parse message body if JSON
          callback && callback(parsedMessage);
        } catch (error) {
          console.error("Failed to parse message:", message.body);
          callback && callback(message.body);  // Fallback to raw message body if not JSON
        }
      }
    };

    // Handle connection errors
    const onError = (error) => {
      console.error("WebSocket connection error:", error);
    };

    // Connect to STOMP over WebSocket
    stomp.connect({}, onConnected, onError);

    // Cleanup function to close WebSocket connection when the component unmounts
    return () => {
      if (stomp && stomp.connected) {
        stomp.disconnect(() => {
          console.log("WebSocket disconnected");
        });
      }
    };
  }, [accountID, callback, WS_URL]);

  return null;  // No UI needed for the hook
}

export default useRealtime;
