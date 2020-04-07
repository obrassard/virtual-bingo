import { BingoColumn } from './bingoColumn.entity';
export class BingoNumber {

    public drawned: boolean;
    public column: string;

    constructor(column: BingoColumn, public num: number) {
        this.drawned = false;
        this.column = column.letter.toUpperCase();
    }

    public drawn(): void {
        this.drawned = true;
    }

    public toString(): string {
        return `${this.column}-${this.pad2(this.num)}`;
    }

    private pad2(n: number): string {
        return n > 9 ? '' + n : '0' + n;
    }
}
