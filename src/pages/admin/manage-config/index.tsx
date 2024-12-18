import { Form, InputNumber } from "antd";
import DashboardTemplate from "../../../components/templates/dashboard-template";
import { CONFIG_API } from "../../../constants/endpoints";

const ManageConfig: React.FC = () => {
  const title = "Config";

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Số giờ tối thiếu của giảng viên mỗi kỳ",
      dataIndex: "minimumHours",
      key: "minimumHours",
    },
    {
      title: "Thời gian tối thiểu cho từng slots",
      dataIndex: "minTimeSlotDuration",
      key: "minTimeSlotDuration",
      render: (value: string) => value || "00:00",
    },
    {
      title: "Tổng số điểm của mỗi nhóm",
      dataIndex: "totalTeamPoints",
      key: "totalTeamPoints",
    },
    {
      title: "Tổng số điểm của sinh viên",
      dataIndex: "totalStudentPoints",
      key: "totalStudentPoints",
    },
    {
      title: "Điểm bị trừ ",
      dataIndex: "pointsDeducted",
      key: "pointsDeducted",
    },
  ];

  const formItems = (
    <>
      <Form.Item
        label="Số giờ tối thiếu của giảng viên mỗi kỳ"
        name="minimumHours"
        rules={[{ required: true, message: "Please enter minimum hours" }]}
      >
        <InputNumber min={1} placeholder="Enter minimum hours" />
      </Form.Item>

      <Form.Item
        label="Thời gian tối thiểu cho từng slots (Phút)"
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
          placeholder="Vui lòng nhập thời gian  "
          formatter={(value) => `${value} p`}
          parser={(value) => value?.replace(" p", "")}
        />
      </Form.Item>

      <Form.Item
        label="Tổng số điểm của mỗi nhóm "
        name="totalTeamPoints"
        rules={[
          {
            required: true,
            message: "Vui lòng  nhập tổng số điểm của mỗi nhóm",
          },
        ]}
      >
        <InputNumber min={0} placeholder="tổng số điểm của mỗi nhóm" />
      </Form.Item>

      <Form.Item
        label="Tổng số điểm của mỗi sinh viên"
        name="totalStudentPoints"
        rules={[
          {
            required: true,
            message: "Vui lòng nhập tổng số điểm của mỗi sinh viên",
          },
        ]}
      >
        <InputNumber min={0} placeholder="Enter total points" />
      </Form.Item>

      <Form.Item
        label="Điểm bị trừ cho mỗi bookings"
        name="pointsDeducted"
        rules={[{ required: true, message: "Please enter points deducted" }]}
      >
        <InputNumber min={0} placeholder="Enter points deducted" />
      </Form.Item>
    </>
  );

  return (
    <DashboardTemplate
      isNotDelete
      apiURI={CONFIG_API.CONFIG}
      formItems={formItems}
      title={title}
      columns={columns}
    />
  );
};

export default ManageConfig;
