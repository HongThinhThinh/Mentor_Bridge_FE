import ContentsSection from "../../atoms/contents-section/ContentsSection";
import GroupSections from "../../molecules/group-sections";
import CustomizedCard from "../../molecules/card/Card";
import ModalInvite from "../../molecules/modal-invite";
import { Button } from "../../atoms/button/Button";
import { useCallback, useEffect, useState } from "react";
import useStudentService from "../../../services/useStudentService";
import { useCurrentUser } from "../../../utils/getcurrentUser";
import { formatDateToDDMMYY } from "../../../utils/dateFormat";
import useTopicService from "../../../services/useTopicService";
import { Topic } from "../../../model/topic";

function StudentHomeUpcoming() {
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [dataTeam, setDataTeam] = useState();
  const [topic, setTopic] = useState<Topic[] | undefined>();

  const user = useCurrentUser();

  const { getTopics } = useTopicService();
  const { getUserTeam } = useStudentService();

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  const fetchDataGroups = async () => {
    const response = await getUserTeam();
    console.log("team", response.code);
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
                  <h3 className="text-sm-medium">Danh sách thành viên nhóm <span className="font-extrabold">{dataTeam.code}</span></h3>
                  <Button
                    size="sm"
                    fontSize="xs"
                    onClick={() => setIsModalVisible(true)}
                  >
                    Thêm thành viên +
                  </Button>

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
                      time={data.role == "LEADER" ? "Nhóm trưởng" : "Thành viên nhóm"}
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
                      // value={convertStatus(topic?.status)}
                    />
                  ))}
                </ul>
              </CustomizedCard>
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
