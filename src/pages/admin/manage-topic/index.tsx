import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import DashboardTemplate, {
  Column,
} from "../../../components/templates/dashboard-template";

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
        isImport
        apiURI="topic"
        formItems={formItems}
        title={title}
        columns={columns}
      />
    </div>
  );
}

export default ManageTopic;
