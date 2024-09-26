import type { Meta, StoryObj } from "@storybook/react";

import { TextField } from "./TextField";


const meta = {
  title: "Atoms/TextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
   
  },
  args: {  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    placeholder: "Placeholder"
  },
};
