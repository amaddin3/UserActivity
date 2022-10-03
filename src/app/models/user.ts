export class User { 
    Name: string="";
    avatar:string ="";
    occupation:string="";
    userLogs:Array<UserLog> =[];
    userImpressions:number=0;
    userConversions:number=0;
    userTotalRevenue:number=0;   
  }

export class UserLog 
{
  Modtime: Date = new Date();
  revenue: number =0;
}