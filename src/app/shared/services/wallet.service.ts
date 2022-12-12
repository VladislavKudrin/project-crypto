import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';
import { Subject } from 'rxjs';
import { 
  Value,
  TransactionUnspentOutput,
  Address,
  TransactionUnspentOutputs
 } from "@emurgo/cardano-serialization-lib-asmjs"

import { CardanoWallet, CardanoWalletBalance } from '../models/wallet.model';

@Injectable()
export class WalletService {

  public walletBalanceSubject: Subject<CardanoWalletBalance> = new Subject<CardanoWalletBalance>();
  public walletSubject: Subject<CardanoWallet> = new Subject<CardanoWallet>();
  public walletAddressSubject: Subject<string> = new Subject<string>();
  public utxosSubject: Subject<any> = new Subject<any>();

  public walletBalance: CardanoWalletBalance;
  public cardanoWallet: CardanoWallet;
  public walletAddress: string;
  public utxos: any = [];

  public constructor(){}

  public async getWalletBalance(): Promise<CardanoWalletBalance> {
    return this.walletBalance;
  }
  
  public async getWallet(): Promise<CardanoWallet> {
    return this.cardanoWallet;
  }

  public async getWalletAddress(): Promise<any> {
    return this.walletAddress;
  }

  public async getUnspentOutputs(): Promise<any> {
    let txOutputs = TransactionUnspentOutputs.new();
    for (const utxo of this.utxos) {
      txOutputs.add(utxo.TransactionUnspentOutput)
    }
    console.log(this.utxos)
    return txOutputs;
  }

  public async updateWallet(wallet: CardanoWallet) {
    this.cardanoWallet = wallet;
    this.walletSubject.next(this.cardanoWallet);
    await this.updateWalletBalance();
    await this.updateWalletAddress();
    await this.updateUTXOs();
  }

  public async refreshWallet() {
    (<any>window).cardano.nami.enable().then(res => {
      this.cardanoWallet = {
        name: "nami",
        api: res
      };
      this.updateWallet(this.cardanoWallet);
    }).catch(res => {
      
    })
  }

  public async updateWalletAddress() {
    try {
      const raw = await this.cardanoWallet.api.getChangeAddress();
      this.walletAddress = Address.from_bytes(Buffer.from(raw, "hex")).to_bech32();
      this.walletAddressSubject.next(this.walletAddress);
    } catch (err) {
        console.log(err)
    }
  }

  public async updateWalletBalance() {
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

  public async updateUTXOs() {
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