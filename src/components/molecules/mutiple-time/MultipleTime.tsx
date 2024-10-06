import { Button, Form, Space, TimePicker } from "antd";
import { MdOutlineCancel } from "react-icons/md";

export interface MultipleTimeProps {
  label: string;
}

/** Primary UI component for user interaction */
export const MultipleTime = ({ label, ...props }: MultipleTimeProps) => {
  return (
    <>
      <Form.Item className="multiple-time" key={label}>
        <Form.Item label={label} key={label}>
          <Form.List name={`time_${label}`}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} align="baseline">
                    <Form.Item
                      {...restField}
                      rules={[
                        { required: true, message: "Missing start time" },
                      ]}
                      label="Từ"
                      name={[name, "start"]}
                    >
                      <TimePicker format="HH" placeholder="07" />
                      <TimePicker format="mm" placeholder="30" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      label="Đến"
                      name={[name, "end"]}
                      rules={[
                        { required: true, message: "Missing finish time" },
                      ]}
                    >
                      <TimePicker format="HH" placeholder="09" />
                      <TimePicker format="mm" placeholder="00" />
                    </Form.Item>

                    <MdOutlineCancel
                      onClick={() => remove(name)}
                      size={18}
                      style={{ cursor: "pointer", marginBottom: "23px" }}
                    />
                  </Space>
                ))}
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  style={{ width: "514px", height: "40px" }}
                >
                  Thêm khung giờ rảnh trong ngày +
                </Button>
              </>
            )}
          </Form.List>
        </Form.Item>
      </Form.Item>
    </>
  );
};
