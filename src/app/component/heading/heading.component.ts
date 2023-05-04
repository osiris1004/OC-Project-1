import { Component, Input, OnInit } from '@angular/core';
import { IHeading } from 'src/app/core/models/Heading';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.scss']
})
export class HeadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input("headingInfo")
  public headingInfo!: IHeading;
}
