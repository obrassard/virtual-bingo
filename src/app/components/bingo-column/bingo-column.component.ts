import { Component, OnInit, Input } from '@angular/core';
import { BingoColumn } from '../../models/bingoColumn.entity';

@Component({
  selector: 'app-bingo-column',
  templateUrl: './bingo-column.component.html',
  styleUrls: ['./bingo-column.component.scss']
})
export class BingoColumnComponent implements OnInit {

  @Input() column: BingoColumn;

  constructor() { }

  ngOnInit(): void {
  }

}
