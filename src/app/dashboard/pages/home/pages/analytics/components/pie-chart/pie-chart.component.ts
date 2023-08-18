import { Component, ViewChild } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  // Pie
  public pieChartOptionsProg: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      datalabels: {
        // formatter: (value: any, ctx: any) => {
        //   if (ctx.chart.data.labels) {
        //     return ctx.chart.data.labels[ctx.dataIndex];
        //   }
        // },
        display: false,
      },
    },
  };
  public pieChartDataProg: ChartData<'pie', number[], string | string[]> = {
    labels: ['Angular', 'ReactJS', 'C#', 'Javascript', 'PostgreSQL', 'Java', 'Phyton', 'PHP'],
    datasets: [
      {
        data: [522, 455, 193, 788, 230, 222, 633, 99],
        backgroundColor: ['#36a2eb', '#ff6384', '#c9cbcf', '#ff9f40', '#9966ff', '#ffcd56', '#ff9880', '#b498e4']
      },

    ],
  };


  public pieChartTypeProg: ChartType = 'pie';
  public pieChartPluginsProg = [DatalabelsPlugin];

  // Pie
  public pieChartOptionsDesing: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      datalabels: {
        // formatter: (value: any, ctx: any) => {
        //   if (ctx.chart.data.labels) {
        //     return ctx.chart.data.labels[ctx.dataIndex];
        //   }
        // },
        display: false,
      },
    },
  };
  public pieChartDataDesing: ChartData<'pie', number[], string | string[]> = {
    labels: ['Adobe XD', 'Figma', 'Ilustrator', 'Photoshop', 'After Effect'],
    datasets: [
      {
        data: [253, 886, 253, 621, 321],
        backgroundColor: ['#ff9f40', '#9966ff', '#36a2eb', '#ff6384', '#c9cbcf']
      },
    ],
  };
  public pieChartTypeDesing: ChartType = 'pie';
  public pieChartPluginsDesing = [DatalabelsPlugin];

  // Pie
  public pieChartOptionsDataProd: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      datalabels: {
        // formatter: (value: any, ctx: any) => {
        //   if (ctx.chart.data.labels) {
        //     return ctx.chart.data.labels[ctx.dataIndex];
        //   }
        // },
        display: false,
      },
    },
  };
  public pieChartDataDataProd: ChartData<'pie', number[], string | string[]> = {
    labels: ['R Studio', 'Tableau', 'Power BI', 'Excel', 'Blockchain'],
    datasets: [
      {
        data: [327, 683, 554, 352, 103],
        backgroundColor: ['#36a2eb', '#ff6384', '#c9cbcf', '#ff9f40', '#9966ff']
      },
    ],
  };
  public pieChartTypeDataProd: ChartType = 'pie';
  public pieChartPluginsDataProd = [DatalabelsPlugin];
}

