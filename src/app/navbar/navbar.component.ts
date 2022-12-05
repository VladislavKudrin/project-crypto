import { Component, OnInit } from '@angular/core';
import {Buffer} from 'buffer';
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
import { 
  faMagnifyingGlass,
  faWallet,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

import { CardanoWallet } from '../shared/models/wallet.model';
import { WalletService } from '../shared/services/wallet.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  public faMagnGlass: IconDefinition = faMagnifyingGlass;
  public faWallet:  IconDefinition = faWallet;

  public cardanoExtension: any = undefined;
  public cardanoWallet: CardanoWallet; 
  public walletBalance: string;

  public constructor(
    private walletService: WalletService,
  ){}

  public ngOnInit(): void {
    if ((<any>window).cardano) {
      this.cardanoExtension = (<any>window).cardano;
    }
  }


  public connectWallet(wallet: string): void {
    if (this.cardanoExtension) {
      switch (wallet){
        case "nami":
          this.connectNamiWallet();
          break;
        case "flint":
          this.connectFlintWallet();
          break;
      } 
    } else {
      console.log("No extension detected") //do popup
    }
  }

  public connectNamiWallet(): void {
    if (this.cardanoExtension.nami) {
      this.cardanoExtension.nami.enable().then(res => {
        this.cardanoWallet = {
          name: "nami",
          api: res
        };
        this.updateWalletBalance();
      }).catch(res => {
        
      })
    }
  }

  public connectFlintWallet(): void {
    if (this.cardanoExtension.flint) {
      this.cardanoExtension.flint.enable().then(res => {
        this.cardanoWallet = {
          name: "flint",
          api: res
        };
        this.updateWalletBalance();
      }).catch(res => {
        
      })
    }
  }


  public updateWalletBalance = async () =>{
    try {
      const walletBalance = await this.cardanoWallet.api.getBalance();
      console.log(Value.from_bytes(Buffer.from(walletBalance, "hex")));
      this.walletService.walletBalanceSubject.next(
        walletBalance
      )
    } catch(err) {
      console.log(err);
    }
  }

}
