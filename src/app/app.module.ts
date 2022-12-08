import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConnectedWalletButtonComponent } from './navbar/connected-wallet-button.component/connected-wallet-button.component';
import { WalletService } from './shared/services/wallet.service';
import { AccountViewComponent } from './account-view/account-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConnectedWalletButtonComponent,
    AccountViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [WalletService],
  bootstrap: [AppComponent]
})
export class AppModule { }
