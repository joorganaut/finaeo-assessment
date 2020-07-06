import UserModel from "./userModel";

class CarModel{
    constructor(props: any){
        this.make = props !== undefined ? '' : props.make;
        this.model = props !== undefined ? '' : props.model;
        this.user = props !== undefined ? null : props.user;
    }
    make: string
    model: string
    user: UserModel
}
export default CarModel;
    