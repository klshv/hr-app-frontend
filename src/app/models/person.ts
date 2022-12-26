import { Address } from "./address";

export class Person {
    public constructor(init?:Partial<Person>) {
        Object.assign(this, init);
    }

    id: number = 0;
    address: Address = new Address();
    get fullName(): string {
        return `${this.firstName} ${this.patronymic} ${this.lastName}`;
    };
    firstName: string = '';
    patronymic: string = '';
    lastName: string = '';
    email: string = '';
    phoneNumber: string = '';
}
