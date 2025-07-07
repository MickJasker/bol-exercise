import type { Meta, StoryObj } from '@storybook/react-vite';
import { Input } from './input';
import { SearchIcon } from '~/components/icons/search';

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

export const Default: Story = {};

export const WithValue: Story = {
  args: {
    value: 'Hello world',
    readOnly: true,
  },
};

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
};

export const Invalid: Story = {
  args: {
    'aria-invalid': true,
    placeholder: 'Invalid input',
  },
};

export const Search: Story = {
  args: {
    type: 'search',
    placeholder: 'Search...',
    "aria-label": 'Search',
    name: 'search',
    icon: <SearchIcon />,
  },
}