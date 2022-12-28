import { Injectable } from '@angular/core';
import JSEncrypt from 'jsencrypt';
import * as CryptoJS from 'crypto-js';
// import * as cryptoBrowserify from 'crypto-browserify';
import { environment } from 'src/environments/environment';
import { isEmpty } from 'lodash';
import { SessionQuery } from '../utils/session/session.query';
import { Observable } from 'rxjs';
import { transaction } from '@datorama/akita';
import { SessionStore } from '../utils/session/session.store';
const cryptoBrowserify = require('crypto-browserify');
declare const Buffer: { from: (arg0: string, arg1: string) => any; };

@Injectable({
  providedIn: 'root'
})
export class RSAEncryptService {
  publicKey: string | undefined

  constructor(
    private sessionQuery: SessionQuery,
    private sessionStore: SessionStore
  ) {
    this._getPublicKey()
  }

  public publicEncrypt(text: string): string {
    if (text == '' || text == null || text == undefined) {
      return '';
    }
    if (!this.requireEncryption()) return text;

    const keyToEncrypt = this.getPublicKey();
    const obj = new JSEncrypt({});
    obj.setKey(keyToEncrypt);
    const encryptedText = obj.encrypt(text);
    if (encryptedText === false) {
      throw new Error('encryption error');
    }
    return encryptedText;
  }

  public privateDecrypt(text: string): string {
    if (!this.requireEncryption()) return text;

    const keyToDecrypt = this.getPrivatekey();
    const obj = new JSEncrypt({});
    obj.setKey(keyToDecrypt);
    const decryptedText = obj.decrypt(text);
    if (decryptedText === false) {
      throw new Error('decryption error');
    }
    return decryptedText;
  }

  public privateEncrypt(text: string, encoding: BufferEncoding = 'utf-8') {
    if (!this.requireEncryption() || text == null) return text;

    const keyToEncrypt = this.getPrivatekey();

    const bufferText = Buffer.from(text, encoding);
    const encrypted = cryptoBrowserify.privateEncrypt(keyToEncrypt, bufferText);
    return encrypted.toString("base64");
  }

  public publicDecrypt(text: string, encoding: BufferEncoding = 'base64') {
    if (!this.requireEncryption() || text == null || text == '') return text;

    const keyToDecrypt = this.getPublicKey();
    const bufferText = Buffer.from(text, encoding);
    const decrypted = cryptoBrowserify.publicDecrypt(keyToDecrypt, bufferText);
    return decrypted.toString();
  }

  // public sign(value: any) {
  //   const keyToSign = this.getPrivatekey();
  //   const obj = new JSEncrypt({});
  //   obj.setKey(keyToSign);
  //   return obj.sign(value, this.getHashMethod(), "whatever");
  // }

  // public verify(value: any, signature: any): boolean {
  //   const keyToVerify = this.getPublicKey();
  //   const obj = new JSEncrypt({});
  //   obj.setKey(keyToVerify);
  //   return obj.verify(value, signature, this.getHashMethod());
  // }

  // private getHashMethod(): (str: string) => string {
  //   return CryptoJS.SHA256;
  // }

  private async _getPublicKey() {
    this.getPublicKey$().subscribe(
      (key: string | undefined) => {
        this.publicKey = key;
      })
  }

  public getPublicKey$(): Observable<string | undefined> {
    return this.sessionQuery.select(state => state.publicKey)
  }

  private getPublicKey() {
    if (isEmpty(this.publicKey)) {
      throw new Error('pkey is empty');
    }

    return "-----BEGIN PUBLIC KEY-----\n" + this.publicKey + "\n-----END PUBLIC KEY-----";
  }

  private getPrivatekey() {
    return "";
  }

  @transaction()
  public setPublicKey(publicKey: string) {
    this.sessionStore.update({ publicKey: publicKey })
  }

  @transaction()
  public setStatusCd(statusCd: string) {
    this.sessionStore.update({ statusCd })
  }

  private requireEncryption(): boolean {
    return environment.apiService.encrypt;
  }
}
