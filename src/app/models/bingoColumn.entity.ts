import { BingoNumber } from './bingoNumber.entity';
export class BingoColumn {

    public numbers: BingoNumber[];

    constructor(public letter: string) {
        this.numbers = [];
    }

    public addNumber(num: BingoNumber) {
        this.numbers.push(num);
    }
}
