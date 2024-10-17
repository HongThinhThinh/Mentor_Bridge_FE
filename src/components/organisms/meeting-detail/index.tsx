import { CustomModal } from "../../molecules/modal/Modal";
import { Button } from "../../atoms/button/Button";
import ContentsSection from "../../atoms/contents-section/ContentsSection";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineSend } from "react-icons/ai";
import { Select } from "antd";
import "./index.scss";
interface MeetingDetailProps {
  date?: string;
  width?: number;
  isOpen?: boolean;
  onCancel?: () => void;
  onFinish?: (values: any) => void;
  onValueChange?: (values: any) => void;
}
function MeetingDetail({
  date,
  isOpen,
  onCancel,
  onFinish,
  onValueChange,
  width,
}: MeetingDetailProps) {
  const header = (
    <div>
      <h1 className="text-2xl-medium">Thông tin cuộc họp</h1>
      <Button size="xs" status="date">
        <p className="text-xs-medium">{date}</p>
      </Button>
    </div>
  );
  const body = (
    <div className="modal-container">
      <div className="modal-container__list">
        <h1 className="text-xl-medium">Danh sách cuộc họp trong ngày</h1>
        <ContentsSection
          time="7:30-9:00"
          status="feedback"
          value="Đánh giá giảng viên"
        />
        <ContentsSection
          time="7:30-9:00"
          status="feedback"
          value="Đánh giá giảng viên"
        />
        <ContentsSection
          isReady
          time="7:30-9:00"
          status="feedback"
          value="Đánh giá giảng viên"
        />
      </div>
      <div className="modal-container__time-container">
        <h1 className="text-xl-medium">Dời cuộc họp lúc 15:30 đến</h1>
        <div className="flex gap-5 items-center justify-around modal-container__time-wrapper">
          <Select
            defaultValue="12-10-2024 15:30"
            style={{ width: 161 }}
            options={[
              { value: "12-10-2024 15:30", label: "12-10-2024 15:30" },
              { value: "12-10-2024 15:30", label: "12-10-2024 15:30" },
              { value: "12-10-2024 15:30", label: "12-10-2024 15:30" },
            ]}
          />
          <FaArrowRight />
          <Select
            defaultValue="12-10-2024 15:30"
            style={{ width: 161 }}
            options={[
              { value: "12-10-2024 15:30", label: "12-10-2024 15:30" },
              { value: "12-10-2024 15:30", label: "12-10-2024 15:30" },
              { value: "12-10-2024 15:30", label: "12-10-2024 15:30" },
            ]}
          />
        </div>
      </div>
    </div>
  );
  const footer = (
    <div className="footer-container">
      <Button styleClass="footer-btn--cancel">Hủy</Button>
      <Button
        styleClass="footer-btn--submit"
        children={
          <div className="flex justify-center items-center ">
            <p className="mr-2">Xác nhận</p> <AiOutlineSend size={18} />
          </div>
        }
        size="sm"
        type="submit"
      />
    </div>
  );
  return (
    <>
      <CustomModal
        onValueChange={onValueChange}
        header={header}
        width={width}
        body={body}
        footer={footer}
        isOpen={isOpen}
        onCancel={onCancel}
        onFinish={onFinish}
      />
    </>
  );
}

export default MeetingDetail;
