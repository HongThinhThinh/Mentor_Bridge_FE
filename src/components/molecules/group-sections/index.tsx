import IMGGROUP from "../../../assets/member.svg";
import { Button } from "../../atoms/button/Button";

function GroupSections() {
  return (
    <div className="flex justify-center items-center flex-col">
      <img src={IMGGROUP} />
      <Button status="date">Tạo nhóm ngay</Button>
    </div>
  );
}

export default GroupSections;
