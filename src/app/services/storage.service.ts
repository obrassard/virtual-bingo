import { Injectable } from '@angular/core';
import { GameState } from '../models/gameState.entity';
import { BingoNumberGrid } from '../models/bingoNumberGrid.entity';
import { BingoNumber } from '../models/bingoNumber.entity';
import { BingoColumn } from '../models/bingoColumn.entity';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    public saveGameState(state: GameState): void {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('game_state', serializedState);
    }

    public getSavedGameState(): GameState {
        const serializedState = localStorage.getItem('game_state');
        if (serializedState) {
            const state: GameState = JSON.parse(serializedState);
            state.grid = Object.setPrototypeOf(state.grid, BingoNumberGrid.prototype);

            for (let col of state.grid.getColumns()) {
                col = Object.setPrototypeOf(col, BingoColumn.prototype);
                for (let num of col.numbers) {
                    num = Object.setPrototypeOf(num, BingoNumber.prototype);
                }
            }

            if (state.currentNumber != null) {
                state.currentNumber = Object.setPrototypeOf(state.currentNumber, BingoNumber.prototype);
            }

            return state;
        }
        return null;
    }

    public clearGameState(): void {
        localStorage.clear();
    }

}
