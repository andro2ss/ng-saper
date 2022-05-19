import { Component, HostListener } from '@angular/core';
import { FieldComponentModel } from './models/FieldComponent.Model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostListener('contextmenu', ['$event'])
  onRightClick(event: any) {
    event.preventDefault();
  }
  gameState: number = 0;
  mapArr: FieldComponentModel[] = [];
  fieldStyle = {
    height: '10px',
    width: '10px',
  };
  checkNearestBomb(fieldIndex: number, mapSize: number, bombArr: number[]) {
    const fieldsToCheck: number[] = [];
    let bombCounter: number = 0;
    fieldsToCheck.push(fieldIndex - 1);
    fieldsToCheck.push(fieldIndex + 1);
    fieldsToCheck.push(fieldIndex - 1 - mapSize);
    fieldsToCheck.push(fieldIndex - mapSize);
    fieldsToCheck.push(fieldIndex + 1 - mapSize);
    fieldsToCheck.push(fieldIndex - 1 + mapSize);
    fieldsToCheck.push(fieldIndex + mapSize);
    fieldsToCheck.push(fieldIndex + 1 + mapSize);
    bombArr.forEach(bomb => {
      fieldsToCheck.forEach(field => {
        if (field === bomb) {
          bombCounter++;
        }
      });
    });
    return bombCounter;
  }

  generateBombs(fieldsAmount: number) {
    const arr: number[] = [];
    let bombProc: number = 0;
    if (fieldsAmount < 101) {
      bombProc = 0.2;
    } else if (fieldsAmount < 300) {
      bombProc = 0.35;
    } else {
      bombProc = 0.5;
    }
    const bombAmount: number = Math.floor(fieldsAmount * bombProc);
    while (arr.length < bombAmount) {
      let r = Math.floor(Math.random() * fieldsAmount);
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  }

  generateMap(fAmount: number) {
    let fieldsAmount = fAmount * fAmount;
    this.mapArr = [];
    const bombArr = this.generateBombs(fieldsAmount);
    let maxWidth = document.getElementById('gameMap')?.clientWidth;
    let maxHeight = document.getElementById('gameMap')?.clientHeight;
    if (maxWidth && maxHeight) {
      let tempWidth = maxWidth / fAmount;
      let tempHeight = maxHeight / fAmount;
      this.fieldStyle = {
        height: tempHeight + 'px',
        width: tempWidth + 'px',
      };
    }

    for (let i = 0; i < fieldsAmount; i++) {
      let tempBomb = false;
      bombArr.forEach(item => {
        if (item === i) {
          tempBomb = true;
        }
      });
      let nearBombs = this.checkNearestBomb(i, fAmount, bombArr);
      let tempArrItem: FieldComponentModel = {
        fIndex: i,
        fStyle: this.fieldStyle,
        nearBombs: nearBombs,
        bomb: tempBomb,
      };
      this.mapArr.push(tempArrItem);
    }
  }

  gameControl(gameControlValues: number) {
    this.generateMap(gameControlValues);
  }

  handleNewGame() {
    this.gameState = 0;
    this.mapArr = [];
  }

  readGameState(readGameState: number) {
    this.gameState = readGameState;
  }
}
