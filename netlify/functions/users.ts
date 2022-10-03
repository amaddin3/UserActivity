import {Handler, HandlerEvent}  from "@netlify/functions";
import  Airtable from "airtable";

const {AIRTABLE_KEY} = process.env;
const base = new Airtable({apiKey:'key4v56MUqVr9sNJv'}).base("appBTaX8XIvvr6zEC");
const tbl_user = base("Users");
const handler:Handler = async (event:HandlerEvent,context: any) =>{
    try{
        const response = await (tbl_user.select().firstPage());
        const data = await response;
        return { statusCode: 200, body: JSON.stringify({ data }) };            
    }
    catch (err:any)
    {
        return {
            statusCode:500,
            body:err.message
        }
    }    
};

const minifyRecord =(record:any) =>{
    return{
        id:record.id,
        fields:record.fields
    }
}

export { handler};