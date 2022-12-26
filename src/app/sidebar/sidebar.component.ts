import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  links = [
    { title: 'Соискатели', path: 'applicants' },
    { title: 'Сотрудники', path: 'employees' },
    { title: 'Личные дела', path: 'personal-files' }
  ];

	active = 'applicants';

  ngOnInit(): void {
  }

}
