import type { Meta, StoryObj } from "@storybook/react";
import Account from "./Account";

const meta = {
  title: "Molecules/Account",
  component: Account,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Account>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    subTitle: "Xin Chào Giảng Viên!",
    title: "Trương Gia Bình",
  },
};
