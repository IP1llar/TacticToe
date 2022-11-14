import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-robot-svg',
  templateUrl: './robot-svg.component.html',
  styleUrls: ['./robot-svg.component.css']
})
export class RobotSvgComponent implements OnInit {

  @Input() fillColor = 'blue'

  // TODO: Think about replacing svg with icon for ease

  constructor() { }

  ngOnInit(): void {
  }

}
