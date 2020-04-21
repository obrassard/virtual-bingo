import { Component, OnInit, OnDestroy, HostListener, ViewChild } from '@angular/core';
import { BingoService } from '../../services/bingo.service';
import { Subscription } from 'rxjs';
import { CurrentNumberFullscreenComponent } from '../curent-number-fullscreen/current-number-fullscreen.component';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
    selector: 'app-bingo-grid',
    templateUrl: './bingo-grid.component.html',
    styleUrls: ['./bingo-grid.component.scss']
})
export class BingoGridComponent implements OnInit, OnDestroy {

    @ViewChild(CurrentNumberFullscreenComponent) cnfc: CurrentNumberFullscreenComponent;
    private onGameEndEventListener: Subscription;

    constructor(public bingoService: BingoService) { }

    ngOnInit(): void {
        this.bingoService.initializeGame();
        this.onGameEndEventListener = this.bingoService.eventGameEnded.subscribe(() => {
          this.onGameFinished();
        });
    }

    getNextNumber() {
        if (!this.cnfc.displayed && this.cnfc.animationEnded) {
            this.bingoService.getNext();
        }
    }

    resetGame() {
        Swal.fire({
            title: 'Restart the game ?',
            text: 'Are you sure you want to restart the game ? All the numbers that were drawn will be lost!',
            icon: 'question',
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            showCancelButton: true,
            cancelButtonColor : '#ec2c36'
        }).then((result: SweetAlertResult) => {
            if (result.value) {
                this.bingoService.initializeGame(true);
            }
        });
    }

    onGameFinished() {
        Swal.fire({
            title: 'Game\'s over!',
            confirmButtonText: 'New Game',
            confirmButtonColor: '#34bc64',
            allowEscapeKey: false,
            allowOutsideClick: false
        }).then((result: SweetAlertResult) => {
            if (result.value) {
                this.bingoService.initializeGame(true);
            }
        });
    }

    @HostListener('document:keydown.space', ['$event'])
    onSpacePressed(event: KeyboardEvent) {
        event.preventDefault();
        this.getNextNumber();
    }

    ngOnDestroy() {
        this.onGameEndEventListener.unsubscribe();
    }
}
