import { Component, Input, OnInit } from '@angular/core';
import { 
  faMagnifyingGlass,
  faWallet,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { CardanoWallet } from 'src/app/shared/models/wallet.model';
import { WalletService } from 'src/app/shared/services/wallet.service';

@Component({
  selector: 'app-connected-wallet-button',
  templateUrl: './connected-wallet-button.component.html',
  styleUrls: ['./connected-wallet-button.component.scss']
})
export class ConnectedWalletButtonComponent implements OnInit{
  @Input() walletName: string;

  public faMagnGlass: IconDefinition = faMagnifyingGlass;
  public faWallet:  IconDefinition = faWallet;

  public cardanoExtension: any = undefined;
  public walletBalance: string;

  public constructor(
    private walletService: WalletService,
  ){}

  public ngOnInit(): void {
    this.walletService.walletBalanceSubject.subscribe((balance: string) => {
      this.walletBalance = balance;
    })
  }

  public convertWalletBalance(walletBalance: string): number{
    return Math.round((Number(walletBalance) * 10 **-6));
  }

}
