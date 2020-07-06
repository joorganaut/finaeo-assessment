"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const businessObject_1 = __importDefault(require("../common/businessObject"));
class CarModel extends businessObject_1.default {
    constructor(props) {
        super(props);
        this.id = props === undefined ? 0 : props.id;
        this.make = props === undefined ? '' : props.make;
        this.model = props === undefined ? '' : props.model;
        this.user = props === undefined ? null : props.user;
    }
}
exports.default = CarModel;
//# sourceMappingURL=car.js.map