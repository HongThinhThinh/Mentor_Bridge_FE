import { Form, Input, Button, Tag, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import DashboardTemplate, {
  Column,
} from "../../../components/templates/dashboard-template";
import { TOPIC_API } from "../../../constants/endpoints";
import { downloadBase64File } from "../../../utils/dowloadBase64File";
import useTopicService from "../../../services/useTopicService"; // Import the hook
import { useState } from "react";

function ManageTopic() {
  const title = "đề tài";
  const { acceptTopic, rejectTopic, loading } = useTopicService(); // Destructure the hook to get methods
  const [isReload, setIsReload] = useState(false);
  const handleAccept = async (id: string) => {
    try {
      await acceptTopic(id);
    } catch (error) {
      console.error("Error accepting topic:", error);
    } finally {
      setIsReload((prev) => !prev);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await rejectTopic(id);
    } catch (error) {
      console.error("Error rejecting topic:", error);
    } finally {
      setIsReload((prev) => !prev);
    }
  };

  const getStatusTag = (status: string) => {
    switch (status.toLocaleLowerCase()) {
      case "pending":
        return <Tag color="orange">Pending</Tag>;
      case "accepted":
        return <Tag color="green">Accepted</Tag>;
      case "inactive":
        return <Tag color="blue">Inactive</Tag>;
      case "rejected":
        return <Tag color="red">Rejected</Tag>;
      case "approved":
        return <Tag color="green">APPROVED</Tag>;
      case "active":
        return <Tag color="green-inverse">ACTIVED</Tag>;
      default:
        return <Tag color="blue">{status}</Tag>;
    }
  };

  const columns: Column[] = [
    {
      title: "Tên giảng viên",
      dataIndex: ["creator", "fullName"],
      key: "name",
      render: (_, e) => e?.creator?.fullName,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Assets",
      dataIndex: "files",
      key: "files",
      render: (assets: { name: string; content: string }[]) => (
        <div className="flex justify-center items-center gap-2">
          {assets?.map((asset, index) => (
            <Button
              key={index}
              type="link"
              onClick={() => downloadBase64File(asset.content, asset.name)}
            >
              {asset.name}
            </Button>
          ))}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => getStatusTag(status), // Render status as a Tag
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      render: (id: string, record: any) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            type="primary"
            onClick={() => handleAccept(id, record.reloadData)}
            loading={loading}
          >
            Accept
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => handleReject(id, record.reloadData)}
            loading={loading}
          >
            Reject
          </Button>
        </div>
      ),
    },
  ];

  const formItems = (
    <>
      <Form.Item label="Enter name" name={"name"}>
        <Input />
      </Form.Item>
      <Form.Item label="Enter description" name={"description"}>
        <TextArea />
      </Form.Item>
    </>
  );

  return (
    <div>
      <DashboardTemplate
        isReload={isReload}
        isCustom
        apiURI={TOPIC_API.TOPIC}
        formItems={formItems}
        title={title}
        isRequest
        columns={columns}
      />
    </div>
  );
}

export default ManageTopic;
