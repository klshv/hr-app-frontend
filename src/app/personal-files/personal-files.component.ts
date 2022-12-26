import { Component, OnInit } from '@angular/core';
import { PersonalFileService } from '../services/personal-file.service';

@Component({
  selector: 'app-personal-files',
  templateUrl: './personal-files.component.html',
  styleUrls: ['./personal-files.component.css']
})
export class PersonalFilesComponent implements OnInit {

  constructor(protected personalFileService: PersonalFileService) { }

  page = 1;
  pageSize = 10;

  items = Array.from(this.personalFileService.getAll(this.page, this.pageSize));

  ngOnInit(): void {
  }

}
