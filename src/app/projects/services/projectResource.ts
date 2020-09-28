import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiConfig } from '../../common/apiConfig';
import { ProjectDto } from '../dataModel/projectDto';
import { EditProjectDto } from '../dataModel/editProjectDto';
import { CreateProjectDto } from '../dataModel/createProjectDto.';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class ProjectResource {
  private readonly url = `${apiConfig.url}/projects`;

  constructor(private http: HttpClient) {}

  public findAll(): BehaviorSubject<ProjectDto[]> {
    return this.http.get<ProjectDto[]>(this.url) as BehaviorSubject<
      ProjectDto[]
    >;
  }

  // public findOne(id: number): BehaviorSubject<ProjectDto> {
  //   return this.http.get<ProjectDto>(`${this.url}/${id}`) as BehaviorSubject<
  //     ProjectDto
  //   >;
  // }

  // // public findProjectName(userName: string) {
  // //   console.log(userName);
  // //   return this.http.post(this.url, userName);
  // // }

  // public post(createProjectDto: CreateProjectDto): BehaviorSubject<ProjectDto> {
  //   return this.http.post<ProjectDto>(this.url, createProjectDto) as BehaviorSubject<
  //     ProjectDto
  //   >;
  // }

  // public update(
  //   id: number,
  //   editProjectDto: EditProjectDto
  // ): BehaviorSubject<ProjectDto> {
  //   return this.http.put<ProjectDto>(
  //     `${this.url}/${id}`,
  //     editProjectDto
  //   ) as BehaviorSubject<ProjectDto>;
  // }

  // public delete(id: number): BehaviorSubject<ProjectDto> {
  //   return this.http.delete<ProjectDto>(`${this.url}/${id}`) as BehaviorSubject<
  //     ProjectDto
  //   >;
  // }
}
