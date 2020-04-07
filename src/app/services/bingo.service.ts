import { Injectable } from '@angular/core';
import { BingoNumberGrid } from '../models/bingoNumberGrid.entity';
import { BingoNumber } from '../models/bingoNumber.entity';
import { StorageService } from './storage.service';
import { GameState } from '../models/gameState.entity';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BingoService {

    private state: GameState;

    public get gameIsFinished(): boolean {
        return this.state.isFinished;
    }

    public get currentNumber(): BingoNumber {
        return this.state.currentNumber;
    }

    public get gameNumbers(): number[] {
        return this.state.numbers;
    }

    public get grid(): BingoNumberGrid {
        return this.state.grid;
    }

    public eventGameEnded = new Subject<boolean>();

    constructor(private storageService: StorageService) { }

    public initializeGame(reset: boolean = false): void {

        if (reset) {
            this.storageService.clearGameState();
        }

        const savedState = this.storageService.getSavedGameState();

        if (savedState && !savedState.isFinished) {
            this.state = savedState;
        } else {
            this.state = {
                grid: new BingoNumberGrid(),
                isFinished: false,
                numbers: this.generateRandomNumbers(),
                currentNumber: null
            };
            this.save();
        }
    }

    public getNext(): BingoNumber {
        if (this.gameNumbers.length > 0) {
            this.state.currentNumber = this.state.grid.getNumber(this.gameNumbers.shift());
            this.state.currentNumber.drawn();
        } else {
            this.state.isFinished = true;
            this.eventGameEnded.next();
            this.state.currentNumber = null;
        }
        this.save();
        return this.state.currentNumber;
    }

    private save() {
        this.storageService.saveGameState(this.state);
    }

    private generateRandomNumbers(): number[] {
        const a = ([...Array(75).keys()].map(x => x + 1));
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
}
