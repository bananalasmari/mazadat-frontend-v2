import type { Meta, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './input.component';

const meta: Meta<InputComponent & { value: string }> = {
  title: 'Shared/Atoms/Input',
  component: InputComponent,
  tags: ['autodocs'],
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    type: 'text',
    size: 'lg',
    required: false,
    readonly: false,
    disabled: false,
    helpText: 'This will be used to sign in.',
    error: null,
    errorIcon: 'pi pi-times-circle',
    iconLeft: 'pi pi-user',
    iconRight: null,
    maxlength: null as number | null,
    inputmode: null as string | null,
    containerClass: 'mb-3',
    inputClass: '',
    value: '',
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    type: { control: 'text' },
    iconLeft: { control: 'text' },
    iconRight: { control: 'text' },
    error: { control: 'text' },
    errorIcon: { control: 'text' },
    helpText: { control: 'text' },
    maxlength: { control: 'number' },
    inputmode: { control: 'text' },
    value: { control: 'text' },
  },
  render: (args) => ({
    props: args,
    imports: [FormsModule, InputComponent],
    template: `
      <div style="max-width: 420px">
        <app-input
          [label]="label"
          [placeholder]="placeholder"
          [type]="type"
          [size]="size"
          [required]="required"
          [readonly]="readonly"
          [disabled]="disabled"
          [helpText]="helpText"
          [error]="error"
          [errorIcon]="errorIcon"
          [iconLeft]="iconLeft"
          [iconRight]="iconRight"
          [maxlength]="maxlength"
          [inputmode]="inputmode"
          [containerClass]="containerClass"
          [inputClass]="inputClass"
          [(ngModel)]="value"
          name="demo"
        />
        <div class="small text-muted">Value: {{ value }}</div>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<InputComponent & { value: string }>;

export const Default: Story = {};

export const NoIcons: Story = {
  args: { iconLeft: null, iconRight: null },
};

export const WithError: Story = {
  args: { error: 'Username is required', helpText: null, value: '', iconLeft: null, iconRight: null },
  name: 'With error (validation + icon)',
};

export const ValidationFormatError: Story = {
  args: {
    label: 'Email or ID',
    placeholder: 'Email or 9-digit ID',
    error: 'Enter a valid email or 9-digit ID.',
    errorIcon: 'pi pi-times-circle',
    helpText: null,
    value: 'testadmin',
    iconLeft: null,
    iconRight: null,
    maxlength: 9,
  },
  name: 'Validation – invalid format',
};

export const Disabled: Story = {
  args: { disabled: true, value: 'readonly-user' },
};

