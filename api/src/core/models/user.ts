import BusinessObject from "../common/businessObject";
import {User, UserRole} from "../../db"

class UserModel extends BusinessObject implements User{
    constructor(props?: any){
        super(props);
        this.id = props === undefined ? 0 : props.id;
        this.givenName = props === undefined ? '' : props.givenName;
        this.familyName = props === undefined ? '' : props.familyName;
        this.dateOfBirth = props === undefined ? '' : props.dateOfBirth;
        this.role = props === undefined ? null : props.role;
    }
    givenName: string
    familyName: string
    dateOfBirth: string
    role: UserRole
}
export default UserModel;
    