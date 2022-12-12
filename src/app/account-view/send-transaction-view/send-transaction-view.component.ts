import { Component, OnInit } from '@angular/core';
import { WalletService } from 'src/app/shared/services/wallet.service';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { Buffer } from 'buffer';
import { 
  LinearFee,
  BigNum,
  TransactionBuilderConfigBuilder,
  Address,
  TransactionOutput,
  TransactionBuilder,
  Value,
  TransactionWitnessSet,
  Transaction
 } from "@emurgo/cardano-serialization-lib-asmjs"
import { BlockfrostService } from 'src/app/shared/services/blockfrost.service';

@Component({
  selector: 'app-send-transaction-view',
  templateUrl: './send-transaction-view.component.html',
  styleUrls: ['./send-transaction-view.component.scss']
})
export class SendTransactionViewComponent implements OnInit{

  public fromAddress: string;
  public toAddress;
  public lovelaceAmount: string;

  public transactionForm = new FormGroup({
    toAddress: new FormControl('', [
      Validators.required
    ]),
    amount: new FormControl(null, [
      Validators.required
    ]),
  });

  public constructor(
    private walletService: WalletService,
    private blockfrostService: BlockfrostService
  ){}

  public ngOnInit(): void {
    this.walletService.walletAddressSubject.subscribe((walletAddress: string) => {
      this.fromAddress = walletAddress;
    })
  }

  public async initTransactionBuilder(): Promise<TransactionBuilder> {

    const linearFee = LinearFee.new(
      BigNum.from_str('44'),
      BigNum.from_str('155381')
    );

    const txBuilderCfg = TransactionBuilderConfigBuilder.new()
      .fee_algo(linearFee)
      .pool_deposit(BigNum.from_str('500000000'))
      .key_deposit(BigNum.from_str('2000000'))
      .max_value_size(4000)
      .max_tx_size(8000)
      .coins_per_utxo_word(BigNum.from_str('34482'))
      .build();

    const txBuilder = TransactionBuilder.new(txBuilderCfg);
    return txBuilder;
  }

  public async buildTransaction(){
    try {
      const transactionBuilder = await this.initTransactionBuilder();
      const outputAddress = Address.from_bech32(this.toAddress);
      const changeAddress = Address.from_bech32(this.fromAddress);
      transactionBuilder.add_output(
        TransactionOutput.new(
          outputAddress,
            Value.new(BigNum.from_str(this.lovelaceAmount))
        ),
      );

      const txUnspentOutputs = await this.walletService.getUnspentOutputs();
      transactionBuilder.add_inputs_from(txUnspentOutputs, 1);
      transactionBuilder.add_change_if_needed(changeAddress);
      const txBody = transactionBuilder.build();
      const transactionWitnessSet = TransactionWitnessSet.new();
      const tx = Transaction.new(
        txBody,
        TransactionWitnessSet.from_bytes(transactionWitnessSet.to_bytes())
      )
      const cardanoWallet = await this.walletService.getWallet();
      let txVkeyWitnesses = await cardanoWallet.api.signTx(
        Buffer.from(tx.to_bytes()).toString("hex"), true);

      txVkeyWitnesses = TransactionWitnessSet.from_bytes(Buffer.from(txVkeyWitnesses, "hex"));
      transactionWitnessSet.set_vkeys(txVkeyWitnesses.vkeys());

      const signedTx = Transaction.new(
        tx.body(),
        transactionWitnessSet
      );

      const txResult = await cardanoWallet.api.submitTx(Buffer.from(signedTx.to_bytes()).toString("hex")).then(
        res => {
          this.walletService.refreshWallet();
          this.transactionForm.reset();
        }).catch(err => {
          console.log(err)
        })


      // this.blockfrostService.postSignedTransaction(signedTx.to_bytes()).subscribe(data => {
      //   console.log(data)
      //   this.walletService.refreshWallet();
      // })
    } catch (err) {
      console.log(err)
    }
  }

  public async submitTransaction(){
    this.toAddress = this.transactionForm.get('toAddress')?.value ;
    const adaAmount = this.transactionForm.get('amount')?.value;
    if (adaAmount){
      this.lovelaceAmount = (adaAmount * 1000000).toString();
    }
    await this.buildTransaction();
  }



}
