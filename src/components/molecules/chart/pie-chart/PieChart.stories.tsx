import type { Meta, StoryObj } from "@storybook/react";
import { PieChart, PieChartProps } from "./PieChart";

const meta = {
  title: "Molecules/PieChart",
  component: PieChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof PieChart>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    data: [
      {
        id: "bad",
        label: "bad",
        value: 16,
      },
      {
        id: "good",
        label: "good",
        value: 177,
      },
    ],
  },
  render: (args: PieChartProps) => (
    <div className="h-72 w-72">
      <PieChart {...args}></PieChart>
    </div>
  ),
};
