import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProjectResource } from './projectResource';
import { ProjectDto } from '../dataModel/projectDto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private projectResource: ProjectResource) {}

  public getAllProjects(): BehaviorSubject<ProjectDto[]> {
    return this.projectResource.findAll() as BehaviorSubject<ProjectDto[]>;
  }
}
