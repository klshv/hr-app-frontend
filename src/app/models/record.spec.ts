import { Employee } from './employee';
import { Person } from './person';
import { Record } from './record';

describe('Record', () => {
  it('should create an instance', () => {
    expect(new Record("Принят на работу", new Date(2020, 1, 1), new Employee({ personalInfo: new Person({fullName: 'Peter Ivanov'}), position: 'Developer' }))).toBeTruthy();
  });
});
