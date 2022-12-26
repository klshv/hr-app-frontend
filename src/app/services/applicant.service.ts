import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Applicant } from '../models/applicant';

import { ApplicantDto, ApplicantShortDto, Client } from "../hr-api/hr-api";
import { MAPPER } from '../app.module';
import { Mapper } from '@automapper/core';

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {

  constructor(private apiClient: Client, @Inject(MAPPER) private _mapper: Mapper) { }

  getAll$(pageIndex: number = 0, pageSize: number = 10) {
    return this.apiClient
      .list(pageIndex, pageSize)
      .pipe(
        map(applicantListDto => ({
          items: this._dtosToApplicants(applicantListDto.applicants ?? []),
          count: applicantListDto.count ?? 0
        }))
      );
  }

  update$(id: number, applicant: Applicant) {
    return this.apiClient.applicantPUT(id, this._mapper.map<Applicant, ApplicantDto>(applicant, 'Applicant', 'ApplicantDto'));
  }

  delete$(id: number) {
    return this.apiClient.applicantDELETE(id);
  }

  private _dtosToApplicants(dtos: ApplicantShortDto[]): Applicant[] {
    return dtos.map(applicantShortDto => this._mapper.map<ApplicantShortDto, Applicant>(applicantShortDto, 'ApplicantShortDto', 'Applicant'));    
  }
}
