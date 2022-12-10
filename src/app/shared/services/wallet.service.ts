import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';
import { Subject } from 'rxjs';
import { 
  Value,
  TransactionUnspentOutput
 } from "@emurgo/cardano-serialization-lib-asmjs"

import { CardanoWallet, CardanoWalletBalance } from '../models/wallet.model';

@Injectable()
export class WalletService {

  public walletBalanceSubject: Subject<CardanoWalletBalance> = new Subject<CardanoWalletBalance>();
  public walletSubject: Subject<CardanoWallet> = new Subject<CardanoWallet>();
  public utxosSubject: Subject<any> = new Subject<any>();

  public walletBalance: CardanoWalletBalance;
  public cardanoWallet: CardanoWallet;
  public utxos: any;

  public constructor(){}

  public getWalletBalance(): CardanoWalletBalance {
    return this.walletBalance;
  }
  
  public getWallet(): CardanoWallet {
    return this.cardanoWallet;
  }

  public getUTXOs(): any {
    return this.utxos;
  }

  public updateWallet(wallet: CardanoWallet): void {
    this.cardanoWallet = wallet;
    this.walletSubject.next(this.cardanoWallet);
    this.updateWalletBalance();
    this.updateUTXOs();
  }

  public updateWalletBalance = async () =>{
    try {
      const walletBalanceCBOR = await this.cardanoWallet.api.getBalance();
      const coins = Value.from_bytes(Buffer.from(walletBalanceCBOR, "hex")).coin().to_str();
      const multiasset = Value.from_bytes(Buffer.from(walletBalanceCBOR, "hex")).multiasset();
      let multiAssets: any = [];

      if (multiasset){
        const keys = multiasset.keys();
        const N = keys.len();

        for (let i = 0; i < N; i++){
          let multiAssetObj = {};
          const policyId = keys.get(i);
          const policyIdHex = Buffer.from(policyId.to_bytes()).toString("hex");
          const assets = multiasset.get(policyId);
          const assetNames = assets?.keys();
          if (assetNames){
            const K = assetNames.len();
            for (let j = 0; j < K; j++){
              const assetName = assetNames.get(j);
              const assetNameString = Buffer.from(assetName.name()).toString();
              const multiassetAmt = multiasset.get_asset(policyId, assetName);
              multiAssetObj = {
                name: assetNameString,
                amount: multiassetAmt.to_str(),
                policyId: policyIdHex
              };
              multiAssets.push(multiAssetObj);
            }
          }
        }
      }

      this.walletBalance = {
        coins: coins,
        multiassets: multiAssets
      };

      this.walletBalanceSubject.next(
        this.walletBalance
      )
    } catch(err) {
        console.log(err);
    }
  }

  public updateUTXOs = async () =>{
    this.utxos = [];
    try {
      const rawUtxos = await this.cardanoWallet.api.getUtxos()
      for (const rawUtxo of rawUtxos) {
        const utxo = TransactionUnspentOutput.from_bytes(Buffer.from(rawUtxo, "hex"));
        const input = utxo.input();
        const txindx = input.index();
        const txid = Buffer.from(input.transaction_id().to_bytes()).toString("hex");
        const output = utxo.output();
        const amount = output.amount().coin().to_str();
        const multiasset = output.amount().multiasset();
        let multiAssetStr = "";

        if (multiasset) {
          const keys = multiasset.keys();
          const N = keys.len();

          for (let i = 0; i < N; i++){
            const policyId = keys.get(i);
            const policyIdHex = Buffer.from(policyId.to_bytes()).toString("hex");
            const assets = multiasset.get(policyId);
            const assetNames = assets?.keys();
            if (assetNames){
              const K = assetNames.len()
              for (let j = 0; j < K; j++) {
                const assetName = assetNames.get(j);
                const assetNameString = Buffer.from(assetName.name()).toString();
                const multiassetAmt = multiasset.get_asset(policyId, assetName)
                multiAssetStr += `+ ${multiassetAmt.to_str()} (${assetNameString})`;
              }
            }
          }
        }

        const utxoObj = {
          txid: txid,
          txindx: txindx,
          amount: amount,
          multiasset: multiAssetStr,
          TransactionUnspentOutput: utxo
        };

        this.utxos.push(utxoObj);
      }
    this.utxosSubject.next(this.utxos);
    } catch(err) {
        console.log(err);
    }
  }

    
}