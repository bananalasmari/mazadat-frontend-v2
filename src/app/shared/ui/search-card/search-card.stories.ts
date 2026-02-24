import type { Meta, StoryObj } from '@storybook/angular';
import { SearchCardComponent } from './search-card.component';

const meta: Meta<SearchCardComponent> = {
  title: 'Shared/UI/Search Card',
  component: SearchCardComponent,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Reusable search card with Bootstrap. Title, count, search bar, export. RTL-friendly.',
      },
    },
  },
  args: {
    title: 'جميع المركبات',
    countText: '8 مركبة متاحة',
    searchPlaceholder: 'ابحث عن مركبة بالاسم أو الرقم...',
    exportLabel: 'تصدير تقرير',
    viewMode: 'list',
  },
  argTypes: {
    title: { control: 'text' },
    countText: { control: 'text' },
    searchPlaceholder: { control: 'text' },
    exportLabel: { control: 'text' },
    viewMode: { control: 'radio', options: ['grid', 'list'] },
    searchSubmit: { action: 'searchSubmit' },
    viewModeChange: { action: 'viewModeChange' },
    exportClick: { action: 'exportClick' },
  },
};

export default meta;

type Story = StoryObj<SearchCardComponent>;

export const Default: Story = {};

export const GridViewActive: Story = {
  args: { viewMode: 'grid' },
};

export const English: Story = {
  args: {
    title: 'All Vehicles',
    countText: '8 vehicles available',
    searchPlaceholder: 'Search by name or number...',
    exportLabel: 'Export Report',
    viewMode: 'list',
  },
};
