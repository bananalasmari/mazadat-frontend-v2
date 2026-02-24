import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Shared/Atoms/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Icons are rendered via a CSS class list.\n\n- PrimeIcons: `pi pi-check`\n- Font Awesome: `fa-solid fa-user` (requires Font Awesome CSS to be loaded in the app)',
      },
    },
  },
  args: {
    label: 'Button',
    variant: 'primary',
    size: 'lg',
    disabled: false,
    loading: false,
    extraClass: '',
    icon: null,
    iconPosition: 'start',
    iconOnly: false,
    ariaLabel: null,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'outline', 'gray', 'success', 'danger', 'outline-success', 'outline-danger'],
    },
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    icon: {
      control: 'text',
      description: 'CSS class list. Examples: "pi pi-check" or "fa-solid fa-user"',
    },
    iconPosition: { control: 'radio', options: ['start', 'end'] },
    iconOnly: { control: 'boolean' },
    ariaLabel: { control: 'text' },
    loading: { control: 'boolean' },
    extraClass: { control: 'text', description: 'Extra Bootstrap/utility classes applied to the <button>.' },
    clicked: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Outline: Story = {
  args: { variant: 'outline' },
};

export const Gray: Story = {
  args: { variant: 'gray', label: 'Gray' },
};

export const Success: Story = {
  args: { variant: 'success', label: 'Accept' },
};

export const Danger: Story = {
  args: { variant: 'danger', label: 'Reject' },
};

export const OutlineSuccess: Story = {
  args: { variant: 'outline-success', label: 'Accept' },
};

export const OutlineDanger: Story = {
  args: { variant: 'outline-danger', label: 'Reject' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Loading: Story = {
  args: { loading: true, label: 'Loading...', extraClass: 'justify-content-center' },
};

export const PrimeIconStart: Story = {
  args: { icon: 'pi pi-check', label: 'Save' },
};

export const PrimeIconEnd: Story = {
  args: { icon: 'pi pi-arrow-right', iconPosition: 'end', label: 'Next' },
};

export const IconOnly: Story = {
  args: { icon: 'pi pi-search', iconOnly: true, ariaLabel: 'Search' },
};

export const FontAwesomeIcon: Story = {
  args: { icon: 'fa-solid fa-user', label: 'Profile' },
};

