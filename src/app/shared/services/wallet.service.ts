import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class WalletService {

    public walletBalanceSubject: Subject<string> = new Subject<string>();

    public constructor(){}

    
}