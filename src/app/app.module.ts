import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BingoGridComponent } from './components/bingo-grid/bingo-grid.component';
import { BingoColumnComponent } from './components/bingo-column/bingo-column.component';
import { BingoNumberTileComponent } from './components/bingo-number-tile/bingo-number-tile.component';
import { CurrentNumberTileComponent } from './components/current-number-tile/current-number-tile.component';
import { CurrentNumberFullscreenComponent } from './components/curent-number-fullscreen/current-number-fullscreen.component';

@NgModule({
  declarations: [
    AppComponent,
    BingoGridComponent,
    BingoColumnComponent,
    BingoNumberTileComponent,
    CurrentNumberTileComponent,
    CurrentNumberFullscreenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
