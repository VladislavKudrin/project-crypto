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
  public wallet: CardanoWallet; 

  public ngOnInit(): void {
    if ((<any>window).cardano) {
      this.cardanoExtension = (<any>window).cardano;
    }
  }


  public connectNami(): void {
    if (this.cardanoExtension.nami) {
      this.cardanoExtension.nami.enable().then(res => {
        this.wallet = {
          name: "nami",
          api: res
        };
      }).catch(res => {
        
      })
    }
  }
}
