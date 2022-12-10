import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-assets-view',
  templateUrl: './assets-view.component.html',
  styleUrls: ['./assets-view.component.scss']
})
export class AssetsViewComponent implements OnInit{
 @Input() utxos;

  public constructor(

  ){}

  public ngOnInit(): void {
    console.log(this.utxos)
  }

}
