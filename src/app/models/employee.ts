import { Person } from "./person";

export class Employee {
    public constructor(init?:Partial<Employee>) {
        Object.assign(this, init);
    }


    id: number = 0;
    personalInfo: Person = new Person();
    hiredDate: Date = new Date();
    position: string = '';
    
}

