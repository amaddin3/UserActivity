import { Component, Input, OnInit } from '@angular/core';
import { UserLog } from '../models/user';
import * as moment from 'moment';
import * as _ from 'lodash';
import { LegendPosition } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public chart: any;
  view:any = [200,200];
  @Input() logs:any[]=[];
 
  public User_Data : any;
  public showXAxis = false;
  public showYAxis = false;
  public gradient = false;
  public showLegend = true;
  public legendTitle = "";
  public legendPosition: LegendPosition = LegendPosition.Below;
  public showLabel = false;
  public showXAxisLabel = false;
  public xAxisLabel:string= '';
  public showYAxisLabel = false;
  public yAxisLabel:string = 'revenue';
  public showDataLabel = true;
  
  
  public colorScheme:any = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };
  constructor() {
    
    
   }
  


  ngOnInit(): void {
    
    this.LoadChartInfo();
  }

  LoadChartInfo()
  {
    let seriesData  = this.logs[0]["series"];
    var result = _(seriesData)
                  .groupBy(time => time.name.split(' ').shift())
                .value();
  let finalResult:any = [];
  
 Object.keys(result).forEach(function(val){
  let newObj:any = {};
  newObj["name"]=val;
  let totalRevenue =0;

  result[val].forEach(function(sData){
    totalRevenue+=sData.value;
  })

  newObj["value"] = totalRevenue;
  finalResult.push(newObj);
  });
  
  let sortedFinalResult = _.sortBy(finalResult, 
    [function(o) { return o.name; }]);
  this.logs[0]["series"] = sortedFinalResult;
    let label:any = "Conversions " +moment(sortedFinalResult[0]["name"]).format("MM/DD").toString();
    label =label +"-"+ moment(sortedFinalResult[sortedFinalResult.length-1]["name"]).format("MM/DD").toString();
    this.legendTitle = label;
    this.User_Data = Object.assign([], this.logs);
  }

  

}
