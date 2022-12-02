import { Component, Input, OnInit } from '@angular/core';
import { 
  faMagnifyingGlass,
  faWallet,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { CardanoWallet } from 'src/app/shared/models/wallet.model';

@Component({
  selector: 'app-connected-wallet-button',
  templateUrl: './connected-wallet-button.component.html',
  styleUrls: ['./connected-wallet-button.component.scss']
})
export class ConnectedWalletButtonComponent implements OnInit{
  @Input() cardanoWallet: CardanoWallet;

  public faMagnGlass: IconDefinition = faMagnifyingGlass;
  public faWallet:  IconDefinition = faWallet;

  public cardanoExtension: any = undefined;

  public ngOnInit(): void {
   
  }
}
