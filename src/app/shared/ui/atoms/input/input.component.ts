import { Component, input, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';

type InputSize = 'sm' | 'md' | 'lg';

let nextId = 0;

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [InputTextModule, MessageModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
  template: `
    <div [class]="containerClass()">
      @if (label()) {
        <label class="form-label small mb-1" [attr.for]="resolvedId()">
          {{ label() }}
          @if (required()) {
            <span class="text-danger ms-1" aria-hidden="true">*</span>
          }
        </label>
      }

      @if (iconLeftSvg()) {
        <div class="input-wrapper" style="position:relative">
          <input
            pInputText
            [id]="resolvedId()"
            [type]="type()"
            [class.form-control-lg]="size() === 'lg'"
            [class.form-control-sm]="size() === 'sm'"
            [class.p-invalid]="!!error()"
            [class.is-invalid]="!!error()"
            [class]="inputClasses()"
            [attr.placeholder]="placeholder()"
            [attr.autocomplete]="autocomplete()"
            [attr.aria-label]="ariaLabel()"
            [attr.aria-invalid]="error() ? 'true' : null"
            [attr.maxlength]="maxlength()"
            [attr.inputmode]="inputmode()"
            [required]="required()"
            [readonly]="readonly()"
            [disabled]="isDisabled()"
            [value]="_value()"
            (input)="onInput($event)"
            (blur)="onBlur()"
          />
          <img [src]="iconLeftSvg()!" alt="" aria-hidden="true" style="position:absolute;top:50%;inset-inline-end:0.875rem;transform:translateY(-50%);width:1.25rem;height:1.25rem;object-fit:contain;pointer-events:none" />
        </div>
      } @else {
        <div class="input-wrapper" [class.input-group]="hasIcons()" [class.input-group-sm]="hasIcons() && size() === 'sm'" [class.input-group-lg]="hasIcons() && size() === 'lg'">
          @if (iconLeft()) {
            <span class="input-group-text" aria-hidden="true">
              <i [class]="iconLeft()"></i>
            </span>
          }

          <input
            pInputText
            [id]="resolvedId()"
            [type]="type()"
            [class.form-control-lg]="size() === 'lg'"
            [class.form-control-sm]="size() === 'sm'"
            [class.p-invalid]="!!error()"
            [class.is-invalid]="!!error()"
            [class]="inputClasses()"
            [attr.placeholder]="placeholder()"
            [attr.autocomplete]="autocomplete()"
            [attr.aria-label]="ariaLabel()"
            [attr.aria-invalid]="error() ? 'true' : null"
            [attr.maxlength]="maxlength()"
            [attr.inputmode]="inputmode()"
            [required]="required()"
            [readonly]="readonly()"
            [disabled]="isDisabled()"
            [value]="_value()"
            (input)="onInput($event)"
            (blur)="onBlur()"
          />

          @if (iconRight()) {
            <span class="input-group-text" aria-hidden="true">
              <i [class]="iconRight()"></i>
            </span>
          }
        </div>
      }

      @if (error()) {
        <p-message severity="error" [icon]="errorIcon()" [text]="error()!" size="small" styleClass="mt-1 w-100" />
      } @else if (helpText()) {
        <div class="form-text"><i class="pi pi-info-circle me-1"></i>{{ helpText() }}</div>
      }
    </div>
  `,
})
export class InputComponent implements ControlValueAccessor {
  private readonly autoId = `app-input-${++nextId}`;

  readonly id = input<string | null>(null);
  readonly label = input<string | null>(null);
  readonly placeholder = input<string>('');
  readonly type = input<string>('text');
  readonly size = input<InputSize>('lg');
  readonly required = input(false);
  readonly readonly = input(false);
  readonly disabled = input(false);
  readonly autocomplete = input<string | null>(null);
  readonly ariaLabel = input<string | null>(null);

  readonly helpText = input<string | null>(null);
  /** When set, input shows invalid state and this message with icon (PrimeNG message). */
  readonly error = input<string | null>(null);
  /** Icon class for error message (e.g. "pi pi-times-circle"). */
  readonly errorIcon = input<string>('pi pi-times-circle');

  readonly iconLeft = input<string | null>(null);
  readonly iconLeftSvg = input<string | null>(null);
  readonly iconRight = input<string | null>(null);

  /** Max length for the input (optional). */
  readonly maxlength = input<number | null>(null);
  /** Input mode (e.g. "email", "text", "numeric"). */
  readonly inputmode = input<string | null>(null);
  /** When true, strips all non-digit characters on input. */
  readonly numericOnly = input(false);

  readonly containerClass = input<string>('mb-3');
  readonly inputClass = input<string>('');

  /** Emitted when the input loses focus. */
  readonly blurred = output<void>();

  protected readonly _value = signal<string>('');
  private readonly _cvaDisabled = signal(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  protected resolvedId(): string {
    return this.id() ?? this.autoId;
  }

  protected isDisabled(): boolean {
    return this.disabled() || this._cvaDisabled();
  }

  protected hasIcons(): boolean {
    return !!(this.iconLeft() || this.iconRight());
  }

  protected inputClasses(): string {
    const extra = this.inputClass().trim();
    return extra ? `form-control ${extra}` : 'form-control';
  }

  writeValue(value: unknown): void {
    this._value.set(typeof value === 'string' ? value : value == null ? '' : String(value));
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._cvaDisabled.set(isDisabled);
  }

  protected onInput(event: Event): void {
    const el = event.target as HTMLInputElement;
    let val = el.value;
    if (this.numericOnly()) {
      val = val.replace(/\D/g, '');
      if (val !== el.value) el.value = val;
    }
    this._value.set(val);
    this.onChange(val);
  }

  protected onBlur(): void {
    this.onTouched();
    this.blurred.emit();
  }
}
