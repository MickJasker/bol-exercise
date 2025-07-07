import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './label';

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
};

export const WithHtmlFor: Story = {
  args: {
    children: 'Label for input',
    htmlFor: 'input-id',
  },
};

export const CustomClass: Story = {
  args: {
    children: 'Custom Styled Label',
    className: 'text-red-500',
  },
};