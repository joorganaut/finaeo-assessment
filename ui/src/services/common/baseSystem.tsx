class BaseSystem{
    IsNullOrWhiteSpace(input: string) {
        if (typeof input === 'undefined' || input === null) return true;
        return input.replace(/\s/g, '').length < 1;
    }
    IsNullOrUndefined(input: any){
        if (typeof input === 'undefined' || input === null) return true;
    }
    GetDateAndTime(concat: boolean)
    {
        if(concat){
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            return date+time;
        }else{
            let today = new Date();
            let date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
            let time = today.getHours()+''+today.getMinutes() +''+today.getSeconds();
            return date+time;
        }        
    }
    GetTime(concat)
    {
        if(concat){
            let today = new Date();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            return time;
        }else{
            let today = new Date();
            let time = today.getHours()+''+today.getMinutes()+'' + today.getSeconds();
            return time;
        }        
    }
    GetDate(concat)
    {
        if(concat){
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            return date;
        }else{
            let today = new Date();
            let date = today.getFullYear()+''+(today.getMonth()+1)+''+today.getDate();
            return date;
        }        
    }
}
export default BaseSystem