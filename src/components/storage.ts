import { IStoreGame } from "../interfaces/game.interface";
import { midGameMap1Move } from "../../test/unit-tests/data/map";
import { IStorage } from "../interfaces/components.interface";

class Storage implements IStorage {
  storage: IStorage;
  constructor(storage: IStorage) {
    this.storage = storage;
  }
  loadGame(): IStoreGame {
    return this.storage.loadGame();
  }
  saveGame(game: IStoreGame): void {
    return this.storage.saveGame(game);
  }
  checkNotFinishedGame(): boolean {
    return this.storage.checkNotFinishedGame();
  }
}

class FileStorage implements IStorage {
  loadGame(): IStoreGame {
    return {
      map: midGameMap1Move,
      timer: 10,
    };
  }

  saveGame(game: IStoreGame): void {
    return;
  }

  checkNotFinishedGame(): boolean {
    return false;
  }
}

const fileStorage = new FileStorage();
const storage = new Storage(fileStorage);

export { storage as Storage };
