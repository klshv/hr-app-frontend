import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicantsComponent } from './applicants/applicants.component';
import { EmployeesComponent } from './employees/employees.component';
import { PersonalFilesComponent } from './personal-files/personal-files.component';
import { RouterModule } from '@angular/router';

const appRoutes = [
  { path: '', component: ApplicantsComponent },
  { path: 'applicants', component: ApplicantsComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'personal-files', component: PersonalFilesComponent }
];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
