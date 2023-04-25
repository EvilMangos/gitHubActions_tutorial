import {
  IContentCreator,
  ICrypto,
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
import { Crypto } from "./crypto";

export class Game implements IGame {
  private mapIsCreated = false;

  // @ts-ignore
  private contentCreator: IContentCreator;
  // @ts-ignore
  private mapService: IMapService;

  private readonly rules: IRules = Rules;
  private readonly storage: IStorage = Storage;
  private readonly cryptoService: ICrypto = Crypto;
  startGame(size: ISize, minesCount: number): IMap {
    this.contentCreator = new ContentCreator(size, minesCount);
    return this.contentCreator.getEmptyMap();
  }

  async isNotFinishedGame(): Promise<{ isNotFinishedGame: boolean }> {
    return { isNotFinishedGame: await this.storage.checkNotFinishedGame() };
  }

  async continueGame(): Promise<IStoreGame> {
    const data = await this.storage.loadGame();
    const [encrypted, iv] = data.split("\n");
    const decrypted = this.cryptoService.decrypt(encrypted, iv);
    return JSON.parse(decrypted);
  }
  async doMove(cell: ICellCoordinates, timer: number): Promise<IResult> {
    if (!this.mapIsCreated) {
      this.mapService = new MapService(this.contentCreator.createContent(cell));
    }
    const map = this.mapService.openArea(cell);
    const isLoose = this.rules.isLoose(this.mapService.getCell(cell));
    const isWin = this.rules.isWin(map);

    if (!isLoose && !isWin) {
      const encrypted = this.cryptoService.encrypt(
        JSON.stringify({ map, timer })
      );
      const data = encrypted.data + "\n" + encrypted.iv;
      await this.storage.saveGame(data);
    }

    return {
      isLoose,
      isWin,
      map,
    };
  }
}
