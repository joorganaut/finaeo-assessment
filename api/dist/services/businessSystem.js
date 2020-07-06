"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const businessObject_1 = __importDefault(require("../core/common/businessObject"));
const db_1 = require("../db");
const user_1 = __importDefault(require("../core/models/user"));
const car_1 = __importDefault(require("../core/models/car"));
class BusinessSystem {
    constructor() {
        this.Create = async (obj) => {
            //save business object
            var result;
            try {
                switch (this.Type) {
                    case "users":
                        let usr = await db_1.db(this.Type, obj).createUser();
                        result = new user_1.default(usr);
                        return result;
                    case "cars":
                        let car = await db_1.db(this.Type, obj).createCar();
                        result = new car_1.default(car);
                        return result;
                    default:
                        result = new businessObject_1.default();
                        result.error = 'no datatype specified';
                        return result;
                }
            }
            catch (e) {
                return { error: e.message };
            }
        };
        this.Retrieve = async (id) => {
            //retrieve one business object
            var result;
            try {
                switch (this.Type) {
                    case "users":
                        let usr = await db_1.db(this.Type, id).getOneUser();
                        result = new user_1.default(usr);
                        return result;
                    case "cars":
                        let car = await db_1.db(this.Type, id).getOneCar();
                        result = new car_1.default(car);
                        return result;
                    default:
                        result = new businessObject_1.default();
                        result.error = 'no datatype specified';
                        return result;
                }
            }
            catch (e) {
                return { error: e.message };
            }
        };
        this.RetrieveAll = async () => {
            //retrieve all business objects
            let result = [];
            try {
                switch (this.Type) {
                    case "users":
                        let users = await db_1.db(this.Type, {}).getAllUsers();
                        result = users.map(x => (new user_1.default(x)));
                        return result;
                    case "cars":
                        let cars = await db_1.db(this.Type, {}).getAllCars();
                        result = cars.map(x => (new car_1.default(x)));
                        return result;
                    default:
                        return result;
                }
            }
            catch (e) {
                result.push({ error: e.message, id: 0 });
                return result;
            }
        };
        this.Update = async (obj) => {
            //update business object
            var result;
            try {
                switch (this.Type) {
                    case "users":
                        let usr = await db_1.db(this.Type, obj).updateUser();
                        result = new user_1.default(usr);
                        return result;
                    case "cars":
                        let res = await db_1.db(this.Type, obj).updateCar();
                        result = new car_1.default(res);
                        return result;
                    default:
                        result = new businessObject_1.default();
                        result.error = 'no datatype specified';
                        return result;
                }
            }
            catch (e) {
                return { error: e.message };
            }
        };
        this.Delete = async (id) => {
            //delete business object
            try {
                switch (this.Type) {
                    case "users":
                        let usr = await db_1.db(this.Type, id).deleteUser();
                        return usr;
                    case "cars":
                        let car = await db_1.db(this.Type, id).deleteCar();
                        return car;
                    default:
                        return false;
                }
            }
            catch (e) {
                return false;
            }
        };
        this.Type = '';
        this.args = [];
    }
}
exports.default = BusinessSystem;
//# sourceMappingURL=businessSystem.js.map