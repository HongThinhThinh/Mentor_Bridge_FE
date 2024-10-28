import ContentsSection from "../../atoms/contents-section/ContentsSection";
import GroupSections from "../../molecules/group-sections";
import CustomizedCard from "../../molecules/card/Card";
import ModalInvite from "../../molecules/modal-invite";
import { Button } from "../../atoms/button/Button";
import { useCallback, useEffect, useState } from "react";
import useStudentService from "../../../services/useStudentService";
import { useCurrentUser } from "../../../utils/getcurrentUser";
import useTopicService from "../../../services/useTopicService";
import { Topic } from "../../../model/topic";
import { HiDotsHorizontal } from "react-icons/hi";
import TopicDetail from "../topic-detail";
import { Empty } from "antd";

function StudentHomeUpcoming() {
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [dataTeam, setDataTeam] = useState();
  const [topic, setTopic] = useState<Topic[] | undefined>();

  const [open, setOpen] = useState<boolean>(false);
  const [selectedTopic, setSelectedTopic] = useState<Topic>();

  const user = useCurrentUser();

  const { getTopics } = useTopicService();
  const { getUserTeam } = useStudentService();

  const leader = dataTeam?.userTeams.find(
    (member) => member?.role === "LEADER"
  ); // find id leader

  const isLeader = leader?.user?.studentCode === user?.studentCode; // check user login is leader or member

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  const handleOpenModal = (e) => {
    setOpen(true);
    setSelectedTopic(e);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const fetchDataGroups = async () => {
    const response = await getUserTeam();
    setDataTeam(response);
  };

  useEffect(() => {
    fetchDataGroups();
  }, []);

  const fetchTopics = useCallback(async () => {
    try {
      const topics = await getTopics({
        page: 1,
        size: 10,
        sortBy: "name",
        sortDirection: "asc",
        status: "APPROVED",
      });
      console.log(topics);
      setTopic(topics);
    } catch (error) {
      console.error("Error fetching topics:", error);
    }
  }, []);

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <div className="mt-7">
      <div className="w-full h-full gap-6 flex flex-col">
        {dataTeam != null ? (
          <>
            <div className="h-[calc(50%-12px)]">
              <CustomizedCard
                loading={loading}
                styleClass="border border-shade-800 border-1 h-full"
              >
                <div className="flex justify-between items-center h-24">
                  <h3 className="text-sm-medium">
                    Danh sách thành viên nhóm{" "}
                    <span className="font-extrabold">{dataTeam?.code}</span>
                  </h3>
                  {isLeader && (
                    <Button
                      size="sm"
                      fontSize="xs"
                      onClick={() => setIsModalVisible(true)}
                    >
                      Thêm thành viên +
                    </Button>
                  )}

                  <ModalInvite
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                  />
                </div>
                <ul className="flex flex-col gap-2 overflow-y-scroll flex-grow">
                  {dataTeam?.userTeams?.map((data) => (
                    <ContentsSection
                      avt={data?.user?.avatar}
                      isGroup
                      key={data.id}
                      // status="pending"
                      content={`${data?.user?.studentCode}-${data?.user?.fullName}`}
                      time={
                        data.role == "LEADER"
                          ? "Nhóm trưởng"
                          : "Thành viên nhóm"
                      }
                      // value="Đang xử lý"
                    />
                  ))}
                </ul>
              </CustomizedCard>
            </div>

            <div className="h-[calc(50%-12px)]">
              <CustomizedCard
                loading={loading}
                background="url('/src/assets/blue-green-abstract.svg')"
                styleClass="border-none"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm-medium">Danh sách đề tài</h3>
                </div>
                <ul className="space-y-4 overflow-y-scroll h-4/5">
                  {topic?.length > 0 ? (
                    topic?.map((topic) => (
                      <ContentsSection
                        key={topic.id} // Ensure unique keys for each list item
                        time={topic?.creator?.fullName}
                        content={topic?.name}
                        suffix={
                          <HiDotsHorizontal
                            onClick={() => handleOpenModal(topic)}
                          />
                        }
                      />
                    ))
                  ) : (
                    <Empty description="Hiện chưa có đề tài nào" />
                  )}
                </ul>
              </CustomizedCard>

              <TopicDetail
                isOpen={open}
                onCancel={handleCloseModal}
                topic={selectedTopic}
                isLeader={isLeader}
              />
            </div>
          </>
        ) : (
          <div className="h-full flex justify-center items-center">
            <GroupSections />
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentHomeUpcoming;
