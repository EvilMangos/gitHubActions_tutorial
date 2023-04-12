import { IMapService } from "../interfaces/components.interface";
import { ICell, ICellCoordinates, IMap } from "../interfaces/map.interface";
import { getCoordinatesOfExistenceCellsAround } from "../utils";

export class MapService implements IMapService {
  private readonly map: IMap;
  constructor(map: IMap) {
    this.map = map;
  }

  openArea(cellCoordinates: ICellCoordinates): IMap {
    const cell = this.getCell(cellCoordinates);
    if (!cell.isMine && !cell.isOpen) {
      this.openCell(cellCoordinates);
      if (cell.value === 0) {
        const coordinatesOfCellsAround = getCoordinatesOfExistenceCellsAround(
          this.map,
          cellCoordinates
        );
        coordinatesOfCellsAround.forEach((coordinates) =>
          this.openArea(coordinates)
        );
      }
    }

    return this.getMap();
  }

  getMap() {
    return structuredClone(this.map);
  }

  getCell(cellCoordinates: ICellCoordinates): ICell {
    return structuredClone(
      this.map[cellCoordinates.row][cellCoordinates.column]
    );
  }

  openCell(cellCoordinates: ICellCoordinates): void {
    this.map[cellCoordinates.row][cellCoordinates.column].isOpen = true;
  }
}
