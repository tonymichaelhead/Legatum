import { NgModule } from '@angular/core';
import { MdSidenavModule, MdButtonModule, MdIconModule, OverlayContainer } from '@angular/material';

@NgModule({
  imports: [
    MdSidenavModule,
    MdButtonModule,
    MdIconModule
  ],
  exports: [
    MdSidenavModule,
    MdButtonModule,
    MdIconModule
  ]
})

export class SharedModule {
  constructor(overlayContainer: OverlayContainer) {
    overlayContainer.themeClass = 'unicorn-dark-theme';
  }
}
