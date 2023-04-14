import {
  IContentCreator,
  IGame,
  IMapService,
  IRules,
  IStorage,
} from "../interfaces/components.interface";
import { ICellCoordinates, IMap, ISize } from "../interfaces/map.interface";
import { IResult, IStoreGame } from "../interfaces/game.interface";

import { ContentCreator } from "./contentCreator";
import { MapService } from "./mapService";
import { Rules } from "./rules";
import { Storage } from "./storage";

export class Game implements IGame {
  private mapIsCreated = false;

  // @ts-ignore
  private contentCreator: IContentCreator;
  // @ts-ignore
  private mapService: IMapService;

  private readonly rules: IRules = Rules;
  private readonly storage: IStorage = Storage;
  startGame(size: ISize, minesCount: number): IMap {
    this.contentCreator = new ContentCreator(size, minesCount);
    return this.contentCreator.getEmptyMap();
  }

  isNotFinishedGame(): { isNotFinishedGame: boolean } {
    return { isNotFinishedGame: this.storage.checkNotFinishedGame() };
  }

  continueGame(): IStoreGame {
    return this.storage.loadGame();
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
