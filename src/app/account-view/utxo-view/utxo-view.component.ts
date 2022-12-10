import { Component, Input, OnInit } from '@angular/core';
import { WalletService } from 'src/app/shared/services/wallet.service';

@Component({
  selector: 'app-utxo-view',
  templateUrl: './utxo-view.component.html',
  styleUrls: ['./utxo-view.component.scss']
})
export class UtxoViewComponent implements OnInit{
  
  public utxos: any = [];

  public constructor(
    private walletService: WalletService,
  ){}

  public ngOnInit(): void {
    this.walletService.utxosSubject.subscribe((utxos) => {
      this.utxos = utxos;
    })
  }


}
