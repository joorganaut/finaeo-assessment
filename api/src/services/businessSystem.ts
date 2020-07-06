import BusinessObject, { IBusinessObject } from '../core/common/businessObject';
import { db } from '../db';
import UserModel from '../core/models/user';
import CarModel from '../core/models/car';
class BusinessSystem {
    Type: string;
    args: any[];
    db!: typeof db;
    constructor() {
        this.Type = '';
        this.args = [];
    }
    Create = async (obj: IBusinessObject): Promise<Partial<IBusinessObject>> => {
        //save business object
        var result: Partial<IBusinessObject>;
        try {
            switch (this.Type) {
                case "users":
                    let usr = await db(this.Type, obj).createUser();
                    result = new UserModel(usr);
                    return result;
                case "cars":
                    let car = await db(this.Type, obj).createCar();
                    result = new CarModel(car);
                    return result;
                default:
                    result = new BusinessObject();
                    result.error = 'no datatype specified'
                    return result;
            }
        } catch (e) {
            return { error: e.message }
        }
    }
    Retrieve = async (id: number): Promise<Partial<IBusinessObject>> => {
        //retrieve one business object
        var result: Partial<IBusinessObject>;
        try {
            switch (this.Type) {
                case "users":
                    let usr = await db(this.Type, id).getOneUser();
                    result = new UserModel(usr);
                    return result;
                case "cars":
                    let car = await db(this.Type, id).getOneCar();
                    result = new CarModel(car);
                    return result;
                default:
                    result = new BusinessObject();
                    result.error = 'no datatype specified'
                    return result;
            }
        } catch (e) {
            return { error: e.message }
        }
    }
    RetrieveAll = async (): Promise<IBusinessObject[]> => {
        //retrieve all business objects
        let result: IBusinessObject[] = [];
        try {
            switch (this.Type) {
                case "users":
                    let users = await db(this.Type, {}).getAllUsers();
                    result = users.map(x => (new UserModel(x)))
                    return result;
                case "cars":
                    let cars = await db(this.Type, {}).getAllCars();
                    result = cars.map(x => (new CarModel(x)))
                    return result;
                default:
                    return result;
            }
        } catch (e) {
            result.push({ error: e.message, id: 0 })
            return result;
        }
    }
    Update = async (obj: IBusinessObject): Promise<Partial<IBusinessObject>> => {
        //update business object
        var result: Partial<IBusinessObject>;
        try {
            switch (this.Type) {
                case "users":
                    let usr = await db(this.Type, obj).updateUser();
                    result = new UserModel(usr);
                    return result;
                case "cars":
                    let res = await db(this.Type, obj).updateCar();
                    result = new CarModel(res);
                    return result;
                default:
                    result = new BusinessObject();
                    result.error = 'no datatype specified'
                    return result;
            }
        } catch (e) {
            return { error: e.message }
        }
    }
    Delete = async (id: number): Promise<boolean> => {
        //delete business object
        try {
            switch (this.Type) {
                case "users":
                    let usr = await db(this.Type, id).deleteUser();
                    return usr;
                case "cars":
                    let car = await db(this.Type, id).deleteCar();
                    return car
                default:
                    return false;
            }
        } catch (e) {
            return false;
        }
    }
}
export default BusinessSystem;