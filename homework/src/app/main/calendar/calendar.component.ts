import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  public date!: Date;

  constructor(
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      let year: HTMLElement | null = document.querySelector(".p-datepicker-year") as HTMLElement;
      year.innerHTML = (parseInt(year.innerHTML) + 543).toString();
      this.addButtonClickListener();
    }, 0);
  }

  public OnYearChange(event: any): void {
    setTimeout(() => {
      let year: HTMLElement | null = document.querySelector(".p-datepicker-year") as HTMLElement;
      year.innerHTML = (parseInt(event.year) + 543).toString();
      this.addButtonClickListener();
    }, 0);
  }

  private addButtonClickListener(): void {
    let year: HTMLElement | null = document.querySelector(".p-datepicker-year") as HTMLElement;
    year.addEventListener('click', () => {
      this.OnDecadeChange();
    });
    let nextButton: HTMLElement | null = document.querySelector(".p-datepicker-next") as HTMLElement;
    nextButton.addEventListener('click', () => {
      this.OnDecadeChange();
    });
    let prevButton: HTMLElement | null = document.querySelector(".p-datepicker-prev") as HTMLElement;
    prevButton.addEventListener('click', () => {
      this.OnDecadeChange();
    });
  }

  private OnDecadeChange(): void {
    setTimeout(() => {
      let years: HTMLElement[] | null = document.querySelectorAll(".p-yearpicker-year") as unknown as HTMLElement[];
      let titleYears: HTMLElement | null = document.querySelector(".p-datepicker-decade") as HTMLElement;
      years.forEach((year) => {
        year.innerHTML = (parseInt(year.innerHTML) + 543).toString();
      });
      try {
        titleYears.innerHTML = (parseInt(years[0].innerHTML)).toString() + " - " + (parseInt(years[years.length - 1].innerHTML)).toString();
      }
      catch {
        //no innerHTML found
      }
    }, 0);
  }

  public SelectDate(event : any) : void {
    console.log(event.toLocaleDateString('th-TH'));
  }
}
