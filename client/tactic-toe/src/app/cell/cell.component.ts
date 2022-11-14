import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() value: string = '';

  @Output() clicked: boolean = false;

  @Input() height = 150;
  @Input() width = 150;
  @Input() color = 'black';

  constructor() { }

  ngOnInit(): void {
  }

}
