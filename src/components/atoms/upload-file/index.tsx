import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Modal, Upload } from "antd";
import React, { useState } from "react";
import useAdminService from "../../../services/useAdminService";

function UploadFile({ setDataSource }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { uploadFile } = useAdminService();
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpload = async (info: any) => {
    const response = await uploadFile(info.file.originFileObj);
  };
  return (
    <div>
      <Button onClick={handleOpenModal} type="primary">
        Upload File
      </Button>

      <Modal
        title="Upload File"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Upload
          name="file"
          action="/upload" // URL API cho việc upload file
          onChange={handleUpload}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Modal>
    </div>
  );
}

export default UploadFile;
