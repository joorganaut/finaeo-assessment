"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const main_1 = require("./main");
const PORT = process.env.PORT || '5000';
const server = http.createServer(main_1.app.callback());
server.on('error', (err) => console.error(err));
server.on('unhandledRejectionError', (reason) => {
    throw reason;
});
server.on('uncaughtexception', (error) => {
    console.error(error.message);
    process.exit(1);
});
server.on('listening', () => console.log(`Listening on http://localhost:${PORT}`));
server.listen(PORT);
//# sourceMappingURL=server.js.map