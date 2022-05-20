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
  mapSize: number = 0;
  mapArr: FieldComponentModel[] = [];
  bombAmount: number = 0;
  activatedField: number = 0;
  fieldStyle = {
    height: '10px',
    width: '10px',
  };

  checkNearestBomb(fieldIndex: number, mapSize: number, bombArr: number[]) {
    const fieldsToCheck: number[] = [];
    let bombCounter: number = 0;
    let max = mapSize * mapSize;
    // sprawdz czy mozna patrzec po lewej
    if (fieldIndex % mapSize > 0) {
      fieldsToCheck.push(fieldIndex - 1);
      // sprawdz czy mozna gore
      if (fieldIndex - mapSize >= 0) {
        fieldsToCheck.push(fieldIndex - 1 - mapSize);
      }
      // sprawdz czy mozna dol
      if (fieldIndex + mapSize < max) {
        fieldsToCheck.push(fieldIndex - 1 + mapSize);
      }
    }
    // sprawdz czy mozna patrzec po prawej
    if ((fieldIndex + 1) % mapSize > 0) {
      fieldsToCheck.push(fieldIndex + 1);
      // sprawdz czy mozna gore
      if (fieldIndex - mapSize >= 0) {
        fieldsToCheck.push(fieldIndex + 1 - mapSize);
      }
      // sprawdz czy mozna dol
      if (fieldIndex + mapSize < max) {
        fieldsToCheck.push(fieldIndex + 1 + mapSize);
      }
    }
    // sprawdz czy mozna gore
    if (fieldIndex - mapSize > 0) {
      fieldsToCheck.push(fieldIndex - mapSize);
    }
    // sprawdz czy mozna dol
    if (fieldIndex + mapSize < max) {
      fieldsToCheck.push(fieldIndex + mapSize);
    }
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
    this.mapSize = fAmount;
    let fieldsAmount = fAmount * fAmount;
    this.mapArr = [];
    const bombArr = this.generateBombs(fieldsAmount);
    this.bombAmount = bombArr.length;
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
        fClass: 'game__field',
        fStyle: this.fieldStyle,
        nearBombs: nearBombs,
        bomb: tempBomb,
        activated: false,
      };
      this.mapArr.push(tempArrItem);
    }
  }

  gameControl(gameControlValues: number) {
    this.generateMap(gameControlValues);
  }

  handleNewGame() {
    this.gameState = 0;
    this.activatedField = 0;
    this.mapArr = [];
  }

  rewriteArray(index: number) {
    let tempItem = this.mapArr[index];
    this.mapArr[index] = {
      fClass: tempItem.fClass,
      fIndex: tempItem.fIndex,
      fStyle: tempItem.fStyle,
      nearBombs: tempItem.nearBombs,
      bomb: tempItem.bomb,
      activated: true,
    };
    this.activatedField++;
    if (tempItem.nearBombs === 0) {
      this.showSaveFields(tempItem);
    }
  }

  showSaveFields(startField: FieldComponentModel) {
    let upperIndex = startField.fIndex - this.mapSize;
    let rightIndex = startField.fIndex + 1;
    let rightUpperIndex = startField.fIndex + 1 - this.mapSize;
    let lowerIndex = startField.fIndex + this.mapSize;
    let rightLowerIndex = startField.fIndex + this.mapSize + 1;
    let leftIndex = startField.fIndex - 1;
    let leftUpperIndex = startField.fIndex - 1 - this.mapSize;
    let leftLowerIndex = startField.fIndex - 1 + this.mapSize;

    if (
      leftLowerIndex % this.mapSize !== this.mapSize - 1 &&
      leftLowerIndex < this.mapSize * this.mapSize &&
      !this.mapArr[leftLowerIndex].activated
    ) {
      this.rewriteArray(leftLowerIndex);
    }

    if (
      leftUpperIndex % this.mapSize !== this.mapSize - 1 &&
      leftUpperIndex > 0 &&
      !this.mapArr[leftUpperIndex].activated
    ) {
      this.rewriteArray(leftUpperIndex);
    }

    if (
      leftIndex % this.mapSize !== this.mapSize - 1 &&
      !this.mapArr[leftIndex].activated
    ) {
      this.rewriteArray(leftIndex);
    }

    if (
      rightLowerIndex < this.mapSize * this.mapSize &&
      rightLowerIndex % this.mapSize !== 0 &&
      !this.mapArr[rightLowerIndex].activated
    ) {
      this.rewriteArray(rightLowerIndex);
    }

    if (
      lowerIndex < this.mapSize * this.mapSize &&
      !this.mapArr[lowerIndex].activated
    ) {
      this.rewriteArray(lowerIndex);
    }

    if (rightIndex % this.mapSize !== 0 && !this.mapArr[rightIndex].activated) {
      this.rewriteArray(rightIndex);
    }

    if (upperIndex > 0 && !this.mapArr[upperIndex].activated) {
      this.rewriteArray(upperIndex);
    }

    if (
      rightUpperIndex % this.mapSize !== 0 &&
      rightUpperIndex > 0 &&
      !this.mapArr[rightUpperIndex].activated
    ) {
      this.rewriteArray(rightUpperIndex);
    }
  }

  readGameState(localData: FieldComponentModel) {
    if (localData.bomb) {
      this.gameState = -1;
      this.bombAmount = 0;
    } else {
      this.mapArr[localData.fIndex] = localData;
      this.activatedField++;
      if (localData.nearBombs === 0) {
        this.showSaveFields(localData);
      }
    }
  }
}
