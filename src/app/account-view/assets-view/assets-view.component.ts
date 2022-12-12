import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CardanoWalletBalance } from 'src/app/shared/models/wallet.model';
import { BlockfrostService } from 'src/app/shared/services/blockfrost.service';
import { WalletService } from 'src/app/shared/services/wallet.service';
import { AssetDetailsComponent } from './asset-details/asset-details.component';

@Component({
  selector: 'app-assets-view',
  templateUrl: './assets-view.component.html',
  styleUrls: ['./assets-view.component.scss']
})
export class AssetsViewComponent implements OnInit{

  public multiassets: any = [];

  public constructor(
    private walletService: WalletService,
    private blockfrostService: BlockfrostService,
    public dialog: MatDialog
  ){}

  public ngOnInit(): void {
    this.walletService.walletBalanceSubject.subscribe((balance: CardanoWalletBalance) => {
      this.multiassets = balance.multiassets;
    });
  }

  public openDialog(policyId, assetName) {
    const dialogRef = this.dialog.open(AssetDetailsComponent, {
      height: '700px',
      width: '100%',
      data: {
        policyId: policyId,
        assetName: assetName
      },
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

