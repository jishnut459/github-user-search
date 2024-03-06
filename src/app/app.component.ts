import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, of, throwError } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { GithubUser } from './interfaces/github.interface';
import { GithubService } from './services/github.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'github-user-search';
  users: GithubUser[] = [];
  initialUsers: GithubUser[] = [];

  private unsubscribeSubject = new Subject<void>();
  private searchQuerySubject = new Subject<string>();

  constructor(private githubService: GithubService) {}

  ngOnInit() {
    this.setupSearch();
    this.githubService
      .getUsers()
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe((res) => {
        this.users = res;
        this.initialUsers = res;
      });
  }

  ngOnDestroy() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  searchUsers(searchQuery: string): void {
    this.searchQuerySubject.next(searchQuery.replace(/\s/g, ''));
  }

  private setupSearch(): void {
    this.searchQuerySubject
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((query) =>
          query.trim() === ''
            ? of({
                total_count: this.initialUsers.length,
                items: this.initialUsers,
              })
            : this.githubService.getUsersByName(query).pipe(
                catchError((error) => {
                  console.error('Error fetching users:', error);
                  return of({
                    total_count: this.initialUsers.length,
                    items: this.initialUsers,
                  });
                })
              )
        ),
        takeUntil(this.unsubscribeSubject)
      )
      .subscribe((res) => {
        this.users = res.items;
      });
  }
}
