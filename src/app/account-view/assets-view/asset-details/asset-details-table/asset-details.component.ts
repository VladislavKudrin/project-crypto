import { Component, Input, OnInit } from '@angular/core';




@Component({
  selector: 'app-asset-details-table',
  templateUrl: 'asset-details-table.component.html',
  styleUrls: ['./asset-details-table.component.scss']
})
export class AssetDetailsTableComponent implements OnInit{
  @Input() cols;
  @Input() data;
  @Input() mintedTable: boolean = false;
  @Input() ownersTable: boolean = false;


  constructor(
    ){}

  public ngOnInit(): void {

  }

}
