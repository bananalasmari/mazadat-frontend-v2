import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { SideMenu } from '../side-menu/side-menu';

@Component({
  selector: 'app-inner-layout',
  standalone: true,
  imports: [RouterOutlet, Header, Footer, SideMenu],
  templateUrl: './inner-layout.html',
  styleUrl: './inner-layout.scss',
})
export class InnerLayout {
  /** Opens the side menu drawer on mobile when true. */
  sideMenuOpen = signal(false);

  /** Close the side menu when user taps the main content (mobile). */
  onMainClick(): void {
    if (this.sideMenuOpen()) {
      this.sideMenuOpen.set(false);
    }
  }
}
