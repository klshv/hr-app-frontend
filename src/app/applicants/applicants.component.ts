import { Component, OnInit, ViewChild } from '@angular/core';
import { faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import { map, distinct, Observable } from 'rxjs';
import { Applicant } from '../models/applicant';
import { ApplicantService } from '../services/applicant.service';
import { ApplicantEditComponent } from './applicant.edit/applicant.edit.component';

@Component({
  selector: 'app-applicants',
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.css']
})
export class ApplicantsComponent implements OnInit {

  @ViewChild('editModal') private modalComponent: ApplicantEditComponent | undefined;

  faEdit = faEdit;
  faRemove = faRemove;

  page: number = 1; 
  pageSize: number = 10;
  pagedApplicants$: Observable<{items: Applicant[], count: number}> = this.applicantService.getAll$(this.page - 1, this.pageSize);;

  totalCount$ = this.pagedApplicants$
    .pipe(
      distinct(pagedApplicants => pagedApplicants.count),
      map(pagedApplicants => pagedApplicants.count)
    );

  constructor(protected applicantService: ApplicantService) { 
  }

  ngOnInit(): void {
  }

  updatePage(page: number) {
    this.pagedApplicants$ = this.applicantService.getAll$(page - 1, this.pageSize);
  }

  itemClick(arg: MouseEvent) {
    const targetRowItem = arg.currentTarget as HTMLTableRowElement;
    console.log(targetRowItem?.dataset["itemid"]);
  }

  async updateClick(arg: MouseEvent, applicant: Applicant) {
    const targetRowItem = arg.currentTarget as HTMLButtonElement;
    console.log("update: ", applicant);
    arg.stopPropagation();
    if (this.modalComponent) {
      Object.setPrototypeOf(applicant, Applicant.prototype);
      this.modalComponent.applicant = applicant.clone();
      return await this.modalComponent?.open();  
    }
  }

  deleteClick(arg: MouseEvent) {
    const targetRowItem = arg.currentTarget as HTMLButtonElement;
    console.log("delete: ", targetRowItem?.dataset["itemid"]);
    arg.stopPropagation();
  }

}
