import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RedirectService } from 'src/app/service/redirect.service';
import { FormValueService } from 'src/app/service/form-value.service';

@Component({
  selector: 'app-validate-form',
  templateUrl: './validate-form.component.html',
  styleUrls: ['./validate-form.component.scss']
})
export class ValidateFormComponent implements OnInit {

  public items: MenuItem[] = [];

  constructor(
    private redirectService: RedirectService,
    public formValueService: FormValueService
  ) {

  }

  ngOnInit(): void {
    this.redirectService.ToStep(1);
    this.formValueService.ResetForm();
    this.items = [{
      label: 'Personal',
      routerLink: 'step1'
    },
    {
      label: 'Payment',
      routerLink: 'step2'
    },
    {
      label: 'OTP',
      routerLink: 'step3'
    }
    ];
  }
}
