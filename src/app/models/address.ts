export class Address {

    public constructor(init?:Partial<Address>) {
        Object.assign(this, init);
    }

    buildingNumber: string = '';
    street: string = '';
    apartment: string = '';
    city: string = '';
    state: string = '';
    postalCode: string = '';
    country: string = '';
}
