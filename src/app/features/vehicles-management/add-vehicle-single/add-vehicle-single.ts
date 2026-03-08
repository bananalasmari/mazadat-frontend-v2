import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { TranslationService } from '../../../core/i18n/translation.service';
import { TypographyComponent } from '../../../shared/ui/atoms/typography/typography.component';
import { ButtonComponent } from '../../../shared/ui/atoms/button/button.component';
import { DropdownComponent, type DropdownOption } from '../../../shared/ui/atoms/dropdown/dropdown.component';

export interface StepDef {
  label: string;
  icon: string;
  optional: boolean;
}

@Component({
  selector: 'app-add-vehicle-single',
  standalone: true,
  imports: [
    RouterLink,
    TranslatePipe,
    TypographyComponent,
    ButtonComponent,
    DropdownComponent,
  ],
  templateUrl: './add-vehicle-single.html',
  styleUrl: './add-vehicle-single.scss',
})
export class AddVehicleSingle {
  private readonly i18n = inject(TranslationService);

  readonly currentStep = signal(0);
  readonly identifierType = signal<string | null>(null);
  readonly displayLocation = signal<string>('mazadat');
  readonly vehicleCity = signal<string | null>(null);

  get identifierTypeOptions(): DropdownOption[] {
    const t = (k: string) => this.i18n.t(k);
    return [
      { label: t('vehiclesManagement.addSingle.identifierTypeSequence'), value: 'sequence' },
      { label: t('vehiclesManagement.addSingle.identifierTypeChassis'), value: 'chassis' },
      { label: t('vehiclesManagement.addSingle.identifierTypeCustom'), value: 'custom' },
    ];
  }

  get cityOptions(): DropdownOption[] {
    const t = (k: string) => this.i18n.t(k);
    return [
      { label: t('vehiclesManagement.addSingle.cityRiyadh'), value: 'riyadh' },
      { label: t('vehiclesManagement.addSingle.cityJeddah'), value: 'jeddah' },
      { label: t('vehiclesManagement.addSingle.cityDammam'), value: 'dammam' },
    ];
  }

  get steps(): StepDef[] {
    const t = (k: string) => this.i18n.t(k);
    return [
      { label: t('vehiclesManagement.addSingle.step1'), icon: 'pi pi-file-edit', optional: false },
      { label: t('vehiclesManagement.addSingle.step2'), icon: 'pi pi-tag', optional: true },
      { label: t('vehiclesManagement.addSingle.step3'), icon: 'pi pi-box', optional: true },
      { label: t('vehiclesManagement.addSingle.step4'), icon: 'pi pi-check-circle', optional: false },
    ];
  }

  onNext(): void {
    // TODO: implement step navigation
  }
}
