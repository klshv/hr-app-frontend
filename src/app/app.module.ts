import { Inject, InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ApplicantsComponent } from './applicants/applicants.component';
import { EmployeesComponent } from './employees/employees.component';
import { PersonalFilesComponent } from './personal-files/personal-files.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { createMap, createMapper, forMember, mapFrom, Mapper } from '@automapper/core';
import { pojos } from '@automapper/pojos';

import { API_BASE_URL, ApplicantDto, ApplicantShortDto, Client, EmployeeShortDto, PersonDto, PersonShortDto } from './hr-api/hr-api';
import { environment } from 'src/environments/environment';
import { Person } from './models/person';
import { createUserMetadata } from 'src/mapper-metadata';
import { Applicant } from './models/applicant';
import { Employee } from './models/employee';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ApplicantEditComponent } from './applicants/applicant.edit/applicant.edit.component';

export const MAPPER = new InjectionToken<Mapper>('Mapper');

const autoMapperFactory = (): Mapper =>
  createMapper({
    strategyInitializer: pojos()
  });


@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ApplicantsComponent,
    EmployeesComponent,
    PersonalFilesComponent,
    ApplicantEditComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [
    Client,
    {
      provide: MAPPER,
      useFactory: autoMapperFactory
    },
    {
      provide: API_BASE_URL,
      useValue: environment.apiUrl
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(MAPPER) mapper: Mapper) {
    createUserMetadata();
    createMap<PersonShortDto, Person>(mapper,
      'PersonShortDto',
      'Person',
      forMember(dest => dest.firstName, mapFrom(src => src.fullName?.split(' ')[0] ?? '')),
      forMember(dest => dest.patronymic, mapFrom(src => src.fullName?.split(' ')[1] ?? '')),
      forMember(dest => dest.lastName, mapFrom(src => src.fullName?.split(' ')[2] ?? ''))
    );

    createMap<Person, PersonDto>(mapper,
      'Person',
      'PersonDto'
    );

    createMap<ApplicantShortDto, Applicant>(mapper,
      'ApplicantShortDto',
      'Applicant',
      forMember(dest => dest.personalInfo, mapFrom(src => mapper.map<PersonShortDto, Person>(src.person ?? new PersonShortDto(), 'PersonShortDto', 'Person'))));

    createMap<Applicant, ApplicantDto>(mapper,
      'Applicant',
      'ApplicantDto',
      forMember(dest => dest.position, mapFrom(src => src.appliedPosition)),
      forMember(dest => dest.person, mapFrom(src => mapper.map<Person, PersonDto>(src.personalInfo ?? new Person(), 'Person', 'PersonDto')))
      );

    createMap<EmployeeShortDto, Employee>(mapper,
      'EmployeeShortDto',
      'Employee',
      forMember(dest => dest.personalInfo, mapFrom(src => mapper.map<PersonShortDto, Person>(src.person ?? new PersonShortDto(), 'PersonShortDto', 'Person'))));

  }
}