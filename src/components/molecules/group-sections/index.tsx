import IMGGROUP from "../../../assets/member.svg";
import useStudentService from "../../../services/useStudentService";
import { Button } from "../../atoms/button/Button";

function GroupSections() {
  const { createTeam } = useStudentService();
  return (
    <div className="flex justify-center items-center flex-col">
      <img src={IMGGROUP} />
      <Button onClick={createTeam} status="date">
        Tạo nhóm ngay
      </Button>
    </div>
  );
}

export default GroupSections;
