import type { Meta, StoryObj } from '@storybook/angular';
import { TypographyComponent } from './typography.component';

const meta: Meta<TypographyComponent> = {
  title: 'Foundations/Typography',
  component: TypographyComponent,
  tags: ['autodocs'],
  args: {
    tag: 'p',
    variant: 'body',
    weight: 'normal',
    muted: false,
    color: 'default',
    align: 'start',
    transform: 'none',
    truncate: false,
    extraClass: '',
    text: 'This is a sample paragraph used in Mazadat Design System.',
  },
  argTypes: {
    tag: { control: 'select', options: ['p', 'span', 'div', 'small', 'label', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
    variant: { control: 'select', options: ['body', 'lead', 'small', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
    weight: { control: 'radio', options: ['light', 'normal', 'semibold', 'bold'] },
    color: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'muted'],
    },
    align: { control: 'radio', options: ['start', 'center', 'end'] },
    transform: { control: 'radio', options: ['none', 'uppercase', 'lowercase', 'capitalize'] },
  },
};

export default meta;
type Story = StoryObj<TypographyComponent>;

export const Paragraph: Story = {};

export const Heading: Story = {
  args: { tag: 'h2', variant: 'h3', weight: 'bold', text: 'Welcome to Mazadat Design System' },
};

export const Muted: Story = {
  args: { muted: true, text: 'Secondary (muted) text for additional context.' },
};

export const ArabicExample: Story = {
  render: (args) => ({
    props: args,
    template: `
      <div dir="rtl" lang="ar" style="max-width: 720px">
        <app-typography tag="h2" variant="h3" weight="bold" [text]="'عنوان تجريبي'"></app-typography>
        <app-typography [text]="'هذا مثال على فقرة نصية داخل نظام تصميم مزادات. الهدف هو توحيد أسلوب الكتابة والمسافات بين العناصر.'"></app-typography>
        <app-typography [muted]="true" [text]="'نص ثانوي (Muted) لعرض معلومات إضافية.'"></app-typography>
      </div>
    `,
    imports: [TypographyComponent],
  }),
};

