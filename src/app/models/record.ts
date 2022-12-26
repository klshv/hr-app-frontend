import { Employee } from "./employee";
import { Person } from "./person";

export class Record {
    public constructor(content: string, dateCreated: Date, author: Employee) {
        this.content = content;
        this.dateCreated = dateCreated;
        this.author = author;
    }

    content: string = '';
    author: Employee = new Employee();
    dateCreated: Date = new Date();
}
