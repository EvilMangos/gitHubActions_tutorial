import { ICrypto, IStorage } from "../interfaces/components.interface";
import { Crypto } from "./crypto";
import { IScore, IScores, IStoreGame } from "../interfaces/game.interface";
import { FilesStorage } from "../utilities/filesStorage";
import { IStorageUtilities } from "../interfaces/utilities.interface";

class Storage implements IStorage {
  private readonly storage: IStorageUtilities;
  private readonly cryptoService: ICrypto = Crypto;
  private readonly pathGame = process.env["GAME_DATA_PATH"] || "";
  private readonly pathScores = process.env["SCORES_DATA_PATH"] || "";

  constructor(storage: IStorageUtilities) {
    this.storage = storage;
  }
  async init(): Promise<void> {
    // @ts-ignore
    await this.storage.init(this.pathGame, this.pathScores);
  }

  async loadGame(): Promise<IStoreGame> {
    const data = await this.storage.load(this.pathGame);
    const encrypted = this.extractEncryptedDataForUse(data);
    const decrypted = this.cryptoService.decrypt(encrypted.data, encrypted.iv);
    return JSON.parse(decrypted);
  }

  async saveGame(data: IStoreGame): Promise<void> {
    const encrypted = this.cryptoService.encrypt(JSON.stringify(data));
    const formattedData = this.formatEncryptedDataForSave(
      encrypted.data,
      encrypted.iv
    );
    await this.storage.save(this.pathGame, formattedData);
    return;
  }

  async checkNotFinishedGame(): Promise<boolean> {
    return this.storage.checkExistence(this.pathGame);
  }

  async deleteGame(): Promise<void> {
    await this.storage.delete(this.pathGame);
  }

  formatEncryptedDataForSave(data: string, iv: string) {
    return data + "\n" + iv;
  }

  extractEncryptedDataForUse(encrypted: string) {
    const [data, iv] = encrypted.split("\n");
    return { data, iv };
  }

  async loadScores(): Promise<IScores> {
    const data = await this.storage.load(this.pathScores);
    const encrypted = this.extractEncryptedDataForUse(data);
    const decrypted = this.cryptoService.decrypt(encrypted.data, encrypted.iv);
    return JSON.parse(decrypted);
  }

  async saveScore(data: IScore): Promise<void> {
    const encrypted = this.cryptoService.encrypt(JSON.stringify(data));
    const formattedData = this.formatEncryptedDataForSave(
      encrypted.data,
      encrypted.iv
    );
    await this.storage.save(this.pathScores, formattedData);
    return;
  }
}

const storage = new Storage(FilesStorage);
storage.init();

export { storage as Storage };
