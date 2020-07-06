import CarModel from '../components/models/carModel';
import MiddlewareManager, { IHTTPObject } from './middlewareManager';
import BaseSystem from './common/baseSystem';
class CarSystem extends BaseSystem{
    manager: MiddlewareManager;
    constructor(){
        super();
        this.manager = new MiddlewareManager()
    }
    async RetrieveAllCars() : Promise<IHTTPObject>{
        let response: IHTTPObject;
        response = {data : {}, error : ''}
        await this.manager.GetData(process.env.REACT_APP_MIDDLEWARE + "/cars").then(async res => {
            response = res.data.res;
            return response;
        });        
        return response;
    }
    async RetrieveCar(id: number) : Promise<IHTTPObject>{
        let response: IHTTPObject;
        response = {data : {}, error : ''}
        await this.manager.GetData(process.env.REACT_APP_MIDDLEWARE + "/cars/" + id).then(async res => {
            response = res.data.res;
            return response;
        });
        return response;
    }
    async AddCar(data: CarModel) : Promise<IHTTPObject>{
        let response: IHTTPObject;
        response = {data : {}, error : ''}
        let request: IHTTPObject;
        request = {data : data, error : ''};
        await this.manager.PostData(process.env.REACT_APP_MIDDLEWARE + "/cars", request).then(async res => {
            response = res.data.res;
            return response;
        });
        return response;
    }
    async UpdateCar(data: CarModel) : Promise<IHTTPObject>{
        let response: IHTTPObject;
        response = {data : {}, error : ''}
        let request: IHTTPObject;
        request = {data : data, error : ''};
        await this.manager.PutData(process.env.REACT_APP_MIDDLEWARE + "/cars", request).then(async res => {
            response = res.data.res;
            return response;
        });
        return response;
    }
    async DeleteCar(id: number) : Promise<IHTTPObject>{
        let response: IHTTPObject;
        response = {data : {}, error : ''}
        await this.manager.DeleteData(process.env.REACT_APP_MIDDLEWARE + "/cars/"+id).then(async res => {
            response = res.data.res;
            return response;
        });
        return response;
    }
}
export default CarSystem;