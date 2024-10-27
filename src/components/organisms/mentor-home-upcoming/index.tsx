import { Select } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { Topic } from "../../../model/topic";
import useTopicService from "../../../services/useTopicService";
import CustomizedCard from "../../molecules/card/Card";
import { Button } from "../../atoms/button/Button";
import AddTopicForm from "../../molecules/formTopic";
import TopicList from "../../molecules/topic-section";
import ContentsSection from "../../atoms/contents-section/ContentsSection";
import { formatDateToDDMMYY } from "../../../utils/dateFormat";
import { convertStatus } from "../../../utils/convertStatus";

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
    <div className="mt-7 h-full">
      <div className="w-full h-[700px] gap-6 flex flex-col">
        <div className="h-[calc(50%-12px)]">
          <CustomizedCard
            loading={loading}
            background="url('/src/assets/blue-green-abstract.svg')"
            styleClass="border-none"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm-medium">Danh sách đề tài</h3>
              <div className="gap-4 flex">
                <Select
                  defaultValue=""
                  style={{ width: 120 }}
                  onChange={handleFilterChange}
                  options={[
                    { value: "", label: "Tất cả" },
                    { value: "PENDING", label: "Đang xử lí" },

                    { value: "INACTIVE", label: "Được chấp nhận" },
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
            </div>
            <ul className="space-y-4 overflow-y-scroll h-4/5">
              {topic?.map((topic) => (
                <ContentsSection
                  key={topic.id} // Ensure unique keys for each list item
                  time={formatDateToDDMMYY(topic.createdAt)}
                  content={topic.name}
                  status={
                    topic?.status?.toLowerCase() == "inactive"
                      ? "success"
                      : topic?.status?.toLowerCase()
                  }
                  value={convertStatus(topic?.status)}
                />
              ))}
            </ul>
          </CustomizedCard>
          <AddTopicForm
            fetchData={fetchTopics}
            onClose={() => setIsModalVisible(false)}
            isOpen={isModalVisible}
          />
        </div>
        {/* <div className="h-[calc(50%-12px)]"></div> */}
      </div>
    </div>
  );
}

export default MentorHomeUpcoming;
