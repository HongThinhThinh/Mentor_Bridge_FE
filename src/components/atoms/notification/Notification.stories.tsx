import { BellOutlined } from "@ant-design/icons";
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
  },
  render: (args: NotificationProps) => (
    <Notification {...args}>
      <div className="bg-shade-400 text-shade-800 h-14 w-14 flex justify-center items-center rounded-full">
        <BellOutlined style={{ fontSize: 26 }} />
      </div>
    </Notification>
  ),
};
