import UserModel from '../components/models/userModel';
import MiddlewareManager, { IHTTPObject } from './middlewareManager';
import BaseSystem from './common/baseSystem';
class UserSystem extends BaseSystem{
    manager: MiddlewareManager;
    constructor(){
        super();
        this.manager = new MiddlewareManager()
    }
    async RetrieveAllUsers() : Promise<IHTTPObject>{
        let response: IHTTPObject;
        response = {data : {}, error : ''}
        await this.manager.GetData(process.env.REACT_APP_MIDDLEWARE + "/users").then(async res => {
            response = res;
            return response;
        });        
        return response;
    }
    async RetrieveUser(id: number) : Promise<IHTTPObject>{
        let response: IHTTPObject;
        response = {data : {}, error : ''}
        await this.manager.GetData(process.env.REACT_APP_MIDDLEWARE + "/users/" + id).then(async res => {
            response = res;
            return response;
        });
        return response;
    }
    async AddUser(data: UserModel) : Promise<IHTTPObject>{
        let response: IHTTPObject;
        response = {data : {}, error : ''}
        let request: IHTTPObject;
        request = {data : data, error : ''};
        await this.manager.PostData(process.env.REACT_APP_MIDDLEWARE + "/users", request).then(async res => {
            response = res;
            return response;
        });
        return response;
    }
    async UpdateUser(data: UserModel) : Promise<IHTTPObject>{
        let response: IHTTPObject;
        response = {data : {}, error : ''}
        let request: IHTTPObject;
        request = {data : data, error : ''};
        await this.manager.PutData(process.env.REACT_APP_MIDDLEWARE + "/users", request).then(async res => {
            response = res;
            return response;
        });
        return response;
    }
    async DeleteUser(id: number) : Promise<IHTTPObject>{
        let response: IHTTPObject;
        response = {data : {}, error : ''}
        await this.manager.DeleteData(process.env.REACT_APP_MIDDLEWARE + "/users/"+id).then(async res => {
            response = res;
            return response;
        });
        return response;
    }
}
export default UserSystem;