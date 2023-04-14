import {
  IContentCreator,
  IGame,
  IMapService,
  IRules,
} from "../interfaces/components.interface";
import {
  ICellCoordinates,
  IMap,
  IResult,
  ISize,
} from "../interfaces/map.interface";
import { ContentCreator } from "./contentCreator";
import { MapService } from "./mapService";
import { Rules } from "./rules";

export class Game implements IGame {
  private mapIsCreated = false;

  // @ts-ignore
  private contentCreator: IContentCreator;
  // @ts-ignore
  private mapService: IMapService;
  private readonly rules: IRules = Rules;
  startGame(size: ISize, minesCount: number): IMap {
    this.contentCreator = new ContentCreator(size, minesCount);
    return this.contentCreator.getEmptyMap();
  }
  doMove(cell: ICellCoordinates): IResult {
    if (!this.mapIsCreated) {
      this.mapService = new MapService(this.contentCreator.createContent(cell));
    }
    const map = this.mapService.openArea(cell);
    const isLoose = this.rules.isLoose(this.mapService.getCell(cell));
    const isWin = this.rules.isWin(map);

    return {
      isLoose,
      isWin,
      map,
    };
  }
}
