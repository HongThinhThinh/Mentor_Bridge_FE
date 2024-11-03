/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";

const useChatService = () => {
  const { callApi, loading, setIsLoading } = useApiService();

  const getChat = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await callApi("get", "/chat");
      return response;
    } catch (e: any) {
      // toast.error(e?.response?.data || "Failed to get data");
    } finally {
      setIsLoading(false);
    }
  }, [callApi]);

  const getChatDetail = useCallback(
    async (id: any) => {
      try {
        setIsLoading(true);
        const response = await callApi("get", `/chat/detail/${id}`);
        return response;
      } catch (e: any) {
        // toast.error(e?.response?.data || "Failed to get data");
      } finally {
        setIsLoading(false);
      }
    },
    [callApi]
  );
  const sendChat = useCallback(
    async (id: any, message: string) => {
      try {
        setIsLoading(true);
        const response = await callApi("post", `/chat/send/${id}`, {
          message: message,
        });
        return response;
      } catch (e: any) {
        console.error("Failed to send message:", e);
      } finally {
        setIsLoading(false);
      }
    },
    [callApi]
  );

  return {
    loading,
    getChat,
    getChatDetail,
    sendChat,
  };
};

export default useChatService;
