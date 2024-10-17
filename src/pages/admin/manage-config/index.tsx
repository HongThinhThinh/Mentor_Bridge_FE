import { Form, InputNumber } from "antd";
import DashboardTemplate from "../../../components/templates/dashboard-template";
import { CONFIG_API, SEMESTER_API } from "../../../constants/endpoints";

const ManageConfig: React.FC = () => {
  const title = "Config";

  const columns = [
    {
      title: "Minimum Hours",
      dataIndex: "minimumHours",
      key: "minimumHours",
    },
    {
      title: "Minimum Time Slot Duration (Minutes)",
      dataIndex: "minTimeSlotDuration",
      key: "minTimeSlotDuration",
    },
  ];

  const formItems = (
    <>
      <Form.Item
        label="Minimum Hours For Semester"
        name="minimumHours"
        rules={[{ required: true, message: "Please enter minimum hours" }]}
      >
        <InputNumber min={1} placeholder="Enter minimum hours" />
      </Form.Item>

      {/* Time Slot Duration Input with 15-min step */}
      <Form.Item
        label="Minimum Time Slot Duration (Minutes)"
        name="minTimeSlotDuration"
        rules={[
          {
            required: true,
            message: "Please enter a valid time duration in 15-minute steps",
          },
        ]}
      >
        <InputNumber
          defaultValue={15}
          min={15}
          step={15}
          className="w-[170px]"
          placeholder="Enter duration in minutes"
          formatter={(value) => `${value} minutes`}
        />
      </Form.Item>
    </>
  );

  return (
    <DashboardTemplate
      apiURI={CONFIG_API.CONFIG}
      formItems={formItems}
      title={title}
      columns={columns}
    />
  );
};

export default ManageConfig;
