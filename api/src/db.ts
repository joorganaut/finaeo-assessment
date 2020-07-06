import UserModel from "./core/models/user";
import CarModel from "./core/models/car";
import { knex } from "./data/businessObjectDAO";
export enum UserRole {
  User,
  Admin,
  Super,
}

export interface User {
  id: number
  givenName: string
  familyName: string
  dateOfBirth: string
  role: UserRole
}

export interface Car {
  id: number
  make: string
  model: string
  user: User
}

interface Data {
  users: User[]
  cars: Car[]
}

const DATA: Data = {
  users: [],
  cars: [],
}

export const db = (dataType: string, ...opts: any[]) => {
  // You can use the DATA object in here
  // Begin editing after this line
  console.log(DATA)
  return {
    getAllUsers: async (): Promise<User[]> => {
      try {
        await knex(dataType).select().then((res: any) => {
          DATA.users = res;
          return DATA.users;
        });
      }
      catch (e) {
        return DATA.users;
      }
      return DATA.users;
    },
    getOneUser: async (): Promise<User> => {
      try {
        await knex(dataType)
          .where('id', opts[0]).first().then((res: any)=>{
            DATA.users.push(new UserModel(res));
            return new UserModel(res);
          });
      } catch (e) {
        return e.message;
      }
      return DATA.users.filter(x=>x.id === opts[0])[0];
    },
    createUser: async (): Promise<Partial<User>> => {
      try {
        var res: Partial<User> = new UserModel();
        await knex(dataType)
          .insert(opts[0], '*')
          .then(function (result: any) {
            res = new UserModel(opts[0]);
            res.id = result[0];
          }).catch((e: any) => {
            return e;
          });
      } catch (e) {
        return e.message;
      }
      return res;
    },
    updateUser: async (): Promise<Partial<User>> => {
      let id = opts[0].id;
      delete opts[0].id;
      try{
      await knex(dataType)
        .where({id : id} )
        .update(opts[0]).then((res: any)=>{
          DATA.users.push(new UserModel(res));
        })
      }catch(e){
        return e.message;
      }
        return DATA.users[0];
    },
    deleteUser: async (): Promise<boolean> => {
      try {
        knex(dataType)
          .where({ id: opts[0]})
          .del().then(()=>{
            return true;
          });
        return true;
      } catch (e) {
        return false;
      }
    },
    getAllCars: async (): Promise<Car[]> => {
      try {
        await knex(dataType).select().then((res: any) => {
          DATA.cars = res;
          return DATA.cars;
        });
      }
      catch (e) {
        return DATA.cars;
      }
      return DATA.cars;
    },
    getOneCar: async (): Promise<Car> => {
      try {
        await knex(dataType).select()
          .where({id : opts[0]})
          .first().then((res: any)=>{
            DATA.cars.push(new CarModel(res));
          });
      } catch (e) {
        return e.message;
      }
      return DATA.cars.filter(x=>x.id === opts[0])[0];
    },
    createCar: async (): Promise<Partial<Car>> => {
      try {
        var res: Partial<Car> = new CarModel();
        await knex(dataType)
          .insert(opts[0], '*')
          .then(function (result: any) {
            res = new CarModel(opts[0]);
            res.id = result[0];
          }).catch((e: any) => {
            return e;
          });
      } catch (e) {
        return e.message;
      }
      return res;
    },
    updateCar: async(): Promise<Partial<Car>> => {
      let id = opts[0].id;
      delete opts[0].id;
      try{
      await knex(dataType)
        .where({id : id} )
        .update(opts[0]).then((res: any)=>{
          DATA.cars.push(new CarModel(res));
        })
      }catch(e){
        return e.message;
      }
        return DATA.cars[0];
    },
    deleteCar: (): boolean => {
      try {
        knex(dataType)
          .where({ id: opts[0]})
          .del().then(()=>{
            return true;
          });
        return true;
      } catch (e) {
        return false;
      }
    },
  }
  // End editing after this line
}
