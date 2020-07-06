import { UserRole } from "../enums/userRoles";

class UserModel{
    constructor(props?: any){
        this.id = props === undefined ? 0 : props.id;
        this.givenName = props === undefined ? '' : props.givenName;
        this.familyName = props === undefined ? '' : props.familyName;
        this.dateOfBirth = props === undefined ? '' : props.dateOfBirth;
        this.role = props === undefined ? null : props.role;
    }
    id: number;
    givenName: string
    familyName: string
    dateOfBirth: string
    role: UserRole
}
export default UserModel;
    