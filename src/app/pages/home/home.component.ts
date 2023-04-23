import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import {Subject, Subscription, takeUntil } from 'rxjs';
import { Olympic } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public pieChart!: Chart<"pie", number[], string>;
  public totalCountries: number = 0
  public totalJOs: number = 0
  public error!:string
  private  ngUnsubscribe?: Subscription

  constructor(private olympicService: OlympicService, private route: Router) { }

  ngOnInit(): void {
    this.ngUnsubscribe =this.olympicService.getOlympics().subscribe(
        (data) => {
          if (data && data.length > 0) {
            this.totalJOs = Array.from(new Set(data.map(i => i.participations.map(f => f.year)).flat())).length

            const countries: string[] = data.map((i: Olympic) => i.country)
            this.totalCountries = countries.length

            const medals = data.map((i: Olympic) => i.participations.map((i: Participation) => (i.medalsCount)))
            const sumOfAllMedalsYears = medals.map(i => i.reduce((acc, i) => acc + i, 0))

            this.createPieChart(countries, sumOfAllMedalsYears);
          }
        },
        (error:HttpErrorResponse) => {
          this.error = error.message
        }
      )
  }

  ngOnDestroy() {
    if(this.ngUnsubscribe) return this.ngUnsubscribe.unsubscribe();
  }

  createPieChart(countries: string[], sumOfAllMedalsYears: number[]) {
    const pieChart = new Chart("MyPieChart", {
      type: 'pie',
      data: {
        labels: countries,
        datasets: [{
          label: 'Medals',
          data: sumOfAllMedalsYears,
          backgroundColor: ['#0b868f', '#adc3de', '#7a3c53', '#8f6263', 'orange', '#94819d'],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5,
        onClick: (e) => {
          if (e.native) {
            const points = pieChart.getElementsAtEventForMode(e.native, 'point', { intersect: true }, true)
            if (points.length) {
              const firstPoint = points[0];
              const label = pieChart.data.labels ? pieChart.data.labels[firstPoint.index] : ''
              const value = pieChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index]
              this.route.navigate(['detail', label])
            }
          }
        }
      }
    });
    this.pieChart = pieChart
  }
}

