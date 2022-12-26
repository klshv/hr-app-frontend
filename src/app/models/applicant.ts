import { ApplicantDecision } from "./applicant-decision";
import { Person } from "./person";
import cloneDeep from "lodash-es/cloneDeep";

export class Applicant {
    public constructor(init?:Partial<Applicant>) {
        Object.assign(this, init);
    }

    id: number = 0;
    personalInfo: Person = new Person();
    appliedDate: Date = new Date();
    appliedPosition: string = '';
    decision: ApplicantDecision = ApplicantDecision.Pending;

    public clone(): Applicant {
        return new Applicant(cloneDeep(this));
    }

}
