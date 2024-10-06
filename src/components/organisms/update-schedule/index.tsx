import { AiOutlineEdit, AiOutlineSend } from "react-icons/ai";
import { Button } from "../../atoms/button/Button";
import { CustomModal } from "../../molecules/modal/Modal";
import { MultipleTime } from "../../molecules/mutiple-time/MultipleTime";
import { useState } from "react";
import { Form } from "antd";

function UpdateScheduler() {
  const [open, setOpen] = useState(false);

  const handleCancel = () => {
    setOpen(!open);
  };

  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
  };
  const body = (
    <div>
      <MultipleTime label="Thứ 2" />
      <MultipleTime label="Thứ 3" />
      <MultipleTime label="Thứ 4" />
      <MultipleTime label="Thứ 5" />
      <MultipleTime label="Thứ 6" />
      <MultipleTime label="Thứ 7" />
      <MultipleTime label="Chủ Nhật" />
    </div>
  );

  const footer = (
    <div className="flex justify-between ">
      <Button
        children="Hủy bỏ"
        styleClass="border border-black"
        size="sm"
        onClick={handleCancel}
      />
      <Button
        children={
          <div className="flex justify-center items-center">
            <p className="mr-2">Xác nhận</p> <AiOutlineSend size={18} />
          </div>
        }
        size="sm"
        styleClass="bg-gradient-to-r from-[#FF6001] to-[#F9A26E] text-white"
      />
    </div>
  );

  return (
    <>
      <Button
        children={
          <div className="flex justify-center items-center">
            <p className="mr-2">Cập nhật lịch trống</p>
            <AiOutlineEdit size={24} />
          </div>
        }
        styleClass="bg-gradient-to-r from-[#151316] to-[#5A4F5F] text-white"
        onClick={handleCancel}
      />
      <CustomModal
        header="Cập nhật lịch trống trong tuần"
        body={body}
        footer={footer}
        isOpen={open}
        width={610}
        onCancel={handleCancel}
        onFinish={onFinish}
      />
    </>
  );
}

export default UpdateScheduler;
