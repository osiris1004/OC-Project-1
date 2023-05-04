import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Chart from 'chart.js/auto';
import { Subject, takeUntil } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public lineChart!: Chart<"line", string[], number>;
  public countryName!: string | null;
  public totalEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;
  public error!: string;
  public headingInfo = {
    headingTitle: this.countryName,
    data: [
      {
        label: "Number of entries",
        data: this.totalEntries
      },
      {
        label: "Total Number of medals",
        data: this.totalMedals
      },
      {
        label: "Total Number of athletes",
        data: this.totalAthletes
      },
    ]
  }

  private readonly ngUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let country: string | null = null

    this.route.paramMap.subscribe((param: ParamMap) => country = param.get('country'))

    this.olympicService.getOlympics()
      .pipe(takeUntil(this.ngUnsubscribe$)).subscribe(
        (data) => {
          if (data && data.length > 0) {
            const selectedCountry = data.find((i: Olympic) => i.country === country) //      
            this.countryName = selectedCountry?.country ?? null
            this.headingInfo.headingTitle = this.countryName

            const participations = selectedCountry?.participations.map((i: Participation) => i)
            this.totalEntries = participations?.length ?? 0
            this.headingInfo.data[0].data = this.totalEntries

            //#years
            const years = selectedCountry?.participations.map((i: Participation) => i.year) ?? []

            //medals
            const medals = selectedCountry?.participations.map((i: Participation) => i.medalsCount.toString()) ?? []
            this.totalMedals = medals.reduce((accumulator, item) => accumulator + parseInt(item), 0)
            this.headingInfo.data[1].data = this.totalMedals

            //#athletes
            const athletes = selectedCountry?.participations.map((i: Participation) => i.athleteCount.toString()) ?? []
            this.totalAthletes = athletes.reduce((accumulator, item) => accumulator + parseInt(item), 0)
            this.headingInfo.data[2].data = this.totalAthletes

            this.createLineChart(years, medals)
          }
        },
        (error: HttpErrorResponse) => {
          this.error = error.message
        })
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.unsubscribe();
  }

  createLineChart(years: number[], medals: string[]) {
    const lineChart = new Chart("MyLineChart", {
      type: 'line',
      data: {
        labels: years,
        datasets: [
          {
            label: "medals",
            data: medals,
            backgroundColor: '#0b868f'
          },
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });

    this.lineChart = lineChart
  }

}
