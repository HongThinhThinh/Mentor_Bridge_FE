import { useCallback, useEffect, useState, useMemo } from "react";
import CustomizedCard from "../../molecules/card/Card";
import { Button } from "../../atoms/button/Button";
import { PieChart } from "../../molecules/chart/pie-chart/PieChart";
import { EyeOutlined } from "@ant-design/icons";
import ContentsSection from "../../atoms/contents-section/ContentsSection";
import AddTopicForm from "../../molecules/formTopic";
import useTopicService from "../../../services/useTopicService";
import TopicList from "../../molecules/topic-section";
import { Topic } from "../../../model/topic";
import { formatDateToDDMMYY } from "../../../utils/dateFormat";
import { convertStatus } from "../../../utils/convertStatus";
import { Select } from "antd";
import { debounce } from "lodash";
import useSemesterService from "../../../services/useSemesterService ";
import useBookingService from "../../../services/useBookingService";
import CountdownTimer from "../../layouts/countdown-timer";
import MeetingDetail from "../../organisms/meeting-detail";

const HomeTemplate = () => {
  const [remainDate, setRemainDate] = useState(3);
  const [loading, setLoading] = useState(false);
  const [goodRate, setGoodRate] = useState(80);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [topic, setTopic] = useState<Topic[] | undefined>();
  const { getTopics } = useTopicService();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isOpenMeetingDetail, setIsOpenDetail] = useState(false);
  const { getBookingNearest } = useBookingService();
  const [bookingNearset, setBookingNearset] = useState([]);
  const fetch = async () => {
    try {
      const response = await getBookingNearest();
      setBookingNearset(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  console.log(bookingNearset);
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
    <div className="pt-6 pb-10 h-full w-full flex gap-6">
      <div className="w-1/4 h-full gap-6 flex flex-col">
        <div className="h-1/3">
          <CustomizedCard
            loading={loading}
            background="url('/src/assets/blue-abstract.svg')"
            styleClass="border-none"
          >
            <div className="h-full flex flex-col justify-between">
              <div className="text-white gap-2 flex flex-col">
                <span className="text-xs-large">
                  Buổi hẹn tiếp theo sẽ bắt đầu vào:
                </span>
                <h3 className="text-xl-extra-bold">
                  {" "}
                  <CountdownTimer
                    targetDate={bookingNearset[0]?.timeFrame?.timeFrameFrom}
                  />{" "}
                </h3>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => setIsOpenDetail(true)}
                  size="xs"
                  styleClass="bg-shade-900 text-white"
                  fontSize="xs"
                >
                  Xem lịch ngay
                </Button>

                <MeetingDetail
                  onCancel={() => setIsOpenDetail(false)}
                  setIsOpenDetail={setIsOpenDetail}
                  isOpen={isOpenMeetingDetail}
                  date={formatDateToDDMMYY(
                    bookingNearset[0]?.timeFrame?.timeFrameFrom
                  )}
                  meetings={bookingNearset}
                />
              </div>
            </div>
          </CustomizedCard>
        </div>
        <div className="h-2/3">
          <CustomizedCard
            loading={loading}
            styleClass="bg-gradient-to-b from-[#151316] to-[#4D4252] border-none"
          >
            <div className="h-full w-full">
              <div className="text-white flex justify-between items-center">
                <span className="text-xs-medium">
                  Tỉ lệ phản hồi tích cực từ sinh viên (%)
                </span>
                <Button
                  styleClass="bg-[#FFFFFF30] rounded-[12px] h-[43px] w-[43px] flex justify-center items-center"
                  status="none"
                >
                  <EyeOutlined />
                </Button>
              </div>
              <PieChart
                data={[
                  {
                    id: "bad",
                    label: "Phần còn lại",
                    value: 100 - goodRate,
                  },
                  {
                    id: "good",
                    label: "Phản hồi tốt",
                    value: goodRate,
                  },
                ]}
              ></PieChart>
            </div>
          </CustomizedCard>
        </div>
      </div>
      <div className="w-3/4 h-full gap-6 flex flex-col">
        <div className="h-[calc(50%-12px)]">
          <CustomizedCard
            loading={loading}
            styleClass="border border-shade-800 border-1"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm-medium">Danh sách đề tài</h3>
              <Button
                size="xs"
                styleClass="bg-gradient-to-r from-[#151316] to-[#4D4252] text-white"
                fontSize="xs"
                onClick={() => setIsModalVisible(true)}
              >
                Thêm đề tài mới +
              </Button>
              <AddTopicForm
                fetchData={fetchTopics}
                onClose={() => setIsModalVisible(false)}
                isOpen={isModalVisible}
              />
            </div>
            <TopicList topics={topic} />
          </CustomizedCard>
        </div>
        <div className="h-[calc(50%-12px)]">
          <CustomizedCard
            loading={loading}
            background="url('/src/assets/blue-green-abstract.svg')"
            styleClass="border-none"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm-medium">Lịch sử yêu cầu thêm đề tài</h3>
              <Select
                defaultValue=""
                style={{ width: 120 }}
                onChange={handleFilterChange}
                options={[
                  { value: "", label: "Tất cả" },
                  { value: "PENDING", label: "Pending" },
                  { value: "ACCEPTED", label: "Accepted" },
                  { value: "REJECTED", label: "Rejected" },
                  { value: "ACTIVE", label: "Active" },
                  { value: "INACTIVE", label: "Inactive" },
                ]}
              />
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
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
