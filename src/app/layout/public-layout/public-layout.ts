import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PublicShellComponent } from '../public-shell/public-shell';
import { PublicLayoutService } from '../../core/layout/public-layout.service';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [PublicShellComponent, RouterOutlet],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss',
})
export class PublicLayout {
  protected readonly layoutService = inject(PublicLayoutService);
}
