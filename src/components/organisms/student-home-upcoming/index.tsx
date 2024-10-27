
import ContentsSection from "../../atoms/contents-section/ContentsSection";
import GroupSections from "../../molecules/group-sections";
import CustomizedCard from "../../molecules/card/Card";
import ModalInvite from "../../molecules/modal-invite";
import { Button } from "../../atoms/button/Button";
import { useEffect, useState } from "react";
import useStudentService from "../../../services/useStudentService";
import { useCurrentUser } from "../../../utils/getcurrentUser";

function StudentHomeUpcoming() {
  const [loading, setLoading] = useState(true);
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

//   const fetchData = () => {
//     getBooking(selectedOption, "REQUESTED")
//       .then((response) => {
//         console.log(response);
//         setDataSource(response);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   };

//   useEffect(() => {
//     fetchData();
//   }, [selectedOption]);

 
  return (
    <div className="mt-7">
      <div className="w-full h-full gap-6 flex flex-col">
        {user?.teamCode != null ? (
          <>
            <div className="h-[calc(50%-12px)]">
              <CustomizedCard
                loading={loading}
                styleClass="border border-shade-800 border-1 h-full"
              >
                <div className="flex justify-between items-center h-24">
                  <h3 className="text-sm-medium">Danh sách thành viên nhóm</h3>
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
                      status="pending"
                      content={`${data?.user?.studentCode}-${data?.user?.fullName}`}
                      time={data.role}
                      value="Đang xử lý"
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
