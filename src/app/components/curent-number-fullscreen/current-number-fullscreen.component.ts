import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BingoService } from '../../services/bingo.service';
import { BingoNumber } from '../../models/bingoNumber.entity';

@Component({
    selector: 'app-current-number-fullscreen',
    templateUrl: './current-number-fullscreen.component.html',
    styleUrls: ['./current-number-fullscreen.component.scss']
})
export class CurrentNumberFullscreenComponent implements OnInit, OnDestroy, AfterViewInit {

    private numberChangedSubscription: Subscription;
    public currentNumber: string;
    public colId: number;
    public displayed: boolean;
    public animationEnded: boolean;

    @ViewChild('overlay') overlay: ElementRef;

    constructor(public bingoService: BingoService) { }

    ngOnInit(): void {
        this.numberChangedSubscription = this.bingoService.eventCurrentNumberChanged.subscribe(this.onNumberChange);
    }

    ngAfterViewInit() {
        this.animationEnded = true;
        this.overlay.nativeElement.addEventListener('transitionend', (e) => {
            if (!this.displayed) {
                if (e.propertyName === 'opacity') {
                    this.overlay.nativeElement.style.display = 'none';
                    this.animationEnded = true;
                }
            }
        }, false);
    }

    onNumberChange = (value: BingoNumber) => {
        if (value) {
            this.currentNumber = value.toString();
            this.colId = value.columnId;
            this.showOverlay();
        } else {
            this.currentNumber = undefined;
            this.colId = undefined;
        }
    }

    showOverlay() {
        this.animationEnded = false;
        this.overlay.nativeElement.style.display = 'unset';
        setTimeout(() => {
            this.displayed = true;
            setTimeout(() => {
                this.displayed = false;
            }, 3000);
        }, 0);
    }

    ngOnDestroy(): void {
        this.numberChangedSubscription.unsubscribe();
    }
}
