import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {
  @Input("title") titulo: string = 'Sin título';
  @Input() doughnutChartLabels: [];
  @Input() doughnutChartData: [];
  @Input() colors: [];
}
