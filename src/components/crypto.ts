import { ICrypto } from "../interfaces/components.interface";
import * as crypto from "crypto";

const algorithm: string = process.env["CRYPTO_ALGORITHM"] || "aes-256-cbc";
const key = crypto.randomBytes(+(process.env["CRYPTO_KEY"] || 0));
const iv = crypto.randomBytes(+(process.env["CRYPTO_IV"] || 0));
class Crypto implements ICrypto {
  encrypt(data: string): { iv: string; data: string } {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const encrypted = cipher.update(data);
    const result = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString("hex"), data: result.toString("hex") };
  }

  decrypt(encryptedString: string, ivString: string): string {
    const ivBuffer = Buffer.from(ivString, "hex");
    const encryptedBuffer = Buffer.from(encryptedString, "hex");
    const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
    const decrypted = decipher.update(encryptedBuffer);
    const result = Buffer.concat([decrypted, decipher.final()]);
    return result.toString();
  }
}

const cryptoService = new Crypto();
export { cryptoService as Crypto };
