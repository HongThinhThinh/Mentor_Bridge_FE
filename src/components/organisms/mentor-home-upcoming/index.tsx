import { Select } from "antd";

import { useCallback, useEffect, useMemo, useState } from "react";

import { debounce } from "lodash";
import { Topic } from "../../../model/topic";
import useTopicService from "../../../services/useTopicService";
import CustomizedCard from "../../molecules/card/Card";
import { Button } from "../../atoms/button/Button";
import AddTopicForm from "../../molecules/formTopic";
import TopicList from "../../molecules/topic-section";

function MentorHomeUpcoming() {
  const [loading, setLoading] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [topic, setTopic] = useState<Topic[] | undefined>();
  const { getTopics } = useTopicService();
  const [selectedStatus, setSelectedStatus] = useState("");

  // Use debounce to delay the filter action and avoid multiple renders
  const handleFilterChange = useMemo(
    () =>
      debounce((value) => {
        setSelectedStatus(value);
      }, 300), // 300ms debounce delay
    []
  );

  const fetchTopics = useCallback(async () => {
    try {
      const topics = await getTopics({
        page: 1,
        size: 10,
        sortBy: "name",
        sortDirection: "asc",
        status: selectedStatus,
      });
      console.log(topics);
      setTopic(topics);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  }, [getTopics, selectedStatus]);

  useEffect(() => {
    fetchTopics();
  }, [selectedStatus, fetchTopics]);
  return (
    <div className="mt-7">
      <div className="w-full h-full gap-6 flex flex-col">
        <div className="h-full">
          <CustomizedCard
            loading={loading}
            styleClass="border border-shade-800 border-1"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm-medium">Danh sách đề tài</h3>
              <div className="gap-5 flex">
                <Select
                  defaultValue=""
                  style={{ width: 120 }}
                  onChange={handleFilterChange}
                  options={[
                    { value: "", label: "Tất cả" },
                    { value: "PENDING", label: "Đang xử lí" },
                    { value: "ACCEPTED", label: "Được chấp nhận" },
                    { value: "REJECTED", label: "Bị từ chối" },
                    { value: "ACTIVE", label: "Active" },
                    { value: "INACTIVE", label: "Inactive" },
                  ]}
                />
                <Button
                  size="xs"
                  styleClass="bg-gradient-to-r from-[#151316] to-[#4D4252] text-white"
                  fontSize="xs"
                  onClick={() => setIsModalVisible(true)}
                >
                  Thêm đề tài mới +
                </Button>
              </div>
              <AddTopicForm
                fetchData={fetchTopics}
                onClose={() => setIsModalVisible(false)}
                isOpen={isModalVisible}
              />
            </div>
            <TopicList topics={topic} />
          </CustomizedCard>
        </div>
      </div>
    </div>
  );
}

export default MentorHomeUpcoming;
