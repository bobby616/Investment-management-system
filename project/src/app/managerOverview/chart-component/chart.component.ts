import { Component, NgZone } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { PriceService } from 'src/app/user/services/prices.service';
import { Price } from 'src/app/user/models/price.model';
import { Subscription } from 'rxjs';
import * as dateFormat from 'dateformat'
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
  dataSubscription: Subscription;
  constructor(private zone: NgZone,
    private readonly priceService: PriceService) {}


    ngOnInit() {
      this.companyId = '7987169a-4bc8-4dca-b90f-f4cd451b0b15';
      this.dataSubscription = this.priceService.getPrice(this.companyId).subscribe(data => {
        let mappedData = data.map(x => x.opendate = dateFormat(x.opendate, 'yyyy-mm-dd' ));
        this.data = mappedData
        console.log(mappedData)
      })
    }
    
  ngAfterViewInit() {
    setTimeout(() => {
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
          series.dataFields.valueY = "startprice";
          series.dataFields.openValueY = "endprice";
          series.dataFields.lowValueY = "lowprice";
          series.dataFields.highValueY = "highprice";
          series.tooltipText = "Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}";
          series.strokeWidth = 2;
          
          chart.cursor = new am4charts.XYCursor();
          
          // a separate series for scrollbar
          let lineSeries = chart.series.push(new am4charts.OHLCSeries());
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
          
          chart.events.on("inited", function() {
            // dateAxis.zoomToDates(new Date(2011, 7, 28), new Date(2011, 8, 28))
          });
      });
      
    }, 1000)
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
    if(this.dataSubscription){
      this.dataSubscription.unsubscribe();
    }
  }
}