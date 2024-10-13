import { DatePicker, Form, Input, Tag } from "antd";
import DashboardTemplate, {
  Column,
} from "../../../components/templates/dashboard-template";
import { SEMESTER } from "../../../constants/endpoints";

const ManageSemester: React.FC = () => {
  const title = "Semester";

  const columns: Column[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date From",
      dataIndex: "dateFrom",
      key: "dateFrom",
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "Date To",
      dataIndex: "dateTo",
      key: "dateTo",
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      ),
    },
  ];

  const getStatusColor = (status: string): "red" | "green" | "yellow" => {
    switch (status) {
      case "UPCOMING":
        return "yellow";
      case "ACTIVE":
        return "green";
      default:
        return "red";
    }
  };

  const formItems = (
    <>
      <Form.Item
        label="Enter Code"
        name="code"
        rules={[{ required: true, message: "Please enter the code!" }]}
      >
        <Input placeholder="Enter code" />
      </Form.Item>

      <Form.Item
        label="Enter Name"
        name="name"
        rules={[{ required: true, message: "Please enter the name!" }]}
      >
        <Input placeholder="Enter name" />
      </Form.Item>

      <Form.Item
        label="Select Date From"
        name="dateFrom"
        rules={[{ required: true, message: "Please select the start date!" }]}
      >
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Select Date From"
        />
      </Form.Item>

      <Form.Item
        label="Select Date To"
        name="dateTo"
        rules={[{ required: true, message: "Please select the end date!" }]}
      >
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="Select Date To"
        />
      </Form.Item>
    </>
  );

  return (
    <DashboardTemplate
      apiURI={SEMESTER}
      formItems={formItems}
      title={title}
      columns={columns}
    />
  );
};

export default ManageSemester;
