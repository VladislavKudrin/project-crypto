import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BlockfrostService } from 'src/app/shared/services/blockfrost.service';
import { Buffer } from 'buffer';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-asset-details',
  templateUrl: 'asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit, OnDestroy{

  public subscriptions: Subscription = new Subscription();

  public assetData;
  public assetMetadata;
  public mintsCols = ["TxHash", "Action", "Amount"];
  public mintsData;
  public ownersCols = ["Address", "Quantity"];
  public ownersData;
  public newMetadata;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      policyId: string,
      assetName: string
    },
    private blockfrostService: BlockfrostService
    ){}

  public ngOnInit(): void {
    const requestStr = this.data.policyId + Buffer.from(this.data.assetName).toString('hex');
    this.subscriptions.add(
      this.blockfrostService.getSpecificAsset(requestStr).subscribe(res => {
      this.assetData = res;
      if (res.onchain_metadata){
        this.assetMetadata = res.onchain_metadata;
        this.newMetadata = JSON.stringify(this.assetMetadata);
      }
      })
    )

    this.subscriptions.add(
      this.blockfrostService.getAssetHistory(requestStr).subscribe(res => {
        this.mintsData = res;
      })
    )

    this.subscriptions.add(
      this.blockfrostService.getAssetOwners(requestStr).subscribe(res => {
        this.ownersData = res;
      })
    )
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
