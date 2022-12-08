import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CardanoWallet } from '../models/wallet.model';


@Injectable()
export class WalletService {

    public walletBalanceSubject: Subject<string> = new Subject<string>();
    public walletSubject: Subject<CardanoWallet> = new Subject<CardanoWallet>();

    public constructor(){}

    
}