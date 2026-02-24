import { Component, DestroyRef, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-header-search',
  standalone: true,
  imports: [IconFieldModule, InputIconModule, InputTextModule, ButtonModule, TooltipModule],
  template: `
    <div class="header-search mx-3" [style.max-width]="maxWidth()">
      <!-- Desktop: inline search -->
      <div class="d-none d-md-block">
        <p-iconfield iconPosition="left">
          <input
            type="text"
            pInputText
            [placeholder]="placeholder()"
            [value]="query()"
            class="form-control form-control-sm bg-white border header-search__input"
            (input)="onInput($event)"
            (keydown.enter)="onEnter()"
          />
          <p-inputicon styleClass="pi pi-search" />
          @if (query()) {
            <button
              type="button"
              class="header-search__clear"
              (click)="clear()"
              [attr.aria-label]="clearLabel()"
            >
              <i class="pi pi-times"></i>
            </button>
          }
        </p-iconfield>
      </div>

      <!-- Mobile: icon only, opens popup -->
      <p-button
        icon="pi pi-search"
        [rounded]="true"
        [text]="true"
        severity="secondary"
        class="d-md-none"
        [pTooltip]="searchLabel()"
        (onClick)="openMobilePopup()"
        [attr.aria-label]="searchLabel()"
      />

      <!-- Mobile popup overlay -->
      @if (mobilePopupOpen()) {
        <div class="header-search__popup-backdrop" (click)="closeMobilePopup()" role="presentation"></div>
        <div class="header-search__popup" role="dialog" [attr.aria-label]="searchLabel()">
          <div class="d-flex align-items-center gap-2 p-3 bg-white border-bottom">
            <p-iconfield [iconPosition]="iconPosition()" styleClass="flex-grow-1">
              <input
                type="text"
                pInputText
                [placeholder]="placeholder()"
                [value]="query()"
                class="form-control"
                (input)="onInput($event)"
                (keydown.enter)="onEnter(); closeMobilePopup()"
                (keydown.escape)="closeMobilePopup()"
              />
              <p-inputicon styleClass="pi pi-search" />
            </p-iconfield>
            <p-button
              icon="pi pi-times"
              [rounded]="true"
              [text]="true"
              (onClick)="closeMobilePopup()"
              [attr.aria-label]="closeLabel()"
            />
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .header-search .p-iconfield {
        width: 100%;
        position: relative;
      }
      .header-search input {
        width: 100%;
      }
      .header-search__clear {
        position: absolute;
        inset-inline-end: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        padding: 0;
        border: none;
        background: transparent;
        color: #6b7280;
        cursor: pointer;
        border-radius: 0.25rem;
      }
      .header-search__clear:hover {
        color: #111827;
        background: #f3f4f6;
      }
      .header-search__clear .pi {
        font-size: 0.875rem;
      }
      .header-search__input {
        padding-inline-end: 2rem;
      }
      .header-search__popup-backdrop {
        position: fixed;
        inset: 0;
        z-index: 1040;
        background: rgba(0, 0, 0, 0.3);
      }
      .header-search__popup {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1050;
        background: #fff;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    `,
  ],
})
export class HeaderSearchComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly search$ = new Subject<string>();

  /** Placeholder text for the search input. */
  readonly placeholder = input<string>('');
  /** Aria-label for the mobile search icon button. */
  readonly searchLabel = input<string>('Search');
  /** Aria-label for the clear button. */
  readonly clearLabel = input<string>('Clear search');
  /** Aria-label for the close button in mobile popup. */
  readonly closeLabel = input<string>('Close');
  /** Icon position for mobile popup input (e.g. 'right' for RTL). */
  readonly iconPosition = input<'left' | 'right'>('left');
  /** Max width of the search container (e.g. "20rem"). */
  readonly maxWidth = input<string | null>(null);
  /** Debounce delay in ms before emitting search. */
  readonly debounceMs = input<number>(300);

  /** Current query (for optional two-way binding and clear button). */
  readonly query = signal('');
  /** Mobile popup open state. */
  readonly mobilePopupOpen = signal(false);

  /** Emitted when the search term changes (debounced) or on Enter / clear. */
  readonly valueChange = output<string>();
  /** Emitted when the user clicks the mobile search icon (open overlay). */
  readonly mobileSearchClick = output<void>();

  constructor() {
    this.search$
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.valueChange.emit(value));
  }

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);
    this.search$.next(value);
  }

  onEnter(): void {
    const value = this.query();
    this.valueChange.emit(value);
  }

  clear(): void {
    this.query.set('');
    this.search$.next('');
    this.valueChange.emit('');
  }

  openMobilePopup(): void {
    this.mobilePopupOpen.set(true);
    this.mobileSearchClick.emit();
  }

  closeMobilePopup(): void {
    this.mobilePopupOpen.set(false);
  }
}
