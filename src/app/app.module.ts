import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { HttpClientModule} from '@angular/common/http'
import { PropertyService } from './services/property.service';

import { Routes, RouterModule, Router } from '@angular/router';
import { PropertyCategoryMenuComponent } from './components/property-category-menu/property-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { PropertyDetailsComponent } from './components/property-details/property-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent
} from '@okta/okta-angular'

import myAppConfig from './config/my-app-config';

const oktaConfig = Object.assign({
  onAuthRequired: (injector: any) => {
    const router = injector.get(Router)

    // redirect the user to custom login page
    router.navigate(['/login']);
  }
}, myAppConfig.oidc);

const routes: Routes = [
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},


  {path: 'properties/:id', component: PropertyDetailsComponent},
  {path: 'search/:keyword', component: PropertyListComponent},
  {path: 'category/:id', component: PropertyListComponent},
  {path: 'category', component: PropertyListComponent},
  {path: 'properties', component: PropertyListComponent},
  {path: '', redirectTo: '/properties', pathMatch: 'full'},
  {path: '**', redirectTo: '/properties', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    PropertyListComponent,
    PropertyCategoryMenuComponent,
    SearchComponent,
    PropertyDetailsComponent,
    LoginComponent,
    LoginStatusComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    OktaAuthModule
  ],
  providers: [PropertyService, { provide: OKTA_CONFIG, useValue: oktaConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
