import { Component, NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { PriceService } from 'src/app/user/services/prices.service';
import { Price } from 'src/app/user/models/price.model';
import { Subscription } from 'rxjs';
import * as dateFormat from 'dateformat'
import { CompanyService } from 'src/app/user/services/company.service';
am4core.useTheme(am4themes_animated);

@Component({
  selector: "app-chart",
  templateUrl: "./chart.component.html",
  styleUrls: ["./chart.component.css"]
})
export class ChartComponent {
  private chart: am4charts.XYChart;
  data: Price[];
  companyId: string;
  companySubscription: Subscription;
  dataSubscription: Subscription;
  constructor(private zone: NgZone,
    private readonly priceService: PriceService,
    private readonly companyService: CompanyService) { }


  ngOnInit() {
    this.companySubscription = this.companyService.currentData.subscribe((id) => {
      this.companyId = id;
    });
  }
  getData() {
    this.dataSubscription = this.priceService.getPrice(this.companyId).subscribe(data => {
      console.log(data)
      data.forEach(x => x.opendate = dateFormat(x.opendate, 'yyyy-mm-dd'));
      this.data = data
      console.log(data)
      this.chartSeries();
    })
  }
  chartSeries() {
    // this.zone.runOutsideAngular(() => {
    //   let chart = am4core.create("chartdiv", {
    //     "type": "serial",
    //     "theme": "none",
    //     "dataDateFormat":"YYYY-MM-DD",
    //     "valueAxes": [ {
    //       "position": "left"
    //     } ],
    //     "graphs": [ {
    //       "id": "g1",
    //       "balloonText": "Open:<b>[[open]]</b><br>Low:<b>[[low]]</b><br>High:<b>[[high]]</b><br>Close:<b>[[close]]</b><br>",
    //       "closeField": "close",
    //       "fillColors": "#7f8da9",
    //       "highField": "high",
    //       "lineColor": "#7f8da9",
    //       "lineAlpha": 1,
    //       "fillAlphas": 0,
    //       "lineThickness": 2,
    //       "lowField": "low",
    //       "negativeFillColors": "#db4c3c",
    //       "negativeLineColor": "#db4c3c",
    //       "openField": "open",
    //       "title": "Price:",
    //       "type": "ohlc",
    //       "valueField": "close"
    //     } ],
    //     "chartScrollbar": {
    //       "graph": "g1",
    //       "graphType": "line",
    //       "scrollbarHeight": 30
    //     },
    //     "chartCursor": {},
    //     "categoryField": "date",
    //     "categoryAxis": {
    //       "parseDates": true
    //     }, "dataProvider": this.data,
    //     "export": {
    //       "enabled": true,
    //       "position": "bottom-right"
    //     }
    //   })
    // }
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4charts.XYChart);
      chart.paddingRight = 20;

      chart.dateFormatter.inputDateFormat = "YYYY-MM-dd";

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;

      let series = chart.series.push(new am4charts.OHLCSeries());
      series.dataFields.dateX = "opendate";
      series.dataFields.valueY = "endprice";
      series.dataFields.openValueY = "startprice";
      series.dataFields.lowValueY = "lowprice";
      series.dataFields.highValueY = "highprice";
      series.tooltipText = "Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}";
      series.strokeWidth = 3;

      chart.cursor = new am4charts.XYCursor();

      // a separate series for scrollbar
      let lineSeries = chart.series.push(new am4charts.LineSeries());
      lineSeries.dataFields.dateX = "opendate";
      lineSeries.dataFields.valueY = "startprice";
      // need to set on default state, as initially series is "show"
      lineSeries.defaultState.properties.visible = false;

      // hide from legend too (in case there is one)
      lineSeries.hiddenInLegend = true;
      lineSeries.fillOpacity = 0.5;
      lineSeries.strokeOpacity = 0.5;

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(lineSeries);
      chart.scrollbarX = scrollbarX;

      chart.data = this.data;
      console.log(chart.data)

      chart.events.on("inited", function () {
        dateAxis.zoomToDates(new Date(2019, 0, 28), new Date(2019, 0, 30))
      });
    });
  }
  ngAfterViewInit() {
    this.getData()
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
    if(this.companySubscription) {
      this.companySubscription.unsubscribe()
    }
  }
}