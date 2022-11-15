import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  @Input() value: string = '';

  @Output() clicked: boolean = false;

  @Input() height?:number;
  @Input() width?:number;
  @Input() color = 'black';
  @Input() breakpoint = [700, 20]
  @Input() responsive = false

  calculatedDimensions = [`${this.height}px`, `${this.width}px`]

  constructor(private breakpointObserver : BreakpointObserver) { }

  ngOnInit(): void {
    if (this.responsive) {
      this.breakpointObserver
        .observe([`(min-width: ${this.breakpoint[0]}px)`])
        .subscribe((state: BreakpointState) => {
          if (!state.matches && this.responsive) {
            console.log('doing this')
            this.calculatedDimensions = [`min(${this.height}px, ${this.breakpoint[1]}vw)`, `min(${this.height}px, ${this.breakpoint[1]}vw)`]
          } else if (this.responsive) {
            this.calculatedDimensions = [`${this.height}px`, `${this.width}px`]
          }
        })
    }
  }

}
