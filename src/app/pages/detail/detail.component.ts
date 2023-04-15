import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Chart from 'chart.js/auto';
import { Subject, takeUntil } from 'rxjs';
import { ICountry } from 'src/app/core/models/Olympic';
import { IParticipation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public lineChart!: Chart<"line", string[], number>;
  public lineChart_2!: Chart<"line", string[], number>;
  public countryName!: string | null;
  public totalEntries: number = 0;
  public totalMedals: number = 0;
  public totalAthletes: number = 0;

  private readonly ngUnsubscribe$: Subject<void> = new Subject<void>();

  constructor(private olympicService: OlympicService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let country: string | null = null

    this.route.paramMap.subscribe((param: ParamMap) => country = param.get('country'))

    this.olympicService.getOlympics()
      .pipe(takeUntil(this.ngUnsubscribe$)).subscribe(i => {
        if (i && i.length > 0) {
          const selectedCountry = i.find((i: ICountry) => i.country === country) //      
          this.countryName = selectedCountry?.country ?? null

          const participations = selectedCountry?.participations.map((i: IParticipation) => i)
          this.totalEntries = participations?.length ?? 0
          //#years
          const years = selectedCountry?.participations.map((i: IParticipation) => i.year) ?? []

          //medals
          const medals = selectedCountry?.participations.map((i: IParticipation) => i.medalsCount.toString()) ?? []
          this.totalMedals = medals.reduce((accumulator, item) => accumulator + parseInt(item), 0)

          //#athletes
          const athletes = selectedCountry?.participations.map((i: IParticipation) => i.athleteCount.toString()) ?? []
          this.totalAthletes = athletes.reduce((accumulator, item) => accumulator + parseInt(item), 0)


          this.createLineChart(years, medals, athletes)
          this.createLineChart_2(years, medals)

        }
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.unsubscribe();
  }

  createLineChart(years: number[], medals: string[], athletes: string[]) {
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
          {
            label: "athletes",
            data: athletes,
            backgroundColor: '#adc3de'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });

    this.lineChart = lineChart
  }

  createLineChart_2(years: number[], medals: string[]) {
    const lineChart = new Chart("MyLineChart_2", {
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

    this.lineChart_2 = lineChart
  }

}
