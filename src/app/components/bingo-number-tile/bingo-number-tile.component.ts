import { Component, OnInit, Input } from '@angular/core';
import { BingoNumber } from '../../models/bingoNumber.entity';

@Component({
  selector: 'app-bingo-number-tile',
  templateUrl: './bingo-number-tile.component.html',
  styleUrls: ['./bingo-number-tile.component.scss']
})
export class BingoNumberTileComponent implements OnInit {

  @Input() bingoNumber: BingoNumber;

  constructor() { }

  ngOnInit(): void {
  }

}
