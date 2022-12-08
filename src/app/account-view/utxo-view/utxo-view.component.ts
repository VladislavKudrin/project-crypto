import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-utxo-view',
  templateUrl: './utxo-view.component.html',
  styleUrls: ['./utxo-view.component.scss']
})
export class UtxoViewComponent implements OnInit{
 @Input() utxos;

  public constructor(

  ){}

  public ngOnInit(): void {
    console.log(this.utxos)
  }

}
