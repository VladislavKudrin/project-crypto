import { Component, OnInit} from '@angular/core';
import { CardanoWallet } from '../shared/models/wallet.model';
import { WalletService } from '../shared/services/wallet.service';
import { Buffer } from 'buffer';


@Component({
  selector: 'app-account-view',
  templateUrl: './account-view.component.html',
  styleUrls: ['./account-view.component.scss']
})
export class AccountViewComponent implements OnInit{

  public constructor(){};

  public ngOnInit(): void {

  }

}
