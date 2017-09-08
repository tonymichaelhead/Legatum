import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service'

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { ContractFormComponent } from './contract-form/contract-form.component';
import { ReviewContractComponent } from './review-contract/review-contract.component';

import { MyContractsComponent } from './my-contracts/my-contracts.component';
import { ContractPreviewComponent } from './contract-preview/contract-preview.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    {
      path: 'home',
      component: HomeComponent,
      data: { someShizz: 'some interesting data' }
    },
    {
      path: 'dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuardService],
      children: [
        {
          path: '',
          children: [
            {
              path: 'my-contracts',
              component: MyContractsComponent
            },
            {
              path: 'create-contract',
              component: ContractFormComponent
            },
            {
              path: 'review-contract',
              component: ReviewContractComponent
            },
            {
              path: '',
              redirectTo: 'my-contracts', pathMatch: 'full'
            },
          ]
        },
      ]
    },
  
  
    {
      path: '**',
      redirectTo: 'home', pathMatch: 'full'
    },
    {
      path: '',
      redirectTo: 'home', pathMatch: 'full'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: true } // <-- debugging purposes only
        ),
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}