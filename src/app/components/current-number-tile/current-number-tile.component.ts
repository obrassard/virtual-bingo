import { Component, OnInit, OnDestroy } from '@angular/core';
import { BingoService } from '../../services/bingo.service';
import { Subscription } from 'rxjs';
import { BingoNumber } from '../../models/bingoNumber.entity';

@Component({
    selector: 'app-current-number-tile',
    templateUrl: './current-number-tile.component.html',
    styleUrls: ['./current-number-tile.component.scss']
})
export class CurrentNumberTileComponent implements OnInit, OnDestroy {

    private numberChangedSubscription: Subscription;
    public currentNumber: string;

    constructor(public bingoService: BingoService) { }

    ngOnInit(): void {
        this.currentNumber = '--';
        this.onNumberChange(this.bingoService.currentNumber)
        this.numberChangedSubscription = this.bingoService.eventCurrentNumberChanged.subscribe(this.onNumberChange);
    }

    onNumberChange = (value: BingoNumber) => {
        if (value) {
            this.currentNumber = value.toString();
        } else {
            this.currentNumber = '--';
        }
    }

    ngOnDestroy(): void {
        this.numberChangedSubscription.unsubscribe();
    }
}
