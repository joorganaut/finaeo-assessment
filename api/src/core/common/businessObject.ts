interface IBusinessObject{
    id: number,
    error: string | undefined
}
export {IBusinessObject}
class BusinessObject implements IBusinessObject{
    id: number;
    error: string | undefined
    constructor(props?: any){
        this.id = props === undefined ? 0 : props.ID;
    }
    ToString=()=>{
        return JSON.stringify(this);
    }
}
export default BusinessObject;