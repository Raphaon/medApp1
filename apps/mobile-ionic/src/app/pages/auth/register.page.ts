import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
  <ion-header><ion-toolbar><ion-title>Inscription {{ role }}</ion-title></ion-toolbar></ion-header>
  <ion-content class="ion-padding">
    <form [formGroup]="form" (ngSubmit)="submit()">
      <ion-item><ion-label position="floating">Email</ion-label><ion-input type="email" formControlName="email"></ion-input></ion-item>
      <ion-item><ion-label position="floating">Mot de passe</ion-label><ion-input type="password" formControlName="password"></ion-input></ion-item>
      <ion-item><ion-label position="floating">Prénom</ion-label><ion-input formControlName="firstName"></ion-input></ion-item>
      <ion-item><ion-label position="floating">Nom</ion-label><ion-input formControlName="lastName"></ion-input></ion-item>
      <ion-item><ion-label position="floating">Téléphone</ion-label><ion-input formControlName="phone"></ion-input></ion-item>
      <ion-item *ngIf="role !== 'patient'"><ion-label position="floating">Numéro professionnel</ion-label><ion-input formControlName="license"></ion-input></ion-item>
      <ion-item *ngIf="role !== 'patient'"><ion-label position="floating">Spécialité</ion-label><ion-input formControlName="specialty"></ion-input></ion-item>
      <ion-item><ion-checkbox slot="start" formControlName="consent"></ion-checkbox><ion-label>J'accepte le traitement de mes données de santé</ion-label></ion-item>
      <ion-button type="submit" expand="block" [disabled]="form.invalid">Créer le compte</ion-button>
    </form>
  </ion-content>
  `,
})
export class RegisterPage implements OnInit {
  role = 'patient';
  form: FormGroup;
  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      license: [''],
      specialty: [''],
      consent: [false, Validators.requiredTrue],
    });
  }
  ngOnInit() {
    this.role = this.route.snapshot.paramMap.get('role') || 'patient';
  }
  submit() {
    if (this.form.valid) {
      console.log('register', { ...this.form.value, role: this.role });
    }
  }
}
