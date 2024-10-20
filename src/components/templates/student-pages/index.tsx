import { useEffect, useState } from "react";
import CustomizedCard from "../../molecules/card/Card";
import { Button } from "../../atoms/button/Button";
import { PieChart } from "../../molecules/chart/pie-chart/PieChart";
import { EyeOutlined } from "@ant-design/icons";
import ContentsSection from "../../atoms/contents-section/ContentsSection";
import { useCurrentUser } from "../../../utils/getcurrentUser";
import GroupSections from "../../molecules/group-sections";
import useStudentService from "../../../services/useStudentService";
import ModalInvite from "../../molecules/modal-invite";

const StudentPages = () => {
  const [loading, setLoading] = useState(true);
  const [remainDate, setRemainDate] = useState(3);
  const [goodRate, setGoodRate] = useState(80);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = useCurrentUser();

  const [dataTeam, setDataTeam] = useState();
  const { getUserTeam } = useStudentService();
  setTimeout(() => {
    setLoading(false);
  }, 1500);

  const fetchDataGroups = async () => {
    const response = await getUserTeam();
    setDataTeam(response);
  };
  useEffect(() => {
    fetchDataGroups();
  }, []);

  console.log(dataTeam);

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
                <span className="text-xs-medium">
                  Buổi hẹn tiếp theo sẽ bắt đầu vào
                </span>
                <h3 className="text-xl-extra-bold">{remainDate} ngày nữa</h3>
              </div>
              <div className="flex justify-end">
                <Button
                  size="xs"
                  styleClass="bg-shade-900 text-white"
                  fontSize="xs"
                >
                  Xem lịch ngay
                </Button>
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
                  Số điểm còn lại trong kì :
                </span>
                <Button styleClass="bg-[#FFFFFF30] rounded-[12px] h-[43px] w-[43px] flex justify-center items-center">
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
        {user?.teamCode != null ? (
          <>
            <div className="h-[calc(50%-12px)]">
              <CustomizedCard
                loading={loading}
                styleClass="border border-shade-800 border-1"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm-medium">Danh sách thành viên nhóm</h3>
                  <Button
                    size="xs"
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
                <ul className="space-y-3 overflow-y-scroll h-4/5">
                  {dataTeam?.userTeams.map((data) => (
                    <ContentsSection
                      avt={data?.user?.avatar}
                      isGroup
                      key={data.id}
                      status="pending"
                      content={`${data?.user.studentCode}-${data?.user?.fullName}`} // Corrected template literal usage
                      time={data.role}
                      value="Đang xử lý"
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
                  <h3 className="text-sm-medium">Lịch sử yêu cầu cuộc họp</h3>
                  <Button
                    size="xs"
                    styleClass="text-white"
                    variant="frosted-glass"
                    fontSize="xs"
                  >
                    Tất cả
                  </Button>
                </div>
                <ul className="space-y-4 overflow-y-scroll h-4/5">
                  <ContentsSection
                    time="30-10-2024"
                    value="Đánh giá nhóm"
                    status="feedback"
                  />

                  <ContentsSection
                    status="deny"
                    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat placeat facere quas quasi beatae corrupti minima vero cum at dolorem, veniam consequuntur non? Voluptate laborum aspernatur, delectus quis dolor sequi."
                    time="30-10-2024"
                    value="Bị từ chối"
                  />
                  <ContentsSection
                    status="success"
                    content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat placeat facere quas quasi beatae corrupti minima vero cum at dolorem, veniam consequuntur non? Voluptate laborum aspernatur, delectus quis dolor sequi."
                    time="30-10-2024"
                    value="Được chấp nhận"
                  />
                </ul>
              </CustomizedCard>
            </div>
          </>
        ) : (
          <div className="h-lvh flex justify-center items-center">
            <GroupSections />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPages;
