"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BusinessObject {
    constructor(props) {
        this.ToString = () => {
            return JSON.stringify(this);
        };
        this.id = props === undefined ? 0 : props.ID;
    }
}
exports.default = BusinessObject;
//# sourceMappingURL=businessObject.js.map