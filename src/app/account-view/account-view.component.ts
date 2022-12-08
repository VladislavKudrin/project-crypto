import { Component, OnInit } from '@angular/core';
import { CardanoWallet } from '../shared/models/wallet.model';
import { WalletService } from '../shared/services/wallet.service';

@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit{

  public cardanoWallet: CardanoWallet;

  public constructor(
    private walletService: WalletService,
  ){};

  public ngOnInit(): void {
    // this.walletService.walletSubject.subscribe((wallet:CardanoWallet) => {
    //   this.cardanoWallet = wallet;
    // })
  }
}
