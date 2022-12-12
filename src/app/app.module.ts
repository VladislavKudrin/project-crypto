import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConnectedWalletButtonComponent } from './navbar/connected-wallet-button.component/connected-wallet-button.component';
import { WalletService } from './shared/services/wallet.service';
import { AccountViewComponent } from './account-view/account-view.component';
import { UtxoViewComponent } from './account-view/utxo-view/utxo-view.component';
import { AssetsViewComponent } from './account-view/assets-view/assets-view.component';
import { SendTransactionViewComponent } from './account-view/send-transaction-view/send-transaction-view.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BlockfrostService } from './shared/services/blockfrost.service';
import { AssetDetailsComponent } from './account-view/assets-view/asset-details/asset-details.component';
import { AssetDetailsTableComponent } from './account-view/assets-view/asset-details/asset-details-table/asset-details.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConnectedWalletButtonComponent,
    AccountViewComponent,
    UtxoViewComponent,
    AssetsViewComponent,
    SendTransactionViewComponent,
    AssetDetailsComponent,
    AssetDetailsTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    WalletService,
    BlockfrostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
