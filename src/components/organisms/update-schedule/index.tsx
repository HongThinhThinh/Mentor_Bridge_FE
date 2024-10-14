/* eslint-disable @typescript-eslint/no-explicit-any */
import { AiOutlineEdit, AiOutlineSend } from "react-icons/ai";
import { Button } from "../../atoms/button/Button";
import { CustomModal } from "../../molecules/modal/Modal";
import { MultipleTime } from "../../molecules/mutiple-time/MultipleTime";
import { useState } from "react";
import { Flex, InputNumber } from "antd";

function UpdateScheduler() {
  const [open, setOpen] = useState(false);
  const [timeDuration, setTimeDuration] = useState<number>(15);
  const handleCancel = () => {
    setOpen(!open);
  };

  const onFinish = (values: any) => {
    console.log(timeDuration);
    console.log("Received values of form:", values);
  };
  const handleChange = (value: any) => {
    setTimeDuration(value);
    if (![15, 30, 45, 60].includes(value)) {
      return 15; // Giá trị mặc định nếu người dùng nhập không đúng
    }
  };
  const body = (
    <>
      {/* <Button></Button> */}
      <Flex gap={"20px"} align="center">
        <h4>Chọn thời gian muốn cắt giữa các slot</h4>
        <InputNumber
          size="large"
          min={15}
          max={60}
          step={15}
          defaultValue={15}
          onChange={handleChange}
          formatter={(value) => `${value}p`}
          // parser={(value) => value.replace("p", "")}
        />
      </Flex>
      <MultipleTime label="Thứ 2" />
      <MultipleTime label="Thứ 3" />
      <MultipleTime label="Thứ 4" />
      <MultipleTime label="Thứ 5" />
      <MultipleTime label="Thứ 6" />
      <MultipleTime label="Thứ 7" />
      <MultipleTime label="Chủ Nhật" />
    </>
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
        type="submit"
      />
    </div>
  );

  return (
    <>
      <Button
        children={
          <div className="flex justify-center items-center">
            <p className="mr-2">Cập nhật lịch trống</p>
            <AiOutlineEdit size={20} />
          </div>
        }
        styleClass="bg-gradient-to-r from-[#151316] to-[#5A4F5F] text-white"
        onClick={handleCancel}
        size="sm"
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
