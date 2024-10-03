import { BellOutlined, SettingOutlined } from "@ant-design/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Notification, NotificationProps } from "./Notification";

const meta = {
  title: "Atoms/Notification",
  component: Notification,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Notification>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    count: 5,
    placement: "bottomRight",
    items: [
      {
        key: "1",
        label: "My Account",
        disabled: true,
      },
      {
        type: "divider",
      },
      {
        key: "2",
        label: "Profile",
      },
      {
        key: "3",
        label: "Billing",
      },
      {
        key: "4",
        label: "Settings",
        icon: <SettingOutlined />,
      },
    ],
  },
  render: (args: NotificationProps) => (
    <Notification {...args}>
      <div className="bg-shade-400 cursor-pointer text-shade-800 h-14 w-14 flex justify-center items-center rounded-full">
        <BellOutlined style={{ fontSize: 26 }} />
      </div>
    </Notification>
  ),
};
