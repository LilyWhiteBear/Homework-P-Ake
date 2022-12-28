import { Component, OnInit } from '@angular/core';
import { FormValueService } from 'src/app/service/form-value.service';
import { RedirectService } from 'src/app/service/redirect.service';

@Component({
  selector: 'app-personal-step',
  templateUrl: './personal-step.component.html',
  styleUrls: ['../../validate-form/validate-form.component.scss', './personal-step.component.scss']
})
export class PersonalStepComponent implements OnInit {

  constructor(
    private redirectService: RedirectService,
    public formValueService: FormValueService
  ) { }

  ngOnInit(): void {
  }

  public Next(): void {
    if(this.formValueService.CanPersonalNext)
    {
      this.redirectService.ToStep(2);
    }
  }
}
