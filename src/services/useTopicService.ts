/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback } from "react";
import useApiService from "../hooks/useApi";
import { toast } from "react-toastify";
import { TEAM_API, TOPIC_API } from "../constants/endpoints";
import api from "../config/api";

const useTopicService = () => {
  const { callApi, loading, setIsLoading } = useApiService();

  const createTopic = useCallback(
    async (
      topicData: { name: string; description: string; teamId: string | null },
      file: File
    ) => {
      try {
        setIsLoading(true);
        const formData = new FormData();
        const jsonBlob = new Blob([JSON.stringify(topicData)], {
          type: "application/json",
        });
        formData.append("topic", jsonBlob);

        formData.append("file", file);

        const response = await api.post(TOPIC_API.TOPIC, formData);

        toast.success("Topic created successfully!");
        return response?.data;
      } catch (e: any) {
        console.error("Create Topic Error: ", e);
        toast.error(e?.response?.data?.message || "Failed to create topic");
      } finally {
        setIsLoading(false);
      }
    },
    [callApi]
  );

  const acceptTopic = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "patch",
          `${TOPIC_API.TOPIC_ACCEPTED}/${id}`
        );

        toast.success("Topic accepted successfully!");
        return response?.data;
      } catch (e: any) {
        toast.error(e?.response?.data || "Failed to accept topic");
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );

  // Reject Topic (PATCH /api/topic/rejected/{id})
  const rejectTopic = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "patch",
          `${TOPIC_API.TOPIC_REJECT}/${id}`
        );

        toast.success("Topic rejected successfully!");
        return response?.data;
      } catch (e: any) {
        toast.error(e?.response?.data || "Failed to reject topic");
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );
  const getTopics = useCallback(
    async (queryParams: {
      name?: string;
      status?: string;
      page?: number;
      size?: number;
      sortBy?: string;
      sortDirection?: string;
      semesterCode?: string;
    }) => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams(queryParams as any).toString();
        const response = await callApi("get", `${TOPIC_API.TOPIC}?${params}`);
        return response?.data;
      } catch (e: any) {
        toast.error(e?.response?.data || "Failed to fetch topics");
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading, acceptTopic, rejectTopic]
  );

  const bookTopic = useCallback(
    async (id: string) => {
      try {
        setIsLoading(true);
        const response = await callApi(
          "put",
          `${TEAM_API.TEAM}/${TOPIC_API.TOPIC}/${id}`
        );

        toast.success("Choose topic successfully!");
        return response?.data;
      } catch (e: any) {
        toast.error(e?.response?.data || "Failed to choose topic");
      } finally {
        setIsLoading(false);
      }
    },
    [callApi, setIsLoading]
  );
  return {
    createTopic,
    getTopics,
    loading,
    acceptTopic,
    rejectTopic,
    bookTopic,
  };
};

export default useTopicService;
