import { Component, OnInit } from "@angular/core";
import Chart from "chart.js/auto";
@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.css"],
})
export class PieChartComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    this.createChart();
  }
  public chart: any;
  createChart() {
    this.chart = new Chart("MyPieChart", {
      type: "pie", //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: ["Red", "Pink", "Green", "Yellow", "Orange", "Blue"],
        datasets: [
          {
            label: "My First Dataset",
            borderColor: "#bae755",
            data: [300, 240, 100, 432, 253, 34],
            backgroundColor: [
              "red",
              "pink",
              "green",
              "yellow",
              "orange",
              "blue",
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
