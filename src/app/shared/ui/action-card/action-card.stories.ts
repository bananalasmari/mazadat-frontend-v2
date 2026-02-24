import type { Meta, StoryObj } from '@storybook/angular';
import { ActionCardComponent } from './action-card.component';

const meta: Meta<ActionCardComponent> = {
  title: 'Shared/UI/Action Card',
  component: ActionCardComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Reusable card with icon, title, description, and primary action button. Suited for RTL (e.g. Arabic) and LTR. Icon uses PrimeIcons class by default (e.g. `pi pi-plus`).',
      },
    },
    layout: 'centered',
  },
  args: {
    title: 'إضافة مركبة',
    description:
      'قم بإدراج مركبتك على المنصة لنتمكن من عرضها في المزاد.',
    buttonLabel: 'إضافة المركبة',
    icon: 'pi pi-plus',
  },
  argTypes: {
    title: { control: 'text', description: 'Card title' },
    description: { control: 'text', description: 'Description text below the title' },
    buttonLabel: { control: 'text', description: 'Primary button label' },
    icon: {
      control: 'text',
      description: 'PrimeIcons CSS class for the icon (e.g. pi pi-plus, pi pi-car)',
    },
    buttonClicked: { action: 'buttonClicked' },
  },
};

export default meta;

type Story = StoryObj<ActionCardComponent>;

/** Default: Add Vehicle card (Arabic, RTL-friendly) */
export const AddVehicle: Story = {};

/** English variant */
export const AddVehicleEnglish: Story = {
  args: {
    title: 'Add Vehicle',
    description:
      'Add your vehicle to the platform so we can list it in the auction.',
    buttonLabel: 'Add Vehicle',
    icon: 'pi pi-plus',
  },
};

/** Different icon (car) */
export const WithCarIcon: Story = {
  args: {
    title: 'إضافة مركبة',
    description: 'قم بإدراج مركبتك على المنصة لنتمكن من عرضها في المزاد.',
    buttonLabel: 'إضافة المركبة',
    icon: 'pi pi-car',
  },
};

/** Another action: Schedule auction */
export const ScheduleAuction: Story = {
  args: {
    title: 'جدولة مزاد',
    description: 'حدد موعداً لمزادك واختر نوع المزاد والمركبات المعروضة.',
    buttonLabel: 'جدولة المزاد',
    icon: 'pi pi-calendar',
  },
};
