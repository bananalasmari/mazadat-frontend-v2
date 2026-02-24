import type { Meta, StoryObj } from '@storybook/angular';
import { TagComponent } from './tag.component';

const meta: Meta<TagComponent> = {
  title: 'Shared/Atoms/Tag',
  component: TagComponent,
  tags: ['autodocs'],
  args: {
    value: 'Tag',
    severity: 'secondary',
    icon: null,
    rounded: true,
    extraClass: '',
  },
  argTypes: {
    value: { control: 'text' },
    severity: {
      control: 'radio',
      options: ['success', 'secondary', 'info', 'warn', 'danger', 'contrast'],
    },
    icon: { control: 'text', description: 'PrimeIcons class, e.g. pi pi-star-fill' },
    rounded: { control: 'boolean' },
    extraClass: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<TagComponent>;

export const Default: Story = {};

export const Danger: Story = {
  args: { value: 'Important', severity: 'danger' },
};

export const WithIcon: Story = {
  args: { value: 'Important', severity: 'danger', icon: 'pi pi-star-fill' },
};

export const Success: Story = {
  args: { value: 'Active', severity: 'success' },
};

export const Warn: Story = {
  args: { value: 'Pending', severity: 'warn' },
};

export const Info: Story = {
  args: { value: 'Info', severity: 'info' },
};

export const NotRounded: Story = {
  args: { value: 'Label', severity: 'secondary', rounded: false },
};
