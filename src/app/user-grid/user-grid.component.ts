import { Component, Input } from '@angular/core';
import { GithubUser } from '../interfaces/github.interface';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.scss'],
})
export class UserGridComponent {
  @Input() users: GithubUser[] = [];
}
