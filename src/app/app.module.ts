import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BingoGridComponent } from './components/bingo-grid/bingo-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    BingoGridComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
