import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserLog } from '../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  users: any =[];
  logs: any =[];
  finalData: any =[];
  private baseUrl = window.location.origin;
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
      this.LoadUserData();
  }

  LoadUserData(){
    this.http.get(`${this.baseUrl}/.netlify/functions/users`)
            .subscribe({
              next :(data:any) =>{
                this.users = data.data;
                this.http.get("assets/logs.json").subscribe(_logs =>{
                  this.logs = _logs;
                  let mergedData = this.MergeUserAndLogData();
                  this.finalData = this.finalCardDataForUserCollection(mergedData);
                })
              },
              error: (err:any)=>{
                console.log(err);
                alert('Error:'+err.error);
              },
            });
  }

  MergeUserAndLogData(){
    let mergedCardData:any = {};
    let users = this.users;
    let logs = this.logs;
    let userMap:any = {};
    users.forEach(function(_user:any){
      userMap[_user.fields["Id"]] = _user.fields;
    })
    logs.forEach((log:any) => {
      if(userMap[log.user_id])
      {
        if(mergedCardData[log.user_id])
        {
          mergedCardData[log.user_id].logs.push(log);
        }
        else{
          let newuserObj = userMap[log.user_id];
          newuserObj.logs=[];
          newuserObj.logs.push(log);
          mergedCardData[log.user_id] = newuserObj;
        }          
      }
    });
    return mergedCardData;   
  }

  finalCardDataForUserCollection(data :any)
  {
    let finalData:any =[];
    Object.keys(data).forEach((key) =>{
      let obj:any ={};
     obj = (({ Name, avatar,occupation }) => ({ Name, avatar,occupation }))(data[key]);
     obj["userLogs"]=[{ "name":obj.Name,"series":[]}];
     let sumOfImpressions =0;
     let sumOfConversions =0;
     let sumOfAllRevenue =0;
    
     data[key].logs.forEach((log:any)=>{      
          
            if(log.type === "impression" && log.revenue > 0)
            {
              sumOfImpressions += log.revenue;
            }
            if(log.type === "conversion"  && log.revenue > 0)
            {
              
              obj["userLogs"][0]["series"].push({"name":log.time,"value":log.revenue});
              sumOfConversions += log.revenue;
            }
            sumOfAllRevenue += log.revenue;
        })
      obj["userImpressions"] = sumOfImpressions;
      obj["userConversions"] = sumOfConversions;
      obj["userTotalRevenue"] = sumOfAllRevenue;

      finalData.push(obj);
    });
    return finalData;
  }


}
