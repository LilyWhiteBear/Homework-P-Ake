import { Component, OnInit, Renderer2 } from '@angular/core';
import { KeyPressService } from 'src/app/service/key-press.service';
import { OmiseService } from 'src/app/service/omise.service';
import { ScriptService } from 'src/app/service/script.service';
import { Routing } from 'src/app/utils/constant/routing';
import { SessionQuery } from 'src/app/utils/session/session.query';

declare const OmiseCard: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  public price: string = "";
  private public_key = 'pkey_test_5u4x4cpik9z4sgwctkn';

  private userData: any;

  constructor(
    private renderer: Renderer2,
    private scriptService: ScriptService,
    private keyPressService: KeyPressService,
    private omiseService: OmiseService,
    private sessionQuery: SessionQuery
  ) {
  }

  ngOnInit(): void {
    this.GetUserData();
    const scriptElement = this.scriptService.loadScript(this.renderer, Routing.API.Omise.Script);
    scriptElement.onload = () => {
      OmiseCard.configure({
        publicKey: this.public_key,
      });
    }
  }

  public ChangePrice(event: any): void {
    this.price = event;
  }

  public get IsPriceValidate() {
    try {
      return !(parseFloat(this.keyPressService.transformAccountToNumeric(null, this.price)) > 0);
    }
    catch {
      return true;
    }
  }

  public OpenOmiseCardForm = (event: any) => {
    event.preventDefault();
    let numericPrice = parseFloat(this.keyPressService.transformAccountToNumeric(null, this.price)) * 100;
    OmiseCard.open({
      amount: numericPrice,
      submitFormTarget: '#checkout-form',
      frameDescription: 'Invoice #7777',
      locale: 'th',
      
      onCreateTokenSuccess: this.OnCreateTokenCardSuccess,
      onFormClosed: () => {
        /* Handler on form closure. */
      },
    })
  }

  public OpenOmiseIBForm = (event: any) => {
    event.preventDefault();
    let numericPrice = parseFloat(this.keyPressService.transformAccountToNumeric(null, this.price)) * 100;
    OmiseCard.open({
      defaultPaymentMethod: 'internet_banking',
      amount: numericPrice,
      submitFormTarget: '#checkout-form',
      frameDescription: 'Invoice #7777',
      locale: 'th',
      onCreateTokenSuccess: this.OnCreateTokenIBSuccess,
      onFormClosed: () => {
        /* Handler on form closure. */
      },
    })
  }

  private OnCreateTokenCardSuccess = (token: any) => {
    /* Handler on token or source creation.  Use this to submit form or send ajax request to server */
    let numericPrice = parseFloat(this.keyPressService.transformAccountToNumeric(null, this.price)) * 100;
    this.omiseService.PayByCreditCard({
      token: token,
      name: this.userData.usr ? this.userData.usr : '',
      email: `${this.userData.usr}@gmail.com`,
      amount: numericPrice
    }).subscribe((res) => {
      if(res.status === "successful") {
        alert("Transaction Success.");
        this.ClearAmount();
      }
      else {
        alert("Transaction Failed, please try again.");
      }
    });
  }

  private OnCreateTokenIBSuccess = (token: any) => {
    /* Handler on token or source creation.  Use this to submit form or send ajax request to server */
    let numericPrice = parseFloat(this.keyPressService.transformAccountToNumeric(null, this.price)) * 100;
    this.omiseService.PayByInternetBanking({
      token: token,
      amount: numericPrice
    }).subscribe((res) => {
      if(res.authorizeUri) {
        this.ClearAmount();
        window.location.href = res.authorizeUri;
      }
      else {
        alert("Transaction Failed, please try again.");
      }
    });
  }

  private GetUserData(): void {
    this.sessionQuery.getUserData().subscribe((data) => {
      this.userData = data;
    });
  }

  private ClearAmount(): void {
    this.price = "";
  }

}
