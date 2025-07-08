import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './label';
import { expect } from 'storybook/test';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
  args: {
    children: 'Label text',
  },
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  args: {
    children: 'Default Label',
  },
  play: async ({ canvas }) => {
    const label = canvas.getByText('Default Label');
    expect(label).toBeInTheDocument();
  },
};

export const WithHtmlFor: Story = {
  args: {
    children: 'Label for input',
    htmlFor: 'input-id',
  },
  play: async ({ canvas }) => {
    const label = canvas.getByText('Label for input');
    expect(label).toBeInTheDocument();
  },
};

export const CustomClass: Story = {
  args: {
    children: 'Custom Styled Label',
    className: 'text-red-500',
  },
  play: async ({ canvas }) => {
    const label = canvas.getByText('Custom Styled Label');
    expect(label).toHaveClass('text-red-500');
  },
};
