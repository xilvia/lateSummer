import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from 'src/app/user/dataModel/userDto';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-display-response',
  templateUrl: './display-response.component.html',
  styleUrls: ['./display-response.component.css'],
})
export class DisplayResponseComponent implements OnInit {
  public projects$;
  private projectSubject: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.projects$ = this.getprojectList();
    console.log(this.projects$);
  }

  public getprojectList(): BehaviorSubject<any> {
    this.apiService.getAllProjects().subscribe((projects) => {
      this.projectSubject.next(projects);
    });
    return this.projectSubject;
  }
}
