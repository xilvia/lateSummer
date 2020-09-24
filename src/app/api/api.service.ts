import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://gitlab.com/api/v4/projects';

  constructor(private http: HttpClient) {}

  getAllProjects(): BehaviorSubject<any> {
    return this.http.get(this.apiUrl) as BehaviorSubject<any>;
  }
}
