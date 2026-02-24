import { Component, input, inject } from '@angular/core';
import { TranslatePipe } from '../../core/i18n/translate.pipe';
import { TranslationService } from '../../core/i18n/translation.service';
import { ButtonComponent } from '../../shared/ui/atoms/button/button.component';

@Component({
  selector: 'app-public-shell',
  standalone: true,
  imports: [TranslatePipe, ButtonComponent],
  templateUrl: './public-shell.html',
})
export class PublicShellComponent {
  protected readonly i18n = inject(TranslationService);

  /** When true, shows the full-screen loader overlay. */
  showLoader = input<boolean>(false);
}
