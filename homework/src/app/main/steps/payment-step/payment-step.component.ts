import { Component, OnInit } from '@angular/core';
import { FormValueService } from 'src/app/service/form-value.service';
import { RedirectService } from 'src/app/service/redirect.service';

@Component({
  selector: 'app-payment-step',
  templateUrl: './payment-step.component.html',
  styleUrls: ['../../validate-form/validate-form.component.scss', './payment-step.component.scss']
})
export class PaymentStepComponent implements OnInit {

  constructor(
    private redirectService: RedirectService,
    public formValueService: FormValueService
  ) { }

  ngOnInit(): void {
  }

  public Prev(): void {
    this.redirectService.ToStep(1);
  }

  public Next(): void {
    if(this.formValueService.CanPaymentNext)
    {
      this.redirectService.ToStep(3);
    }
  }

}
