import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Buffer } from 'buffer';

@Injectable()
export class BlockfrostService{

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/cbor',
      'project_id': environment.blockfrostApiKey
    })
  };

  public constructor(
    private http: HttpClient
  ){}

  public postSignedTransaction(requestBody){

    let tx: Buffer;
    if (typeof requestBody === 'string') {
      tx = Buffer.from(requestBody, 'hex');
    } else {
      tx = Buffer.from(requestBody);
    }
    console.log(tx.toString("hex"))
    return this.http.post<any>(
      "https://cardano-preprod.blockfrost.io/api/v0/tx/submit", 
      tx.toString("hex"), this.httpOptions);
  }

  public getSpecificAsset(requestBody){
    return this.http.get<any>(
      `https://cardano-preprod.blockfrost.io/api/v0/assets/${requestBody}`, 
      this.httpOptions);
  }

  public getAssetHistory(requestBody){
    return this.http.get<any>(
      `https://cardano-preprod.blockfrost.io/api/v0/assets/${requestBody}/history`, 
      this.httpOptions);
  }

  public getAssetOwners(requestBody){
    return this.http.get<any>(
      `https://cardano-preprod.blockfrost.io/api/v0/assets/${requestBody}/addresses`, 
      this.httpOptions);
  }

}