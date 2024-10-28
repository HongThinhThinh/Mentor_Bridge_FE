import { useState } from "react";
import { CustomModal } from "../../molecules/modal/Modal";
import { Button } from "../../atoms/button/Button";
import { AiOutlineSend } from "react-icons/ai";
import { Topic } from "../../../model/topic";
import { Avatar, Descriptions } from "antd";

interface TopicDetailProps {
  width?: number;
  isOpen?: boolean;
  onCancel?: () => void;
  onFinish?: (values: any) => void;
  onValueChange?: (values: any) => void;
  topic?: Topic;
}

function TopicDetail({
  isOpen,
  onCancel,
  onFinish,
  onValueChange,
  width,
  topic,
}: TopicDetailProps) {
  const items: DescriptionsProps["items"] = [
    {
      label: "Giảng viên",
      children: (
        <div className="flex items-center gap-2">
          <Avatar src={topic?.creator?.avatar} />
          {topic?.creator?.fullName || "Không có thông tin giảng viên"}
        </div>
      ),
    },
    {
      label: "Tên đề tài",
      children: topic?.name || "Không có tên đề tài",
    },

    {
      label: "File",
      children: "18:00:00",
    },

    {
      label: "Mô tả",
      span: { xs: 1, sm: 2, md: 3, lg: 3, xl: 2, xxl: 2 },
      children: topic?.description || "Không có mô tả",
    },
  ];
  const header = <h1 className="text-2xl-medium mb-3">Chi tiết đề tài</h1>;

  const body = (
    <div className="modal-container">
      <Descriptions
        // title="Responsive Descriptions"
        bordered
        column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
        items={items}
      />
    </div>
  );

  const footer = (
    <div className="footer-container">
      <Button styleClass="footer-btn--cancel" onClick={onCancel}>
        Hủy
      </Button>

      <Button
        styleClass="footer-btn--submit"
        children={
          <div className="flex justify-center items-center ">
            <p className="mr-2">Chọn đề tài</p>
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

export default TopicDetail;
