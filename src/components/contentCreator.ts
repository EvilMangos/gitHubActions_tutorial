import { ICellCoordinates, IMap, ISize } from "../interfaces/map.interface";
import { IContentCreator } from "../interfaces/components.interface";
import { ContentCreatorUtilities } from "../utilities/contentCreatorUtilities";

export class ContentCreator implements IContentCreator {
  private readonly contentCreatorUtilities = new ContentCreatorUtilities();

  private readonly size: ISize;
  private readonly minesCount: number;
  private map: IMap;

  constructor(size: ISize, minesCount: number) {
    this.size = size;
    this.minesCount = minesCount;
    this.map = this.contentCreatorUtilities.getEmptyMap(this.size);
  }

  createContent(openCellCoordinates: ICellCoordinates): IMap {
    this.createMines(openCellCoordinates);
    this.createNumbers();
    return this.map;
  }

  createMines(openCellCoordinates: ICellCoordinates): void {
    const minesPositions = this.contentCreatorUtilities.getMinesPositions(
      this.size,
      this.minesCount,
      openCellCoordinates
    );
    this.map = this.contentCreatorUtilities.getMapFilledByMines(
      this.map,
      minesPositions
    );
  }

  createNumbers(): void {
    this.map = this.contentCreatorUtilities.getMapFilledByNumbers(this.map);
  }

  getEmptyMap(): IMap {
    return structuredClone(this.map);
  }
}
