import { Component, Input, OnInit } from '@angular/core';
import { Buffer } from 'buffer';



@Component({
  selector: 'app-metadata-table',
  templateUrl: 'metadata-table.component.html',
  styleUrls: ['./metadata-table.component.scss']
})
export class MetadataTableComponent implements OnInit{

  @Input() data;

  public metaData = {};
  public metaDataStr: string;
  public tokenStandard = {
    "CIP25v1": "721"
  }

  constructor(
    ){}

  public ngOnInit(): void {
    let nftMetaData = {};
    nftMetaData[Buffer.from(this.data.asset_name, "hex").toString()] = this.data.onchain_metadata;
    this.metaData[this.data.policy_id] = nftMetaData;
    this.metaDataStr = JSON.stringify(this.metaData, null, 4);
  }

}
