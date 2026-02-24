import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Select } from 'primeng/select';

export interface DropdownOption {
  label: string;
  value: string | number;
}

export type DropdownSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [FormsModule, Select],
  template: `
    <p-select
      [options]="options()"
      [optionLabel]="optionLabel()"
      [optionValue]="optionValue()"
      [placeholder]="placeholder()"
      [disabled]="disabled()"
      [size]="primengSize()"
      [ariaLabel]="ariaLabel() ?? undefined"
      [showClear]="showClear()"
      [styleClass]="extraClass()"
      [ngModel]="value()"
      (ngModelChange)="valueChange.emit($event)"
    />
  `,
})
export class DropdownComponent<T = string | number> {
  /** List of options: { label: string, value: string | number } or use optionLabel/optionValue for custom keys */
  readonly options = input<DropdownOption[] | Record<string, unknown>[]>([]);
  /** Property name for the option label (default: 'label') */
  readonly optionLabel = input<string>('label');
  /** Property name for the option value (default: 'value') */
  readonly optionValue = input<string>('value');
  /** Placeholder when nothing selected */
  readonly placeholder = input<string>('');
  /** Selected value (single) */
  readonly value = input<T | null>(null);
  /** Emitted when selection changes */
  readonly valueChange = output<T | null>();
  /** Disable the dropdown */
  readonly disabled = input(false);
  /** Size: sm, md, lg */
  readonly size = input<DropdownSize>('md');
  /** Aria label for accessibility */
  readonly ariaLabel = input<string | null>(null);
  /** Show clear button when value is set */
  readonly showClear = input(false);
  /** Extra CSS classes for the select root */
  readonly extraClass = input<string>('');

  protected primengSize(): 'small' | 'large' | undefined {
    const s = this.size();
    if (s === 'sm') return 'small';
    if (s === 'lg') return 'large';
    return undefined;
  }
}
