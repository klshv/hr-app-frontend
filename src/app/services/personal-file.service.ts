import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Person } from '../models/person';
import { PersonalFile } from '../models/personal-file';
import { Record } from '../models/record';

@Injectable({
  providedIn: 'root'
})
export class PersonalFileService {

  constructor(private http: HttpClient) { }

  getAll(pageIndex: number = 0, pageSize: number = 10): Iterable<PersonalFile> {
    const hrSpecialist = new Employee({ personalInfo: new Person({fullName: 'Peter Ivanov'}), position: 'HR Specialist' });

    return [
      new PersonalFile({  
        employee: new Employee({ 
          personalInfo: new Person({ 
            fullName: 'Vasiliy Pupkin'
          }), 
          position: 'CEO' }), 
        records: [
          new Record("Принят на работу", new Date(2020, 1, 1), hrSpecialist)
        ] 
      })
    ];
  }
}
