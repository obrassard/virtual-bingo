import { BingoNumber } from './bingoNumber.entity';
import { BingoColumn } from './bingoColumn.entity';

export class BingoNumberGrid {

    public static COLUMNS: string[] = ['B', 'I', 'N', 'G', 'O'];

    private columns: BingoColumn[];

    constructor() {
        this.initialize();
    }

    public initialize(): BingoNumberGrid {
        this.columns = [];
        let current = 0;
        BingoNumberGrid.COLUMNS.forEach((col, index) => {
            const column = new BingoColumn(col);
            for (let i = 0; i < 15; i++) {
                current++;
                const bingoNumber = new BingoNumber(column, current);
                bingoNumber.columnId = index + 1;
                column.addNumber(bingoNumber);
            }
            this.columns.push(column);
        });
        return this;
    }

    public getColumns(): BingoColumn[] {
        return this.columns;
    }

    public getAllNumbers(): BingoNumber[] {
        const numbers = [];
        for (const col of this.columns) {
            for (const num of col.numbers) {
                numbers.push(num);
            }
        }
        return numbers;
    }

    public getNumber(index: number): BingoNumber {
        for (const col of this.columns) {
            for (const num of col.numbers) {
                if (num.num === index) {
                    return num;
                }
            }
        }
        return null;
    }
}
