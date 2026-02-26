import { Component, inject, model } from '@angular/core';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { TypographyComponent } from '../../../shared/ui/atoms/typography/typography.component';
import { ButtonComponent } from '../../../shared/ui/atoms/button/button.component';

@Component({
  selector: 'app-add-vehicle-dialog',
  standalone: true,
  imports: [DialogModule, TranslatePipe, TypographyComponent, ButtonComponent],
  templateUrl: './add-vehicle-dialog.html',
  styleUrl: './add-vehicle-dialog.scss',
})
export class AddVehicleDialog {
  private readonly router = inject(Router);

  readonly visible = model(false);

  selectSingle(): void {
    this.visible.set(false);
    this.router.navigate(['/vehicles/add/single']);
  }

  selectBulk(): void {
    this.visible.set(false);
    this.router.navigate(['/vehicles/add/bulk']);
  }

  close(): void {
    this.visible.set(false);
  }
}
