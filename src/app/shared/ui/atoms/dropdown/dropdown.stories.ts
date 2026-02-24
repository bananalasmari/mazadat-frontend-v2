import type { Meta, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { DropdownComponent, DropdownOption } from './dropdown.component';

const defaultOptions: DropdownOption[] = [
  { label: 'Last 7 days', value: '7' },
  { label: 'Last 30 days', value: '30' },
  { label: 'Last 90 days', value: '90' },
];

const meta: Meta<DropdownComponent> = {
  title: 'Shared/Atoms/Dropdown',
  component: DropdownComponent,
  tags: ['autodocs'],
  args: {
    options: defaultOptions,
    placeholder: 'Select range',
    size: 'md',
    disabled: false,
    showClear: false,
    extraClass: '',
    ariaLabel: null,
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
    options: { control: 'object' },
    placeholder: { control: 'text' },
    value: { control: 'text', description: 'Selected value (e.g. "30")' },
    disabled: { control: 'boolean' },
    showClear: { control: 'boolean' },
    valueChange: { action: 'valueChange' },
  },
  render: (args) => ({
    props: { ...args, selected: args.value ?? null },
    imports: [FormsModule, DropdownComponent],
    template: `
      <div style="min-width: 200px">
        <app-dropdown
          [options]="options"
          [placeholder]="placeholder"
          [size]="size"
          [disabled]="disabled"
          [showClear]="showClear"
          [ariaLabel]="ariaLabel ?? undefined"
          [extraClass]="extraClass"
          [value]="selected"
          (valueChange)="selected = $event; valueChange($event)"
        />
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<DropdownComponent>;

export const Default: Story = {};

export const WithPlaceholder: Story = {
  args: { placeholder: 'Choose an option' },
};

export const Small: Story = {
  args: { size: 'sm', placeholder: 'Last 30 days' },
};

export const WithValue: Story = {
  args: { value: '30', placeholder: 'Select range' },
  render: (args) => ({
    props: { ...args, selected: '30' },
    imports: [FormsModule, DropdownComponent],
    template: `
      <div style="min-width: 200px">
        <app-dropdown
          [options]="options"
          [placeholder]="placeholder"
          [size]="size"
          [value]="selected"
          (valueChange)="selected = $event"
        />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: { disabled: true, value: '30' },
  render: (args) => ({
    props: { ...args, selected: '30' },
    imports: [FormsModule, DropdownComponent],
    template: `
      <div style="min-width: 200px">
        <app-dropdown
          [options]="options"
          [placeholder]="placeholder"
          [disabled]="true"
          [value]="selected"
        />
      </div>
    `,
  }),
};

export const Clearable: Story = {
  args: { showClear: true, value: '30' },
  render: (args) => ({
    props: { ...args, selected: '30' },
    imports: [FormsModule, DropdownComponent],
    template: `
      <div style="min-width: 200px">
        <app-dropdown
          [options]="options"
          [placeholder]="placeholder"
          [showClear]="true"
          [value]="selected"
          (valueChange)="selected = $event"
        />
      </div>
    `,
  }),
};
