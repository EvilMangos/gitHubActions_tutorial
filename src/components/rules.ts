import { IRules } from "../interfaces/components.interface";
import { ICell, IMap } from "../interfaces/map.interface";

class Rules implements IRules {
  isLoose(cell: ICell) {
    return cell.isMine;
  }

  isWin(map: IMap): boolean {
    for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
      const row = map[rowIndex];
      for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
        const cell = row[columnIndex];
        if (!cell.isMine && !cell.isOpen) {
          return false;
        }
      }
    }
    return true;
  }
}

const rules = new Rules();

export { rules as Rules };
