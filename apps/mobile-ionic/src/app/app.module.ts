import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AppComponent } from './app.component';
import { OnboardingPage } from './pages/onboarding/onboarding.page';
import { RegisterPage } from './pages/auth/register.page';
import { AuthInterceptor } from './shared/auth.interceptor';
import { reducers } from './shared/state';

export function HttpLoaderFactory(http: any) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const routes: Routes = [
  { path: 'onboarding', component: OnboardingPage },
  { path: 'auth/register/:role', component: RegisterPage },
  { path: '**', redirectTo: 'onboarding' },
];

@NgModule({
  declarations: [AppComponent, OnboardingPage, RegisterPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    RouterModule.forRoot(routes),
    HttpClientModule,
    TranslateModule.forRoot({ loader: { provide: TranslateLoader, useFactory: HttpLoaderFactory, deps: [HttpClientModule] } }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
