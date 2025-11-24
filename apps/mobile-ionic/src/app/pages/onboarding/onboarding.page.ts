import { Component } from '@angular/core';

@Component({
  selector: 'app-onboarding',
  template: `
  <ion-header><ion-toolbar color="primary"><ion-title>MedApp</ion-title></ion-toolbar></ion-header>
  <ion-content class="ion-padding">
    <ion-slides pager="true">
      <ion-slide>
        <h2>Bienvenue</h2>
        <p>Gestion des soins, RDV, notifications.</p>
      </ion-slide>
      <ion-slide>
        <h2>Confidentialité</h2>
        <p>Consentement explicite requis. Vos données sont chiffrées.</p>
      </ion-slide>
      <ion-slide>
        <ion-button routerLink="/auth/register/patient" expand="block">Créer un compte patient</ion-button>
        <ion-button routerLink="/auth/register/doctor" expand="block" fill="outline">Je suis praticien</ion-button>
      </ion-slide>
    </ion-slides>
  </ion-content>
  `,
})
export class OnboardingPage {}
