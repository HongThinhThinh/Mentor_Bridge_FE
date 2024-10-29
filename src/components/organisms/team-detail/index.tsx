import { CustomModal } from "../../molecules/modal/Modal";
import { Button } from "../../atoms/button/Button";
import { Topic } from "../../../model/topic";
import { Avatar, Descriptions, DescriptionsProps } from "antd";
import useTopicService from "../../../services/useTopicService";
import { User } from "../../../model/user";

interface TeamDetailProps {
  width?: number;
  isOpen?: boolean;
  onCancel?: () => void;
  onValueChange?: (values: any) => void;
  topic?: Topic;
  userTeams?: User[];
  code?: string;
}

function TeamDetail({
  isOpen,
  onCancel,
  width,
  topic,
  userTeams,
  code,
}: TeamDetailProps) {
  const leaderUsers = userTeams?.filter(
    (teamMember) => teamMember?.role === "LEADER"
  );

  const items: DescriptionsProps["items"] = [
    {
      label: "Tên nhóm",
      children: code,
    },
    {
      label: "Tên đề tài",
      children: topic?.name || "Không có tên đề tài",
    },
    {
      label: "Nhóm trưởng",
      children: leaderUsers[0]?.user?.fullName,
    },
    {
      label: "Thành viên",
      children: (
        <div>
          {userTeams?.map((users) => (
            <div key={users.id} className="flex gap-3 items-center mb-1">
              <Avatar src={users?.user?.avatar} alt={users?.fullName} />
              <span className="member-name">
                {users?.user?.fullName} - {users?.user?.studentCode}
              </span>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const header = <h1 className="text-2xl-medium mb-3">Chi tiết nhóm</h1>;

  const body = (
    <div className="modal-container">
      <Descriptions
        bordered
        column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
        items={items}
      />
    </div>
  );

  const footer = (
    <div className="footer-container">
      <></>
    </div>
  );

  return (
    <>
      <CustomModal
        // onValueChange={onValueChange}
        header={header}
        width={width}
        body={body}
        footer={footer}
        isOpen={isOpen}
        onCancel={onCancel}
        // onFinish={onFinish}
      />
    </>
  );
}

export default TeamDetail;
