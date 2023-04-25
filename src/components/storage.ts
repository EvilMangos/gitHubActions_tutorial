import { ICrypto, IStorage } from "../interfaces/components.interface";
import { Crypto } from "./crypto";
import { IStoreGame } from "../interfaces/game.interface";
import { FilesStorage } from "../utilities/filesStorage";
import { IStorageUtilities } from "../interfaces/utilities.interface";

class Storage implements IStorage {
  private readonly storage: IStorageUtilities;
  private readonly cryptoService: ICrypto = Crypto;

  constructor(storage: IStorageUtilities) {
    this.storage = storage;
  }
  async init(): Promise<void> {
    await this.storage.init();
  }

  async loadGame(): Promise<IStoreGame> {
    const data = await this.storage.load();
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
    await this.storage.save(formattedData);
    return;
  }

  async checkNotFinishedGame(): Promise<boolean> {
    return this.storage.checkExistence();
  }

  async deleteGame(): Promise<void> {
    await this.storage.delete();
  }

  formatEncryptedDataForSave(data: string, iv: string) {
    return data + "\n" + iv;
  }

  extractEncryptedDataForUse(encrypted: string) {
    const [data, iv] = encrypted.split("\n");
    return { data, iv };
  }
}

const storage = new Storage(FilesStorage);
storage.init();

export { storage as Storage };
