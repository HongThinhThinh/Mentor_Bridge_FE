/* eslint-disable @typescript-eslint/no-explicit-any */
import { UploadOutlined } from "@ant-design/icons";
import { Button, Modal, Upload, UploadFile, UploadProps } from "antd";
import React, { useState } from "react";
import useAdminService from "../../../services/useAdminService";

interface UploadFileProps {
  fetchData: () => void;
}

function UploadFileComponent({ fetchData }: UploadFileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[] | any>([]);

  const { uploadFile, loading } = useAdminService();
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUpload = async () => {
    await uploadFile(fileList[0]);
    fetchData();
    setFileList([]);
    handleCancel();
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  return (
    <div>
      <Button onClick={handleOpenModal} type="primary">
        Import danh sách người dùng
      </Button>

      <Modal
        title="Upload File"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <Button
          type="primary"
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={loading}
          style={{ marginTop: 16 }}
        >
          {loading ? "Uploading" : "Start Upload"}
        </Button>
      </Modal>
    </div>
  );
}

export default UploadFileComponent;
