import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';
import { SearchIcon } from '~/components/icons/search';
import { expect } from 'storybook/test';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'Type something...',
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox');
    expect(input).toHaveValue('');
    expect(input).toHaveAttribute('placeholder', 'Type something...');
    await userEvent.type(input, 'Hello world');
    expect(input).toHaveValue('Hello world');
  }
};

export const WithValue: Story = {
  args: {
    defaultValue: 'Hello world',
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox');
    expect(input).toHaveValue('Hello world');
    await userEvent.clear(input);
    expect(input).toHaveValue('');
    await userEvent.type(input, 'Hello world');
    expect(input).toHaveValue('Hello world');
  }
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox');
    expect(input).toBeDisabled();
  }
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    placeholder: 'Invalid input',
  },
  play: async ({ canvas }) => {
    const input = canvas.getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  }
};

export const Search: Story = {
  args: {
    placeholder: 'Search...',
    "aria-label": 'Search',
    name: 'search',
    icon: <SearchIcon />,
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole('textbox');
    await userEvent.type(input, 'Hello world');
    expect(input).toHaveValue('Hello world');
  }
}