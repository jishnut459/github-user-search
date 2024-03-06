import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
})
export class SearchBoxComponent {
  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onInput(event: any): void {
    this.search.emit(event.target.value);
  }
}
