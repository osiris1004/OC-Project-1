import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';
import { Observable, of } from 'rxjs';
import { ICountry } from 'src/app/core/models/Olympic';
import { IParticipation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  
  public pieChart!: Chart<"pie", number[], string>;
  public totalCountries : number = 0
  public totalJOs : number = 0

  constructor(private olympicService: OlympicService, private route: Router) { }

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe(i => {

      console.log(i)

      if (i && i.length > 0) {

        const countries: string[] = i.map((i: ICountry) => i.country) 

        this.totalCountries = countries.length

        const medals  = i.map((i: ICountry) => i.participations
          .map((i: IParticipation) => (i.medalsCount)))


        const sumOfAllMedalsYears = medals.map(i => i.reduce((acc, i) => acc + i, 0))                            
        this.createPieChart(countries, sumOfAllMedalsYears);
      }
    })

  }



  createPieChart(countries: string[], sumOfAllMedalsYears: number[]) {
    const pieChart = new Chart("MyPieChart", {
      type: 'pie', 

      data: {
        labels: countries,
        datasets: [{
          label: 'Medals',
          data: sumOfAllMedalsYears,
          backgroundColor: [
            'red',
            'pink',
            'green',
            'yellow',
            'orange',
            'blue',
          ],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5,
        onClick:  (e) =>{
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

