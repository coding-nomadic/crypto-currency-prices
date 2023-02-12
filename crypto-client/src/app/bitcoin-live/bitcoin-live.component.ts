import { jsDocComment } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import Chart from "chart.js/auto";
import io from "socket.io-client";
const socket = io("http://localhost:5000");
@Component({
  selector: 'app-bitcoin-live',
  templateUrl: './bitcoin-live.component.html',
  styleUrls: ['./bitcoin-live.component.scss']
})
export class BitcoinLiveComponent implements OnInit {

  chart: any;
  ngOnInit() {
    socket.on("currency-event", (res) => {
      console.log("Currency Events from API :"+res.market_data.current_price.usd);
      this.chart.data.labels.push(new Date().toLocaleTimeString());
      this.chart.data.datasets.forEach((dataset:any) => {
        dataset.data.push(res.market_data.current_price.usd);
        //dataset.data.push(res.market_data.current_price.cad);
      });
      this.chart.update();
    });
    this.chart = new Chart("MyLineChart", {
      type: "line",
      data: {
        labels: [
          "1.1.22AM",
          "2.1.22AM",
        ],
        datasets: [
          {
            label: "BTC Live USD Price",
            borderColor: "#FFFFFF",
            pointBackgroundColor: "#009688",
            pointBorderColor: "#009688",
            data: ["15000", "15000"],
            backgroundColor: "#009688",
          }
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }
}

