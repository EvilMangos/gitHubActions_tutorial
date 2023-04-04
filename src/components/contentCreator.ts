import { ICell, IMap, ISize } from "../interfaces/map.interface";
import { IContentCreator } from "../interfaces/components.interface";
import { ContentCreatorUtilities } from "../utilities/contentCreatorUtilities";

class ContentCreator implements IContentCreator {
  private readonly contentCreatorUtilities = new ContentCreatorUtilities();

  private readonly size: ISize;
  private readonly minesCount: number;
  private readonly openCell: ICell;
  private map: IMap;

  constructor(size: ISize, minesCount: number, openCell: ICell) {
    this.size = size;
    this.openCell = openCell;
    this.minesCount = minesCount;
    this.map = this.contentCreatorUtilities.getEmptyMap(this.size);
  }

  createContent(): IMap {
    this.createMines();
    this.createNumbers();
    return this.map;
  }

  createMines(): void {
    const minesPositions = this.contentCreatorUtilities.getMinesPositions(
      this.size,
      this.minesCount
    );
    this.map = this.contentCreatorUtilities.getMapFilledByMines(
      this.map,
      minesPositions
    );
  }

  createNumbers(): void {
    this.map = this.contentCreatorUtilities.getMapFilledByNumbers(this.map);
  }
}
