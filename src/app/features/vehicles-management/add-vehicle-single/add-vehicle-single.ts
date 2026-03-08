import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';
import { TranslationService } from '../../../core/i18n/translation.service';
import { TypographyComponent } from '../../../shared/ui/atoms/typography/typography.component';
import { ButtonComponent } from '../../../shared/ui/atoms/button/button.component';
import { DropdownComponent, type DropdownOption } from '../../../shared/ui/atoms/dropdown/dropdown.component';
import { InputComponent } from '../../../shared/ui/atoms/input/input.component';

export interface StepDef {
  label: string;
  description: string;
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
    InputComponent,
  ],
  templateUrl: './add-vehicle-single.html',
  styleUrl: './add-vehicle-single.scss',
})
export class AddVehicleSingle {
  private readonly i18n = inject(TranslationService);

  readonly currentStep = signal(0);
  readonly identifierType = signal<string | null>(null);
  readonly identifierValue = signal<string>('');
  readonly displayLocation = signal<string>('mazadat');
  readonly vehicleCity = signal<string | null>(null);
  readonly animating = signal(false);

  readonly auctionStartPrice = signal<string>('');
  readonly instantApprovalPrice = signal<string>('');
  readonly directSalePrice = signal<string>('');

  readonly serviceTransport = signal(false);
  readonly serviceKeyCut = signal(false);
  readonly serviceEvaluation = signal(false);

  readonly isCurrentStepValid = computed(() => {
    switch (this.currentStep()) {
      case 0:
        return !!this.identifierType() && !!this.displayLocation() && !!this.vehicleCity();
      case 1:
      case 2:
        return true;
      case 3:
        return true;
      default:
        return false;
    }
  });

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
      { label: t('vehiclesManagement.addSingle.step1'), description: t('vehiclesManagement.addSingle.step1Desc'), icon: 'assets/icons/stepper/step-basic.svg', optional: false },
      { label: t('vehiclesManagement.addSingle.step2'), description: t('vehiclesManagement.addSingle.step2Desc'), icon: 'assets/icons/stepper/step-price.svg', optional: true },
      { label: t('vehiclesManagement.addSingle.step3'), description: t('vehiclesManagement.addSingle.step3Desc'), icon: 'assets/icons/stepper/step-services.svg', optional: true },
      { label: t('vehiclesManagement.addSingle.step4'), description: t('vehiclesManagement.addSingle.step4Desc'), icon: 'assets/icons/stepper/step-confirm.svg', optional: false },
    ];
  }

  onNext(): void {
    if (!this.isCurrentStepValid() || this.animating()) return;
    const next = this.currentStep() + 1;
    if (next < this.steps.length) {
      this.animating.set(true);
      setTimeout(() => {
        this.currentStep.set(next);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => this.animating.set(false));
        });
      }, 160);
    }
  }

  onPrevious(): void {
    if (this.animating()) return;
    const prev = this.currentStep() - 1;
    if (prev >= 0) {
      this.animating.set(true);
      setTimeout(() => {
        this.currentStep.set(prev);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => this.animating.set(false));
        });
      }, 160);
    }
  }

}
