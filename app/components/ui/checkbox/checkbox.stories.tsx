import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Checkbox } from './checkbox';
import { expect } from 'storybook/test';

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
    name: 'checkbox',
  },
  play: async ({ canvas, userEvent }) => {
    const checkbox = canvas.getByRole('checkbox', { name: 'Checkbox' });
    
    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
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
  play: async ({ canvas }) => {
    const checkbox = canvas.getByRole('checkbox', { name: 'Checkbox' });
    expect(checkbox).toBeDisabled();
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
  play: async ({ canvas, userEvent }) => {
    const checkboxLabel = canvas.getByLabelText('Checkbox with Label');
    
    expect(checkboxLabel).not.toBeChecked();
    await userEvent.click(checkboxLabel);
    expect(checkboxLabel).toBeChecked();
  },
};
