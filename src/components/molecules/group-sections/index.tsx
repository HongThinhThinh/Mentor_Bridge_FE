import IMGGROUP from "../../../assets/member.svg";
import useStudentService from "../../../services/useStudentService";
import { Button } from "../../atoms/button/Button";



function GroupSections({setIsReload}) {
  const { createTeam } = useStudentService();
    const handleCreateTeam = async () => {
      await createTeam();
      setIsReload(true);
    }
  return (
    <div className="flex justify-center items-center flex-col">
      <img src={IMGGROUP} />
      <Button onClick={handleCreateTeam} status="date">
        Tạo nhóm ngay
      </Button>
    </div>
  );
}

export default GroupSections;
