import { Component, OnInit } from '@angular/core';
import { FormValueService } from 'src/app/service/form-value.service';
import { RedirectService } from 'src/app/service/redirect.service';

@Component({
  selector: 'app-otp-step',
  templateUrl: './otp-step.component.html',
  styleUrls: ['../../validate-form/validate-form.component.scss', './otp-step.component.scss']
})
export class OtpStepComponent implements OnInit {

  constructor(
    private redirectService: RedirectService,
    public formValueService: FormValueService
  ) { }

  ngOnInit(): void {
  }

  public Prev(): void {
    this.redirectService.ToStep(2);
  }

  public Submit(): void {
    if (this.formValueService.CanSubmit) {
      alert("Submitted!!!");
      this.redirectService.ToHome();
      this.formValueService.ResetForm();
    }
  }

}
