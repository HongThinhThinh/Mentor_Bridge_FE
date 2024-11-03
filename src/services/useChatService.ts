/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";

const useChatService = () => {
  const { callApi, loading, setIsLoading } = useApiService();

  const getChat = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await callApi("get", "/chat");
      return response?.data;
    } catch (e: any) {
      // toast.error(e?.response?.data || "Failed to get data");
    } finally {
      setIsLoading(false);
    }
  }, [callApi]);

  return {
    loading,
    getChat,
  };
};

export default useChatService;
