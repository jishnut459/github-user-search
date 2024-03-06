import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, shareReplay, throwError } from 'rxjs';
import {
  GithubUser,
  GithubUserSearchResult,
} from '../interfaces/github.interface';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  
  BASE_URL = 'https://api.github.com';
  
  constructor(private http: HttpClient) {}
  
  private cachedUsers$: Observable<GithubUser[]> | undefined;

  getUsers(perPage: number = 50): Observable<GithubUser[]> {
    if (!this.cachedUsers$) {
      this.cachedUsers$ = this.http
        .get<GithubUser[]>(`${this.BASE_URL}/users?per_page=${perPage}`)
        .pipe(
          catchError((error) => {
            console.error('Error fetching users:', error);
            return throwError(() => new Error('Failed to fetch users'));
          }),
          shareReplay(1)
        );
    }
    return this.cachedUsers$;
  }

  getUsersByName(
    name: string,
    perPage: number = 50
  ): Observable<GithubUserSearchResult> {
    return this.http
      .get<GithubUserSearchResult>(
        `${this.BASE_URL}/search/users?per_page=${perPage}&q=${name}`
      )
      .pipe(
        catchError((error) => {
          console.error('Error fetching users:', error);
          return throwError(() => new Error('Failed to fetch users'));
        })
      );
  }
}
