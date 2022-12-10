import { Component, OnInit } from '@angular/core';
import { CardanoWalletBalance } from 'src/app/shared/models/wallet.model';
import { WalletService } from 'src/app/shared/services/wallet.service';

@Component({
  selector: 'app-assets-view',
  templateUrl: './assets-view.component.html',
  styleUrls: ['./assets-view.component.scss']
})
export class AssetsViewComponent implements OnInit{

  public multiassets: any = [];

  public constructor(
    private walletService: WalletService,
  ){}

  public ngOnInit(): void {
    this.walletService.walletBalanceSubject.subscribe((balance: CardanoWalletBalance) => {
      this.multiassets = balance.multiassets;
    });
  }

}
