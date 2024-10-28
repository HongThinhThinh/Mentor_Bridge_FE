import { memo, useState } from "react";
import { User } from "../../../model/user";
import "./index.scss";
import { Topic } from "../../../model/topic";
import { HiDotsHorizontal } from "react-icons/hi";
import TeamDetail from "../../organisms/team-detail";
interface GroupItemProps {
  index?: number;
  id?: string;
  code?: string;
  createdAt?: string;
  userTeams?: any[];
  topic: Topic;
}

// Sửa lỗi ở đây, truyền props cho hàm của React.memo
const GroupItem: React.FC<GroupItemProps> = memo(
  ({ index, id, code, createdAt, userTeams, topic }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
    return (
      <>
        <li className="group-item">
          <span className="index">{index}</span>
          <div className="code">
            <span className="title">{code}</span>
            <span className="title">
              {" (" + userTeams?.length + " thành viên)"}{" "}
            </span>
          </div>
          <div className="content">
            <span className="title">{topic?.name}</span>
          </div>
          <div>
            <HiDotsHorizontal onClick={handleOpen} />
          </div>
        </li>

        <TeamDetail
          isOpen={open}
          onCancel={handleClose}
          topic={topic}
          userTeams={userTeams}
          code={code}
        />
      </>
    );
  }
);

interface GroupListProps {
  groups: any[];
}

const GroupList: React.FC<GroupListProps> = ({ groups }) => {
  return (
    <ul className="group-list">
      {groups?.map((group, index) => (
        <GroupItem
          key={index}
          index={index + 1}
          userTeams={group?.userTeams}
          topic={group?.topics[0]}
          code={group?.code}
        />
      ))}
    </ul>
  );
};

export default GroupList;
