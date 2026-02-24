import type { Meta, StoryObj } from '@storybook/angular';
import { AlertComponent } from './alert.component';

const meta: Meta<AlertComponent> = {
  title: 'Shared/Atoms/Alert',
  component: AlertComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Reusable alert/message built on PrimeNG Message. Use for success, info, warning, error, and secondary/contrast inline messages.',
      },
    },
  },
  args: {
    text: 'This is the message content.',
    severity: 'info',
    icon: null,
    closable: false,
    life: 0,
    extraClass: '',
    visible: true,
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'info', 'warn', 'error', 'secondary', 'contrast'],
      description: 'Alert type and styling',
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'simple', 'text'],
      description: 'Display style',
    },
    size: {
      control: 'select',
      options: [undefined, 'small', 'large'],
    },
    icon: {
      control: 'text',
      description: 'PrimeIcons class (e.g. "pi pi-send"). Leave empty for default per severity.',
    },
    text: { control: 'text' },
    closable: { control: 'boolean' },
    life: { control: 'number', description: 'Auto-close after ms (0 = no auto-close)' },
    visible: { control: 'boolean' },
    closed: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<AlertComponent>;

export const Success: Story = {
  args: { severity: 'success', text: 'Operation completed successfully.' },
};

export const Info: Story = {
  args: { severity: 'info', text: 'Here is some useful information.' },
};

export const Warn: Story = {
  args: { severity: 'warn', text: 'Please review before continuing.' },
};

export const Error: Story = {
  args: { severity: 'error', text: 'Something went wrong. Please try again.' },
};

export const Secondary: Story = {
  args: { severity: 'secondary', text: 'Secondary message.' },
};

export const Contrast: Story = {
  args: { severity: 'contrast', text: 'Contrast message.' },
};

export const Outlined: Story = {
  args: {
    severity: 'info',
    variant: 'outlined',
    text: 'Outlined variant with border and no fill.',
  },
};

export const Simple: Story = {
  args: {
    severity: 'info',
    variant: 'simple',
    text: 'Simple variant without border or background.',
  },
};

export const Closable: Story = {
  args: {
    severity: 'info',
    text: 'You can close this message.',
    closable: true,
  },
};

export const Small: Story = {
  args: { severity: 'info', size: 'small', text: 'Small size message.' },
};

export const Large: Story = {
  args: { severity: 'info', size: 'large', text: 'Large size message.' },
};

