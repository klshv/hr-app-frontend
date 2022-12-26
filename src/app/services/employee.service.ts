import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Employee } from '../models/employee';

import { EmployeeShortDto, Client } from "../hr-api/hr-api";
import { MAPPER } from '../app.module';
import { Mapper } from '@automapper/core';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor(private apiClient: Client, @Inject(MAPPER) private _mapper: Mapper) { }

  getAll$(pageIndex: number = 0, pageSize: number = 10) {
    return this.apiClient
      .list2(pageIndex, pageSize)
      .pipe(
        map(employeeListDto => ({
          items: this._dtosToEmployees(employeeListDto.employees ?? []),
          count: employeeListDto.count ?? 0
        }))
      );
  }

  /*update$(id: number, employee: Employee) {
    return this.apiClient.employeetPUT(id, this._mapper.map<Employee, EmployeeDto>(employee, 'Employee', 'EmployeeDto'));
  }*/

  delete$(id: number) {
    return this.apiClient.employeeDELETE(id);
  }

  private _dtosToEmployees(dtos: EmployeeShortDto[]): Employee[] {
    return dtos.map(employeeShortDto => this._mapper.map<EmployeeShortDto, Employee>(employeeShortDto, 'EmployeeShortDto', 'Employee'));    
  }
}