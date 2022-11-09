import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() value: string = '';

  @Output() clicked: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
