import type { Meta, StoryObj } from "@storybook/react";
import { MultipleTime } from "./MultipleTime";

const meta = {
  title: "Molecules/MultipleTime",
  component: MultipleTime,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof MultipleTime>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "Thứ 2"
  },
};
