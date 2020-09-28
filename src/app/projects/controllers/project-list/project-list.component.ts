import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  public projects$;
  private projectSubject: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projects$ = this.getprojectList();
    console.log(this.projects$);
  }

  public getprojectList(): BehaviorSubject<any> {
    this.projectService.getAllProjects().subscribe((projects) => {
      this.projectSubject.next(projects);
    });
    return this.projectSubject;
  }
}
