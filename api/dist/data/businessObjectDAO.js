"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection = require('./connection');
exports.knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
        host: connection.host,
        user: connection.user,
        password: connection.password,
        database: connection.database
    }
});
//# sourceMappingURL=businessObjectDAO.js.map