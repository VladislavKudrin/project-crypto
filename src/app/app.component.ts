import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardanoWallet } from './shared/models/wallet.model';
import { WalletService } from './shared/services/wallet.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  public cardanoWallet: CardanoWallet;

  public constructor(
  private walletService: WalletService,
  ){};

  public ngOnInit(): void {
    this.walletService.walletSubject.subscribe((wallet: CardanoWallet) => {
      this.cardanoWallet = wallet;
    })
  }

}
