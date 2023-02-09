import { jsDocComment } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import Chart from "chart.js/auto";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.css"],
})
export class LineChartComponent implements OnInit {
  chart: any;
  ngOnInit() {
    socket.on("currency-event", (res) => {
      console.log("Currency Events from API :"+JSON.stringify(res));
      this.chart.data.labels.push(res.date);
      this.chart.data.datasets.forEach((dataset:any) => {
        dataset[0].data.push(res.rates.USD);
        dataset[1].data.push(res.rates.CAD);
      });
      this.chart.update();
    });
    this.chart = new Chart("MyLineChart", {
      type: "line",
      data: {
        labels: [
          "2022-05-10",
          "2022-05-11",
        ],
        datasets: [
          {
            label: "1 INR to USD",
            borderColor: "#bae755",
            pointBackgroundColor: "#55bae7",
            pointBorderColor: "#55bae7",
            data: ["0", "0.10"],
            backgroundColor: "blue",
          },
          {
            label: "1 INR to CAD",
            borderColor: "#bae755",
            pointBackgroundColor: "#55bae7",
            pointBorderColor: "#55bae7",
            data: ["0", "0.10"],
            backgroundColor: "limegreen",
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}
