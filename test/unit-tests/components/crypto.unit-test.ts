import { Crypto } from "../../../src/components/crypto";
import { midGameMap1Move } from "../data/map";
import { IStoreGame } from "../../../src/interfaces/game.interface";

describe("Crypto class", () => {
  const data: IStoreGame = {
    map: midGameMap1Move,
    timer: 12,
  };
  it("success encryption & decryption", () => {
    const encrypted = Crypto.encrypt(JSON.stringify(data));
    const decrypted = Crypto.decrypt(encrypted.data, encrypted.iv);
    expect(decrypted).toBe(JSON.stringify(data));
  });
});
