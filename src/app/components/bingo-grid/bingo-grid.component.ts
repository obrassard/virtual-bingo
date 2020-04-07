import { Component, OnInit, OnDestroy } from '@angular/core';
import { BingoService } from '../../services/bingo.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-bingo-grid',
    templateUrl: './bingo-grid.component.html',
    styleUrls: ['./bingo-grid.component.scss']
})
export class BingoGridComponent implements OnInit, OnDestroy {

    constructor(public bingoService: BingoService) { }

    private onGameEndEventListener: Subscription;

    ngOnInit(): void {
        this.bingoService.initializeGame();
        this.onGameEndEventListener = this.bingoService.eventGameEnded.subscribe(this.onGameFinished);
    }

    getNextNumber() {
        this.bingoService.getNext();
    }

    resetGame() {
        this.bingoService.initializeGame(true);
    }

    onGameFinished() {
        alert('Game end');
    }

    ngOnDestroy() {
        this.onGameEndEventListener.unsubscribe();
    }
}
