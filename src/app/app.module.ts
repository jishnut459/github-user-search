import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserGridComponent } from './user-grid/user-grid.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, UserGridComponent, SearchBoxComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
