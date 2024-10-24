import { Form, Input, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import DashboardTemplate, {
  Column,
} from "../../../components/templates/dashboard-template";
import { TOPIC_API } from "../../../constants/endpoints";
import { downloadBase64File } from "../../../utils/dowloadBase64File";

function ManageTopic() {
  const title = "Topic";
  const columns: Column[] = [
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
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      render: (id: string, record: any) => (
        <div style={{ display: "flex", gap: "10px" }}>
          <Button type="primary" onClick={() => handleAccept(id)}>
            Accept
          </Button>
          <Button type="primary" danger onClick={() => handleReject(id)}>
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
        isCustom
        apiURI={TOPIC_API.TOPIC}
        formItems={formItems}
        title={title}
        columns={columns}
      />
    </div>
  );
}

export default ManageTopic;
