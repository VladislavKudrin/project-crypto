import { Component, OnInit} from '@angular/core';
import { CardanoWallet } from '../shared/models/wallet.model';
import { WalletService } from '../shared/services/wallet.service';
import { Buffer } from 'buffer';
import {
  Address,
  BaseAddress,
  MultiAsset,
  Assets,
  ScriptHash,
  Costmdls,
  Language,
  CostModel,
  AssetName,
  TransactionUnspentOutput,
  TransactionUnspentOutputs,
  TransactionOutput,
  Value,
  TransactionBuilder,
  TransactionBuilderConfigBuilder,
  TransactionOutputBuilder,
  LinearFee,
  BigNum,
  BigInt,
  TransactionHash,
  TransactionInputs,
  TransactionInput,
  TransactionWitnessSet,
  Transaction,
  PlutusData,
  PlutusScripts,
  PlutusScript,
  PlutusList,
  Redeemers,
  Redeemer,
  RedeemerTag,
  Ed25519KeyHashes,
  ConstrPlutusData,
  ExUnits,
  Int,
  NetworkInfo,
  EnterpriseAddress,
  TransactionOutputs,
  hash_transaction,
  hash_script_data,
  hash_plutus_data,
  ScriptDataHash, Ed25519KeyHash, NativeScript, StakeCredential
} from "@emurgo/cardano-serialization-lib-asmjs"
import { provideImgixLoader } from '@angular/common';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit{

  public cardanoWallet: CardanoWallet;
  public utxos: any = [];

  public constructor(
    private walletService: WalletService,
  ){};

  public ngOnInit(): void {
    this.walletService.walletSubject.subscribe((wallet:CardanoWallet) => {
      this.cardanoWallet = wallet;
      this.getUTXOs();
    })
  }

  public getUTXOs = async () =>{
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
        const utxoObj = {
          txid: txid,
          txindx: txindx,
          amount: amount,
          TransactionUnspentOutput: utxo
        }
        this.utxos.push(utxoObj);
       }
    } catch(err) {
      console.log(err);
    }
  }

}
