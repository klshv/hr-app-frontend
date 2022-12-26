import { Component, OnInit } from '@angular/core';
import { faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import { map, distinct, Observable } from 'rxjs';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  faEdit = faEdit;
  faRemove = faRemove;

  page: number = 1; 
  pageSize: number = 10;
  pagedEmployees$: Observable<{items: Employee[], count: number}> = this.employeeService.getAll$(this.page - 1, this.pageSize);;

  totalCount$ = this.pagedEmployees$
    .pipe(
      distinct(pagedEmployees => pagedEmployees.count),
      map(pagedEmployees => pagedEmployees.count)
    );

  constructor(protected employeeService: EmployeeService) { 
  }

  ngOnInit(): void {
  }

  updatePage(page: number) {
    this.pagedEmployees$ = this.employeeService.getAll$(page - 1, this.pageSize);
    this.recalculateTotalCount();
  }

  itemClick(arg: MouseEvent) {
    const targetRowItem = arg.currentTarget as HTMLTableRowElement;
    console.log(targetRowItem?.dataset["itemid"]);
  }

  updateClick(arg: MouseEvent) {
    const targetRowItem = arg.currentTarget as HTMLButtonElement;
    console.log("update: ", targetRowItem?.dataset["itemid"]);
    arg.stopPropagation();
  }

  deleteClick(arg: MouseEvent) {
    const targetRowItem = arg.currentTarget as HTMLButtonElement;
    const id = Number(targetRowItem?.dataset["itemid"]);
    this.employeeService
      .delete$(id)
      .subscribe(() => this.updatePage(this.page));

    arg.stopPropagation();
  }

  private recalculateTotalCount() {
    this.totalCount$ = this.pagedEmployees$
      .pipe(
        distinct(pagedEmployees => pagedEmployees.count),
        map(pagedEmployees => pagedEmployees.count)
      );
  }
}
