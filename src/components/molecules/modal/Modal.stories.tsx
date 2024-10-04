import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { CustomModal } from "./Modal";

const meta = {
  title: "Molecules/Modal",
  component: CustomModal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof CustomModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    header: "Cập nhật lịch trống trong tuần",
    body: "Body",
    footer: "Footer",
    isOpen: true,
  },
};
export const HeaderDetail: Story = {
  args: {
    header: "Thông tin cuộc họp",
    headerDetail: "14-10-2024",
    body: "Body",
    footer: "Footer",
    isOpen: true,
  },
};
