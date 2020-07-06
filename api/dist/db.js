"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./core/models/user"));
const car_1 = __importDefault(require("./core/models/car"));
const businessObjectDAO_1 = require("./data/businessObjectDAO");
var UserRole;
(function (UserRole) {
    UserRole[UserRole["User"] = 0] = "User";
    UserRole[UserRole["Admin"] = 1] = "Admin";
    UserRole[UserRole["Super"] = 2] = "Super";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
const DATA = {
    users: [],
    cars: [],
};
exports.db = (dataType, ...opts) => {
    // You can use the DATA object in here
    // Begin editing after this line
    console.log(DATA);
    return {
        getAllUsers: async () => {
            try {
                await businessObjectDAO_1.knex(dataType).select().then((res) => {
                    DATA.users = res;
                    return DATA.users;
                });
            }
            catch (e) {
                return DATA.users;
            }
            return DATA.users;
        },
        getOneUser: async () => {
            try {
                await businessObjectDAO_1.knex(dataType)
                    .where('id', opts[0]).first().then((res) => {
                    DATA.users.push(new user_1.default(res));
                    return new user_1.default(res);
                });
            }
            catch (e) {
                return e.message;
            }
            return DATA.users.filter(x => x.id === opts[0])[0];
        },
        createUser: async () => {
            try {
                var res = new user_1.default();
                await businessObjectDAO_1.knex(dataType)
                    .insert(opts[0], '*')
                    .then(function (result) {
                    res = new user_1.default(opts[0]);
                    res.id = result[0];
                }).catch((e) => {
                    return e;
                });
            }
            catch (e) {
                return e.message;
            }
            return res;
        },
        updateUser: async () => {
            let id = opts[0].id;
            delete opts[0].id;
            try {
                await businessObjectDAO_1.knex(dataType)
                    .where({ id: id })
                    .update(opts[0]).then((res) => {
                    DATA.users.push(new user_1.default(res));
                });
            }
            catch (e) {
                return e.message;
            }
            return DATA.users[0];
        },
        deleteUser: async () => {
            try {
                businessObjectDAO_1.knex(dataType)
                    .where({ id: opts[0] })
                    .del().then(() => {
                    return true;
                });
                return true;
            }
            catch (e) {
                return false;
            }
        },
        getAllCars: async () => {
            try {
                await businessObjectDAO_1.knex(dataType).select().then((res) => {
                    DATA.cars = res;
                    return DATA.cars;
                });
            }
            catch (e) {
                return DATA.cars;
            }
            return DATA.cars;
        },
        getOneCar: async () => {
            try {
                await businessObjectDAO_1.knex(dataType).select()
                    .where({ id: opts[0] })
                    .first().then((res) => {
                    DATA.cars.push(new car_1.default(res));
                });
            }
            catch (e) {
                return e.message;
            }
            return DATA.cars.filter(x => x.id === opts[0])[0];
        },
        createCar: async () => {
            try {
                var res = new car_1.default();
                await businessObjectDAO_1.knex(dataType)
                    .insert(opts[0], '*')
                    .then(function (result) {
                    res = new car_1.default(opts[0]);
                    res.id = result[0];
                }).catch((e) => {
                    return e;
                });
            }
            catch (e) {
                return e.message;
            }
            return res;
        },
        updateCar: async () => {
            let id = opts[0].id;
            delete opts[0].id;
            try {
                await businessObjectDAO_1.knex(dataType)
                    .where({ id: id })
                    .update(opts[0]).then((res) => {
                    DATA.cars.push(new car_1.default(res));
                });
            }
            catch (e) {
                return e.message;
            }
            return DATA.cars[0];
        },
        deleteCar: () => {
            try {
                businessObjectDAO_1.knex(dataType)
                    .where({ id: opts[0] })
                    .del().then(() => {
                    return true;
                });
                return true;
            }
            catch (e) {
                return false;
            }
        },
    };
    // End editing after this line
};
//# sourceMappingURL=db.js.map