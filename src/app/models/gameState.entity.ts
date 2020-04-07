import { BingoNumberGrid } from './bingoNumberGrid.entity';
import { BingoNumber } from './bingoNumber.entity';
export interface GameState {
    grid: BingoNumberGrid;
    numbers: number[];
    currentNumber: BingoNumber;
    isFinished: boolean;
}
