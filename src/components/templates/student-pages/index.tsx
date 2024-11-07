import { useEffect, useState } from "react";
import "./index.scss";
import CustomizedCard from "../../molecules/card/Card";
import { Button } from "../../atoms/button/Button";
import { PieChart } from "../../molecules/chart/pie-chart/PieChart";
import ContentsSection from "../../atoms/contents-section/ContentsSection";
import { useCurrentUser } from "../../../utils/getcurrentUser";
import GroupSections from "../../molecules/group-sections";
import useStudentService from "../../../services/useStudentService";
import ModalInvite from "../../molecules/modal-invite";
import useBookingService from "../../../services/useBookingService";
import { Empty, Select, Tag } from "antd";
import { formatDateToDDMMYY, formatHours } from "../../../utils/dateFormat";
import { convertStatus, convertStatusEnum } from "../../../utils/convertStatus";
import CountdownTimer from "../../layouts/countdown-timer";
import MeetingDetail from "../../organisms/meeting-detail";
import { useNavigate } from "react-router-dom";
import { STUDENT_ROUTES } from "../../../constants/routes";
import { GiQueenCrown } from "react-icons/gi";
import { Role } from "../../../constants/role";

const StudentPages = () => {
  const [loading, setLoading] = useState(true);
  const [remainDate, setRemainDate] = useState(3);
  const [goodRate, setGoodRate] = useState(80);
  const [isOpenMeetingDetail, setIsOpenDetail] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState("INDIVIDUAL"); // New state for selected option
  const [dataTeam, setDataTeam] = useState();
  const { getBookingNearest } = useBookingService();
  const [bookingNearset, setBookingNearset] = useState([]);
  const navigate = useNavigate();
  const user = useCurrentUser();

  const [points, setPoints] = useState(0);
  const { getPoints } = useStudentService();
  const fetchPoints = async () => {
    try {
      const response = await getPoints();
      console.log(response);
      setPoints(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

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
  const { getBooking } = useBookingService();
  const { getUserTeam } = useStudentService();

  setTimeout(() => {
    setLoading(false);
  }, 1500);

  const options = [
    { label: "Cá nhân", value: "INDIVIDUAL" },
    { label: "Nhóm", value: "TEAM" },
  ];

  const fetchDataGroups = async () => {
    const response = await getUserTeam();
    setDataTeam(response);
  };

  useEffect(() => {
    fetchDataGroups();
  }, []);

  const leader = dataTeam?.userTeams?.find(
    (member) => member?.role === "LEADER"
  ); // find id leader

  const isLeader = leader?.user?.studentCode === user?.studentCode; // check user login is leader or member

  const fetchData = () => {
    getBooking(selectedOption, "REQUESTED")
      .then((response) => {
        setDataSource(response);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const isMentor = dataTeam?.userTeams?.filter(
    (item) => item?.role === Role.MENTOR
  ).length;

  useEffect(() => {
    fetchData();
  }, [selectedOption]);

  const handleSelectChange = (value) => {
    setSelectedOption(value); // Update selected option
  };

  return (
    <div className="pt-6 pb-10 h-full w-full flex gap-6" id="student-dashboard">
      <div className="w-1/4 h-full gap-6 flex flex-col">
        <div className="h-1/3">
          <CustomizedCard
            loading={loading}
            background="url('/src/assets/green-blue-abstract.svg')"
            styleClass="border-none"
          >
            <div className="h-full flex flex-col justify-between">
              <div className="text-white gap-2 flex flex-col">
                {bookingNearset && bookingNearset?.length > 0 ? (
                  <>
                    <span className="text-xs-large">
                      Buổi hẹn tiếp theo sẽ bắt đầu vào:
                    </span>
                    <h3 className="text-xl-extra-bold">
                      {" "}
                      <CountdownTimer
                        dateTo={bookingNearset[0]?.timeFrame?.timeFrameTo}
                        targetDate={bookingNearset[0]?.timeFrame?.timeFrameFrom}
                      />{" "}
                    </h3>
                  </>
                ) : (
                  <span
                    style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#fff",
                    }}
                  >
                    Chưa có cuộc họp nào sắp tới
                  </span>
                )}
              </div>
            </div>
            {bookingNearset && bookingNearset?.length > 0 ? (
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
            ) : (
              <div className="flex justify-end">
                <Button
                  onClick={() =>
                    navigate(
                      "/" +
                        STUDENT_ROUTES.STUDENT +
                        "/" +
                        STUDENT_ROUTES.BOOKING
                    )
                  }
                  size="xs"
                  styleClass="bg-shade-900 text-white"
                  fontSize="xs"
                >
                  Đặt lịch ngay
                </Button>
              </div>
            )}
          </CustomizedCard>
        </div>
        <div className="h-2/3">
          <CustomizedCard
            loading={loading}
            styleClass="bg-gradient-to-b from-[#FF6001] to-[#FF9759] border-none"
          >
            <div className="h-full w-full">
              <div className="text-white flex justify-between items-center">
                <span className="text-xs-medium">Tổng điểm trong kì (50)</span>
              </div>
              <PieChart
                variant="secondary"
                data={[
                  {
                    id: "Tổng điểm còn lại",
                    label: "Tổng điểm còn lại",
                    value: points?.studentPoints,
                  },
                  {
                    id: "Tổng điểm đã sử dụng",
                    label: "Tổng điểm đã sử dụng",
                    value: 50 - points?.studentPoints,
                  },
                ]}
              />
            </div>
          </CustomizedCard>
        </div>
      </div>
      <div className="w-3/4 h-full gap-6 flex flex-col">
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
                    <span className="font-extrabold">
                      {" " +
                        dataTeam?.code +
                        " (" +
                        (dataTeam?.userTeams?.length - isMentor) +
                        " thành viên)"}
                    </span>
                  </h3>
                  <Button
                    size="md"
                    fontSize="md"
                    children={`Số điểm còn lại của nhóm: ${points?.teamPoints}`}
                    styleClass="rounded-lg text-black"
                    status="none"
                  />

                  {/* {isLeader && (  
                    <Button
                      size="sm"
                      fontSize="xs"
                      onClick={() => setIsModalVisible(true)}
                    >
                      Thêm thành viên +
                    </Button>
                  )} */}
                  <ModalInvite
                    visible={isModalVisible}
                    onClose={() => setIsModalVisible(false)}
                  />
                </div>
                <ul className="flex flex-col gap-2 overflow-y-scroll flex-grow">
                  {dataTeam?.userTeams
                    ?.filter((data) => data?.role !== Role.MENTOR)
                    ?.sort((a, b) => (a.role === "LEADER" ? -1 : 1))
                    .map((data) => (
                      <ContentsSection
                        avt={data?.user?.avatar}
                        isGroup
                        key={data.id}
                        // status="pending"
                        content={`${data?.user?.studentCode}-${data?.user?.fullName}`}
                        time={
                          data.role == "LEADER" ? (
                            <div className="flex gap-2 items-center">
                              <p>Nhóm trưởng</p>
                              <GiQueenCrown size={20} />
                            </div>
                          ) : (
                            "Thành viên nhóm"
                          )
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
                background="url('/src/assets/blue-abstract-v2.svg')"
                styleClass="border-none"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm-medium">Lịch sử yêu cầu cuộc họp</h3>
                  <Select
                    options={options}
                    defaultValue="INDIVIDUAL"
                    style={{ width: 120 }}
                    onChange={handleSelectChange} // Trigger handleSelectChange on change
                  />
                </div>
                <ul className="space-y-4 overflow-y-scroll h-4/5">
                  {dataSource && dataSource?.length > 0 ? (
                    <>
                      {dataSource?.map((item) => (
                        <ContentsSection
                          time={
                            formatHours(item?.timeFrame?.timeFrameFrom) +
                            " - " +
                            formatHours(item?.timeFrame?.timeFrameTo)
                          }
                          value={convertStatus(item?.status)}
                          status={convertStatusEnum(item?.status)}
                          content={item?.mentor?.fullName}
                          styleClass="pl-4"
                        />
                      ))}
                    </>
                  ) : (
                    <Empty />
                  )}
                </ul>
              </CustomizedCard>
            </div>
          </>
        ) : (
          <div className="h-lvh flex justify-center items-center">
            {/* <GroupSections /> */}
            <Empty
              children={
                <p>
                  {" "}
                  Bạn chưa có team, và đã quá hạn đăng kí. Vui lòng liên hệ
                  admin với số điện thoại : 0765041143 để được giúp đỡ
                </p>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPages;
