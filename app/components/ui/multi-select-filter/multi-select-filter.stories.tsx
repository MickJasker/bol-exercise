import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { MultiSelectFilter } from "./multi-select-filter";

const meta: Meta<typeof MultiSelectFilter> = {
  title: "UI/MultiSelectFilter",
  component: MultiSelectFilter,
  tags: ["autodocs"],
};

export default meta;

const sampleOptions: {
  value: string;
  label: string;
}[] = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  
];

export const Default: StoryObj<typeof MultiSelectFilter> = {
  render: (args) => <MultiSelectFilter {...args} />,
  args: {
    label: "Fruits",
    options: sampleOptions,
    applyButtonLabel: "Apply",
    className: "max-w-[300px]",
    onSubmit: (e) => {
      e.preventDefault();
    }
  },
};

export const WithApplyHandler: StoryObj<typeof MultiSelectFilter> = {
  render: (args) => {
    const [selected, setSelected] = useState<string[]>([]);
    return (
      <div>
        <MultiSelectFilter
          {...args}
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const selectedOptions = formData.getAll("options") as string[];
            setSelected(selectedOptions);
          }}
        />
        <div style={{ marginTop: 16 }}>
          <strong>Selected:</strong> {selected.join(", ")}
        </div>
      </div>
    );
  },
  args: {
    label: "Fruits",
    options: sampleOptions,
    applyButtonLabel: "Apply",
    className: "max-w-[300px]",
    onSubmit: (e) => {
      e.preventDefault();
    }
  },
};

export const NoOptions: StoryObj<typeof MultiSelectFilter> = {
  render: (args) => <MultiSelectFilter {...args} />,
  args: {
    label: "Empty Options",
    options: [],
    applyButtonLabel: "Apply",
    className: "max-w-[300px]",
    onSubmit: (e) => {
      e.preventDefault();
    }
  },
};