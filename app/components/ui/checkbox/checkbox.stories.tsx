import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  args: {
    disabled: false,
    'aria-label': 'Checkbox',
  },
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onCheckedChange={(value) =>
          setChecked(value !== 'indeterminate' ? value : false)
        }
      />
    );
  },
  args: {
    checked: false,
  },
};

export const Checked: Story = {
  render: (args) => {
    return <Checkbox {...args} />;
  },
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  render: (args) => <Checkbox {...args} disabled />,
  args: {
    checked: false,
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked || false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onCheckedChange={(value) =>
          setChecked(value !== 'indeterminate' ? value : false)
        }
        label={{
          children: 'Checkbox with Label',
        }}
      />
    );
  },
  args: {
    checked: false,
  },
};
