import { Component, OnInit } from '@angular/core';
import { Buffer } from 'buffer';
import { Value } from "@emurgo/cardano-serialization-lib-asmjs"
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
      console.log('Extension needed')
    }
  }

  public connectNamiWallet(): void {
    if (this.cardanoExtension.nami) {
      this.cardanoExtension.nami.enable().then(res => {
        this.cardanoWallet = {
          name: "nami",
          api: res
        };
        this.updateWallet(this.cardanoWallet);
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
        this.updateWallet(this.cardanoWallet);
        this.updateWalletBalance();
      }).catch(res => {
        
      })
    }
  }

  public updateWallet(wallet: CardanoWallet): void {
    this.walletService.walletSubject.next(wallet);
  }


  public updateWalletBalance = async () =>{
    try {
      const walletBalanceCBOR = await this.cardanoWallet.api.getBalance();
      const walletBalance = Value.from_bytes(Buffer.from(walletBalanceCBOR, "hex")).coin().to_str();
      this.walletService.walletBalanceSubject.next(
        walletBalance
      )
    } catch(err) {
      console.log(err);
    }
  }

}
