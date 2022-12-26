import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Applicant } from 'src/app/models/applicant';
import { ApplicantService } from 'src/app/services/applicant.service';


@Component({
  selector: 'app-applicant-edit',
  templateUrl: './applicant.edit.component.html',
  styleUrls: ['./applicant.edit.component.css']
})
export class ApplicantEditComponent implements OnInit {

  @Input() public applicant: Applicant = new Applicant();
  @ViewChild('modal') private modalContent: TemplateRef<ApplicantEditComponent> | undefined;
  private modalRef: NgbModalRef | undefined;

  constructor(private modalService: NgbModal, protected applicantService: ApplicantService) { }

  ngOnInit(): void {
  }

  async open() {
    this.modalRef = this.modalService.open(this.modalContent);
    return await this.modalRef.result;
  }

  close() {
    this.modalRef?.close();
  }

  dismiss() {
    this.modalRef?.dismiss();
  }


  updateName($event: Event) {
    this.applicant.personalInfo.firstName = ($event.target as HTMLInputElement).value;
  }

  updateSurname($event: Event) {
    this.applicant.personalInfo.lastName = ($event.target as HTMLInputElement).value;
  }

  updatePatronymic($event: Event) {
    this.applicant.personalInfo.patronymic = ($event.target as HTMLInputElement).value;
  }

  updateAppliedDate($event: Event) {
    this.applicant.personalInfo.firstName = ($event.target as HTMLInputElement).value;
  }

  save() {
    this.applicantService.update$(this.applicant.id, this.applicant).subscribe();
    this.close();
  }
}
