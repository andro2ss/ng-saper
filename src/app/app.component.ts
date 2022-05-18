import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  mapSize: number = 1;
  startNewGame: boolean = false;
  gameFieldWidth: number = 10;
  gameFieldHeight: number = 10;
  mapArr: number[] = [];

  fieldStyle = {
    height: this.gameFieldHeight + 'px',
    width: this.gameFieldWidth + 'px',
  };

  gameControl(gameControlValues: { mapSize: number; startTrigger: boolean }) {
    console.log(this.mapArr.length);

    this.mapSize = gameControlValues.mapSize;
    this.startNewGame = gameControlValues.startTrigger;
    let maxWidth = document.getElementById('gameMap')?.clientWidth;
    let maxHeight = document.getElementById('gameMap')?.clientHeight;
    if (gameControlValues.mapSize === 1 && maxHeight && maxWidth) {
      console.log('1');
      this.gameFieldWidth = maxWidth / 8;
      this.gameFieldHeight = maxHeight / 8;
      this.mapArr = [];
      for (let i = 0; i < 64; i++) {
        this.mapArr.push(i);
      }
    } else if (gameControlValues.mapSize === 2 && maxHeight && maxWidth) {
      this.gameFieldWidth = maxWidth / 16;
      this.gameFieldHeight = maxHeight / 16;
      this.mapArr = [];
      for (let i = 0; i < 256; i++) {
        this.mapArr.push(i);
      }
    } else if (gameControlValues.mapSize === 3 && maxHeight && maxWidth) {
      this.gameFieldWidth = maxWidth / 30;
      this.gameFieldHeight = maxHeight / 16;
      this.mapArr = [];
      for (let i = 0; i < 480; i++) {
        this.mapArr.push(i);
      }
    }
    this.fieldStyle = {
      height: this.gameFieldHeight + 'px',
      width: this.gameFieldWidth + 'px',
    };
  }
}
