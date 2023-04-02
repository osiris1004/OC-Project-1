import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import Chart from 'chart.js/auto';
import { ICountry } from 'src/app/core/models/Olympic';
import { IParticipation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(private olympicService: OlympicService, private route : ActivatedRoute) { }

  ngOnInit(): void {

    let country : string | null = null

    this.route.paramMap.subscribe((param : ParamMap)=>country= param.get('country'))

    this.olympicService.getOlympics().forEach(i => {
      if (i && i.length > 0) {
        const selectedCountry : ICountry = i.find((i: ICountry) => i.country === country) // 
      console.log({selectedCountry})                             

        const participations = selectedCountry.participations.map((i: IParticipation)=>i)
        this.totalEntries = participations.length
        //#years
        const years = selectedCountry.participations.map((i: IParticipation)=>i.year)

        //medals
        const medals = selectedCountry.participations.map((i: IParticipation)=>i.medalsCount.toString())
        this.totalMedals = medals.reduce((accumulator, item)=>accumulator + parseInt(item), 0)

        //#athletes
        const athletes = selectedCountry.participations.map((i: IParticipation)=>i.athleteCount.toString())
        this.totalAthletes = athletes.reduce((accumulator, item)=>accumulator + parseInt(item), 0)


        this.createLineChart(years, medals, athletes)
        this.createBarChart(years, medals, athletes)
      }
       
    
    })

  }
    
  


  public lineChart!:  Chart<"line", string[], number>;
  public barChart!: Chart<"bar", string[], number>;
  public totalEntries : number = 0
  public totalMedals : number = 0
  public totalAthletes : number = 0


  createLineChart(years :number[], medals:string[], athletes:string[]){
  
    const lineChart = new Chart("MyLineChart", {
      type: 'line', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: years, 
	       datasets: [
          
          {
            label: "medals",
            data: medals,
            backgroundColor: 'yellow'
          },
          {
            label: "athletes",
            data: athletes,
            backgroundColor: 'red'
          }    
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });

    this.lineChart = lineChart
  }


  
  createBarChart(years :number[], medals:string[], athletes:string[]){
  
    const barChart = new Chart("MyBarChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: years, 
	       datasets: [
          
          {
            label: "medals",
            data: medals,
            backgroundColor: 'yellow'
          }
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });

    this.barChart = barChart
  }

}
