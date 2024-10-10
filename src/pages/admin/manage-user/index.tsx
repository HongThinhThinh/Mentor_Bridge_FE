import DashboardTemplate, {
  Column,
} from "../../../components/templates/dashboard-template";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

function ManageUser() {
  const title = "user";
  const columns: Column[] = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
      render: (_, __, index) => <span>{index + 1}</span>,
    },
    {
      title: "FullName",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "StudentCode",
      dataIndex: "studentCode",
      key: "studentCode",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   key: "phone",
    // },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
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
        apiURI="admin"
        formItems={formItems}
        title={title}
        columns={columns}
      />
    </div>
  );
}

export default ManageUser;
