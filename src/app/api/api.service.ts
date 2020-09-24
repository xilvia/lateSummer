import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = '';

  constructor(private http: HttpClient) {}

  getAllProjects(): BehaviorSubject<any> {
    return this.http.get(this.apiUrl) as BehaviorSubject<any>;
  }
}
