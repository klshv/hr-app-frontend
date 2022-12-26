import { Employee } from "./employee";
import { Record } from "./record";

export class PersonalFile {
    public constructor(init?:Partial<PersonalFile>) {
        Object.assign(this, init);

    }

    employee: Employee = new Employee();
    records: Record[] = [];
}





