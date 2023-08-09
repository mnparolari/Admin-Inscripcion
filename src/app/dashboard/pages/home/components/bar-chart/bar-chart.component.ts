import { Component, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartData<'bar'> = {
    labels: ['Ene/Feb/Mar', 'Abr/May/Jun', 'Jul/Ago/Sept', 'Oct/Nov/Dic'],
    datasets: [
      { data: [65, 59, 44, 71], label: 'Programación y Desarrollo' },
      { data: [18, 18, 50, 69], label: 'Diseño UX/UI' },
      { data: [8, 28, 22, 19], label: 'Data' },
      { data: [12, 15, 4, 22], label: 'Producto' }
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  //   public randomize(): void {
  //     // Only Change 3 values
  //     this.barChartData.datasets[0].data = [
  //       Math.round(Math.random() * 100),
  //       59,
  //       80,
  //       Math.round(Math.random() * 100),
  //       56,
  //       Math.round(Math.random() * 100),
  //       40,
  //     ];

  //     this.chart?.update();
  //   }
}
