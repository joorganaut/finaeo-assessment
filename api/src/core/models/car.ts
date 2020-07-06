import {Car, User} from "../../db"
import BusinessObject from "../common/businessObject";

class CarModel extends BusinessObject implements Car{
    constructor(props?: any){
        super(props);
        this.id = props === undefined ? 0 : props.id;
        this.make = props === undefined ? '' : props.make;
        this.model = props === undefined ? '' : props.model;
        this.user = props === undefined ? null : props.user;
    }
    make: string
    model: string
    user: User
}
export default CarModel;
    