"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const businessObject_1 = __importDefault(require("../common/businessObject"));
class UserModel extends businessObject_1.default {
    constructor(props) {
        super(props);
        this.id = props === undefined ? 0 : props.id;
        this.givenName = props === undefined ? '' : props.givenName;
        this.familyName = props === undefined ? '' : props.familyName;
        this.dateOfBirth = props === undefined ? '' : props.dateOfBirth;
        this.role = props === undefined ? null : props.role;
    }
}
exports.default = UserModel;
//# sourceMappingURL=user.js.map