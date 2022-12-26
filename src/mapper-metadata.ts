import { PojosMetadataMap } from "@automapper/pojos";
import { ApplicantShortDto, PersonShortDto, EmployeeShortDto, PersonDto } from "./app/hr-api/hr-api";
import { Applicant } from "./app/models/applicant";
import { Person } from "./app/models/person";
import { Employee } from "./app/models/employee";

export function createUserMetadata() {
    PojosMetadataMap.create<PersonShortDto>('PersonShortDto', {
        id: Number,
        fullName: String,
    });

    PojosMetadataMap.create<PersonDto>('PersonDto', {
        firstName: String,
        patronymic: String,
        lastName: String,
    });

    PojosMetadataMap.create<Person>('Person', {
        id: Number,
        fullName: String,
        firstName: String,
        patronymic: String,
        lastName: String,
        address: String,
        email: String,
        phoneNumber: String,
    });

    PojosMetadataMap.create<ApplicantShortDto>('ApplicantShortDto', {
        id: Number,
        decision: String,
        appliedDate: Date,
        person: 'PersonShortDto',
    });

    PojosMetadataMap.create<Applicant>('Applicant', {
        id: Number,
        appliedDate: Date,
        appliedPosition: String,
        decision: String,
        personalInfo: 'Person',
    });



    PojosMetadataMap.create<EmployeeShortDto>('EmployeeShortDto', {
        id: Number,
        hiredDate: Date,
        position: String,
        person: 'PersonShortDto',
    });

    PojosMetadataMap.create<Employee>('Employee', {
        id: Number,
        hiredDate: Date,
        position: String,
        personalInfo: 'Person',
    });


}