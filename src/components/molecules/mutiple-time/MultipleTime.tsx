import { Button, Form, Space, TimePicker } from "antd";
import { MdOutlineCancel } from "react-icons/md";

export interface MultipleTimeProps {
  label: string;
  warning?: string[]; // Add warning prop to accept the array of warning messages
}

/** Primary UI component for user interaction */
export const MultipleTime = ({
  label,
  warning = [],
  ...props
}: MultipleTimeProps) => {
  return (
    <>
      <Form.Item label={label} key={label} className="multiple-time">
        <Form.List name={`time_${label}`}>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} align="baseline">
                  <Form.Item {...restField} label="Từ" required={false}>
                    <Form.Item
                      name={[name, "fromHour"]}
                      noStyle
                      rules={[
                        { required: true, message: "Please select the hour" },
                      ]}
                    >
                      <TimePicker format="HH" placeholder="Hour" />
                    </Form.Item>
                    <span className="mx-2 my-0">:</span>
                    <Form.Item
                      name={[name, "fromMinute"]}
                      noStyle
                      rules={[
                        { required: true, message: "Please select the minute" },
                      ]}
                    >
                      <TimePicker
                        format="mm"
                        placeholder="Minute"
                        minuteStep={30}
                      />
                    </Form.Item>
                  </Form.Item>
                  <Form.Item {...restField} label="Đến" required={false}>
                    <Form.Item
                      name={[name, "toHour"]}
                      noStyle
                      rules={[
                        { required: true, message: "Please select the hour" },
                      ]}
                    >
                      <TimePicker format="HH" placeholder="Hour" />
                    </Form.Item>
                    <span className="mx-2 my-0">:</span>
                    <Form.Item
                      name={[name, "toMinute"]}
                      noStyle
                      rules={[
                        { required: true, message: "Please select the minute" },
                      ]}
                    >
                      <TimePicker
                        format="mm"
                        placeholder="Minute"
                        minuteStep={30}
                      />
                    </Form.Item>
                  </Form.Item>

                  <MdOutlineCancel
                    onClick={() => remove(name)}
                    size={18}
                    className="mb-5 cursor-pointer"
                  />
                </Space>
              ))}

              {/* Display warning message for this day */}
              {warning.length > 0 && (
                <div className="warning-message">
                  {warning.map((msg, index) => (
                    <>
                      <p key={index} style={{ color: "red" }}>
                        {msg}
                      </p>
                    </>
                  ))}
                </div>
              )}

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
    </>
  );
};
