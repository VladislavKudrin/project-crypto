import { Component, OnInit } from '@angular/core';
import { CardanoWallet } from '../shared/models/wallet.model';
import { 
  faMagnifyingGlass,
  faWallet,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

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
      console.log("wda")
    }
  }

  public connectNamiWallet(): void {
    if (this.cardanoExtension.nami) {
      this.cardanoExtension.nami.enable().then(res => {
        this.cardanoWallet = {
          name: "nami",
          api: res
        };
      }).catch(res => {
        
      })
    }
  }

  public connectFlintWallet(): void {
    if (this.cardanoExtension.flint) {
      this.cardanoExtension.nami.enable().then(res => {
        this.cardanoWallet = {
          name: "flint",
          api: res
        };
      }).catch(res => {
        
      })
    }
  }

}
