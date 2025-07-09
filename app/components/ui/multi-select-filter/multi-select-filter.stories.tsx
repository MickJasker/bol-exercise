import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MultiSelectFilter } from './multi-select-filter';
import { expect } from 'storybook/test';

const meta: Meta<typeof MultiSelectFilter> = {
  title: 'UI/MultiSelectFilter',
  component: MultiSelectFilter,
  tags: ['autodocs'],
};

export default meta;

const sampleOptions: {
  value: string;
  label: string;
}[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig', label: 'Fig' },
  { value: 'grape', label: 'Grape' },
  { value: 'honeydew', label: 'Honeydew' },
  { value: 'kiwi', label: 'Kiwi' },
  { value: 'lemon', label: 'Lemon' },
  { value: 'mango', label: 'Mango' },
  { value: 'nectarine', label: 'Nectarine' },
  { value: 'orange', label: 'Orange' },
  { value: 'papaya', label: 'Papaya' },
  { value: 'quince', label: 'Quince' },
  { value: 'raspberry', label: 'Raspberry' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'tangerine', label: 'Tangerine' },
];

export const Default: StoryObj<typeof MultiSelectFilter> = {
  render: (args) => <MultiSelectFilter {...args} />,
  args: {
    label: 'Fruits',
    options: sampleOptions,
    applyButtonLabel: 'Apply',
    className: 'max-w-[300px]',
    storeId: 'fruits',
    onSubmit: (e) => {
      e.preventDefault();
    },
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox');
    expect(input).toHaveValue('');
    expect(input).toHaveAttribute('placeholder', 'Zoek op...');

    await userEvent.type(input, 'Fig');

    const option = canvas.getByText('Fig');
    expect(option).toBeInTheDocument();

    await userEvent.click(option);

    const applyButton = canvas.getByRole('button', { name: 'Apply' });
    await userEvent.click(applyButton);

    expect(canvas.getByText('Fig')).toBeInTheDocument();
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
            const selectedOptions = formData.getAll('options') as string[];
            setSelected(selectedOptions);
          }}
        />
        <div style={{ marginTop: 16 }}>
          <strong>Selected:</strong> {selected.join(', ')}
        </div>
      </div>
    );
  },
  args: {
    label: 'Fruits',
    options: sampleOptions,
    applyButtonLabel: 'Apply',
    className: 'max-w-[300px]',
    storeId: 'fruits',
    onSubmit: (e) => {
      e.preventDefault();
    },
  },
};

export const NoOptions: StoryObj<typeof MultiSelectFilter> = {
  render: (args) => <MultiSelectFilter {...args} />,
  args: {
    label: 'Empty Options',
    options: [],
    applyButtonLabel: 'Apply',
    className: 'max-w-[300px]',
    storeId: 'fruits',
    onSubmit: (e) => {
      e.preventDefault();
    },
  },
};
