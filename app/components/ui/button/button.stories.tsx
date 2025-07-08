import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { expect } from 'storybook/test';

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button',
  },
  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'Button' });

    await userEvent.click(button);
  },
};

export const Disabled: Story = {
  args: {
    children: 'Button',
    disabled: true,
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole('button', { name: 'Button' });
    expect(button).toBeDisabled();
  },
};
