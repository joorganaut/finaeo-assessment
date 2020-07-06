import Axios from 'axios';
export interface IHTTPObject {
    data: any,
    error: any,
}
export class Request implements IHTTPObject {
    error: any;
    data: any
}
export class Response implements IHTTPObject {
    constructor(props?: any) {
        this.code = props === undefined ? '' : props.code;
        this.message = props === undefined ? '' : props.message;
        this.data = props === undefined ? {} : props.data;
        this.error = props === undefined ? {} : props.error;
    }
    data: any;
    error: any;
    code: string;
    message: string;
}
class MiddlewareManager {
    async PostData(url: string, obj?: IHTTPObject) {
        let result: IHTTPObject;
        result = new Response();
        try {
            await Axios.post(url, obj !== undefined ? obj.data : {})
                .then(res => {
                    result = new Response(res);
                }).catch(err => {
                    result.error = err;
                })
        } catch (exception) {
            result.error = exception.message;
        }
        return result;
    }
    async GetData(url: string, obj?: IHTTPObject) :  Promise<IHTTPObject> {
        let result: IHTTPObject;
        result = new Response();
        try {
            await Axios.get(url, obj !== undefined ? obj.data : {})
                .then(res => {
                    result = new Response(res);
                }).catch(err => {
                    result.error = err;
                })
        } catch (exception) {
            result.error = exception.message;
        }
        return result;
    }
    async PutData(url: string, obj?: IHTTPObject) : Promise<IHTTPObject>{
        let result: IHTTPObject;
        result = new Response();
        try {
            await Axios.put(url, obj !== undefined ? obj.data : {})
                .then(res => {
                    result = new Response(res);
                }).catch(err => {
                    result.error = err;
                })
        } catch (exception) {
            result.error = exception.message;
        }
        return result;
    }
    async DeleteData(url: string, obj?: IHTTPObject) : Promise<IHTTPObject> {
        let result: IHTTPObject;
        result = new Response();
        try {
            await Axios.delete(url, obj !== undefined ? obj.data : {})
                .then(res => {
                    result = new Response(res);
                }).catch(err => {
                    result.error = err;
                })
        } catch (exception) {
            result.error = exception.message;
        }
        return result;
    }
}
export default MiddlewareManager;